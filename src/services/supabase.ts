import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Singleton Supabase Client
// If credentials are configured in .env.local, it binds to live cloud PostgreSQL
// Otherwise gracefully acts in local development fallback with type safety
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface DatabaseInventoryRecord {
  size: string;
  total_physical_stock: number;
  reserved_cart_stock: number;
  available_stock: number;
  low_stock_threshold: number;
}
