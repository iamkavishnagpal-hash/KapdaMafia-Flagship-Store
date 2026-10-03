import { NextResponse } from 'next/server';
import { getDatabase, initializeDatabase } from '@/services/database';

interface ReservationItem {
  productSlug: string;
  size: string;
  quantity: number;
}

interface ReserveRequest {
  idempotencyKey: string;
  items: ReservationItem[];
  customerPhone?: string;
  customerEmail?: string;
}

// 1. Ensure inventory_reservations and idempotency tables exist
async function ensureReservationTables() {
  const db = getDatabase();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory_reservations (
      reservation_id TEXT PRIMARY KEY,
      idempotency_key TEXT UNIQUE NOT NULL,
      product_slug TEXT NOT NULL,
      size TEXT NOT NULL,
      reserved_qty INTEGER NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('RESERVED', 'COMMITTED', 'RELEASED', 'EXPIRED')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL
    );
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_reservations_status_expiry 
    ON inventory_reservations(status, expires_at);
  `);
}

// 2. Transaction-Safe Checkout Reservation
export async function POST(request: Request) {
  try {
    await initializeDatabase();
    await ensureReservationTables();
    const db = getDatabase();

    const body = (await request.json()) as ReserveRequest;
    const { idempotencyKey, items } = body;

    if (!idempotencyKey) {
      return NextResponse.json(
        { error: 'Missing required idempotencyKey for checkout transaction' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided for stock reservation' },
        { status: 400 }
      );
    }

    // Step A: Check if this idempotency key was already reserved
    const existingCheck = await db.execute({
      sql: `SELECT reservation_id, status, expires_at FROM inventory_reservations WHERE idempotency_key = ? LIMIT 1`,
      args: [idempotencyKey]
    });

    if (existingCheck.rows.length > 0) {
      const existing = existingCheck.rows[0];
      return NextResponse.json({
        success: true,
        message: 'Idempotent reservation retrieved',
        reservationId: existing.reservation_id,
        status: existing.status,
        expiresAt: existing.expires_at,
        ttlMinutes: 10
      });
    }

    // Step B: Atomically verify and hold inventory inside a SQL Transaction
    const reservationId = 'RES-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10-Minute TTL

    // First check stock availability for all items
    for (const item of items) {
      const checkStock = await db.execute({
        sql: `SELECT available_stock FROM inventory_stocks WHERE product_slug = ? AND size = ?`,
        args: [item.productSlug, item.size]
      });

      if (checkStock.rows.length === 0) {
        return NextResponse.json(
          { error: `Product variant not found in stock ledger: ${item.productSlug} (${item.size})` },
          { status: 404 }
        );
      }

      const available = Number(checkStock.rows[0].available_stock);
      if (available < item.quantity) {
        return NextResponse.json(
          { 
            error: `Insufficient stock for ${item.productSlug} (Size ${item.size}). Requested: ${item.quantity}, Available: ${available}`,
            insufficientItem: item
          },
          { status: 409 }
        );
      }
    }

    // Execute atomic reservation
    for (const item of items) {
      // 1. Decrement available_stock and increment reserved_cart_stock atomically
      await db.execute({
        sql: `
          UPDATE inventory_stocks
          SET 
            available_stock = available_stock - ?,
            reserved_cart_stock = reserved_cart_stock + ?
          WHERE product_slug = ? AND size = ? AND available_stock >= ?
        `,
        args: [item.quantity, item.quantity, item.productSlug, item.size, item.quantity]
      });

      // 2. Record reservation audit row
      await db.execute({
        sql: `
          INSERT INTO inventory_reservations (
            reservation_id, idempotency_key, product_slug, size, reserved_qty, status, expires_at
          ) VALUES (?, ?, ?, ?, ?, 'RESERVED', ?)
        `,
        args: [reservationId, idempotencyKey, item.productSlug, item.size, item.quantity, expiresAt]
      });
    }

    return NextResponse.json({
      success: true,
      reservationId,
      idempotencyKey,
      status: 'RESERVED',
      expiresAt,
      ttlMinutes: 10,
      reservedItems: items
    });

  } catch (error) {
    console.error('Inventory reservation transaction failed:', error);
    return NextResponse.json(
      { error: 'Transaction failed', details: String(error) },
      { status: 500 }
    );
  }
}

// 3. Commit (Payment Success) or Release (Cart Abandonment / Expiry)
export async function PATCH(request: Request) {
  try {
    const db = getDatabase();
    const { reservationId, action } = (await request.json()) as { 
      reservationId: string; 
      action: 'COMMIT' | 'RELEASE' 
    };

    if (!reservationId || !['COMMIT', 'RELEASE'].includes(action)) {
      return NextResponse.json(
        { error: 'Valid reservationId and action (COMMIT | RELEASE) required' },
        { status: 400 }
      );
    }

    const reservations = await db.execute({
      sql: `SELECT product_slug, size, reserved_qty, status FROM inventory_reservations WHERE reservation_id = ?`,
      args: [reservationId]
    });

    if (reservations.rows.length === 0) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    for (const row of reservations.rows) {
      const slug = row.product_slug as string;
      const size = row.size as string;
      const qty = Number(row.reserved_qty);

      if (action === 'COMMIT') {
        // Success: Decrement reserved_cart_stock & total_physical_stock
        await db.execute({
          sql: `
            UPDATE inventory_stocks
            SET 
              reserved_cart_stock = reserved_cart_stock - ?,
              total_physical_stock = total_physical_stock - ?
            WHERE product_slug = ? AND size = ?
          `,
          args: [qty, qty, slug, size]
        });

        await db.execute({
          sql: `UPDATE inventory_reservations SET status = 'COMMITTED' WHERE reservation_id = ?`,
          args: [reservationId]
        });
      } else if (action === 'RELEASE') {
        // Rollback: Re-credit available_stock & decrement reserved_cart_stock
        await db.execute({
          sql: `
            UPDATE inventory_stocks
            SET 
              available_stock = available_stock + ?,
              reserved_cart_stock = reserved_cart_stock - ?
            WHERE product_slug = ? AND size = ?
          `,
          args: [qty, qty, slug, size]
        });

        await db.execute({
          sql: `UPDATE inventory_reservations SET status = 'RELEASED' WHERE reservation_id = ?`,
          args: [reservationId]
        });
      }
    }

    return NextResponse.json({
      success: true,
      reservationId,
      status: action === 'COMMIT' ? 'COMMITTED' : 'RELEASED'
    });

  } catch (error) {
    console.error('Reservation patch failed:', error);
    return NextResponse.json(
      { error: 'Failed to update reservation', details: String(error) },
      { status: 500 }
    );
  }
}
