import { NextResponse } from 'next/server';
import { getDatabase, initializeDatabase } from '@/services/database';

// STRICT ZERO FAKE FOMO
// Directly queries inventory_stocks table in the database
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Product slug required' }, { status: 400 });
  }

  try {
    await initializeDatabase();
    const db = getDatabase();

    const result = await db.execute({
      sql: `
        SELECT 
          size,
          total_physical_stock,
          reserved_cart_stock,
          available_stock,
          low_stock_threshold
        FROM inventory_stocks
        WHERE product_slug = ?
        ORDER BY 
          CASE size
            WHEN 'S' THEN 1
            WHEN 'M' THEN 2
            WHEN 'L' THEN 3
            WHEN 'XL' THEN 4
            ELSE 5
          END
      `,
      args: [slug]
    });

    const inventory = result.rows.map(row => ({
      size: row.size as string,
      total_physical_stock: Number(row.total_physical_stock),
      reserved_cart_stock: Number(row.reserved_cart_stock),
      available_stock: Number(row.available_stock),
      low_stock_threshold: Number(row.low_stock_threshold)
    }));

    return NextResponse.json({
      database: 'libsql-sqlite-live',
      query_executed: true,
      product_slug: slug,
      inventory
    });
  } catch (error) {
    console.error('Inventory SQL execution failed:', error);
    return NextResponse.json(
      { error: 'Inventory database query failed', details: String(error) },
      { status: 500 }
    );
  }
}
