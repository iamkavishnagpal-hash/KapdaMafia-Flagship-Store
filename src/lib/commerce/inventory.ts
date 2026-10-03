import type { Channel, InventoryLedgerReason } from './types';
export type InventoryMovement = { variantId: string; locationId: string; quantity: number; reason: InventoryLedgerReason; channel: Channel; referenceId?: string; userId: string };
export interface InventoryService { reserve(input: InventoryMovement): Promise<{ reservationId: string }>; commit(reservationId: string, userId: string): Promise<void>; release(reservationId: string, userId: string): Promise<void>; recordMovement(input: InventoryMovement): Promise<void>; }
export class PostgresInventoryService implements InventoryService {
  async reserve(): Promise<{ reservationId: string }> { throw new Error('Configure Supabase/Postgres transaction with row locking before production inventory reservations.'); }
  async commit(): Promise<void> { throw new Error('Configure inventory ledger commit transaction.'); }
  async release(): Promise<void> { throw new Error('Configure reservation release transaction.'); }
  async recordMovement(): Promise<void> { throw new Error('Configure append-only inventory_ledger writes.'); }
}
