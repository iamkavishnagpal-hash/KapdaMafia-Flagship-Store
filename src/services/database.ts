import { createClient, Client } from '@libsql/client';
import path from 'path';

let dbInstance: Client | null = null;

export function getDatabase(): Client {
  if (!dbInstance) {
    const dbPath = path.join(process.cwd(), 'kapda_mafia.db');
    dbInstance = createClient({
      url: process.env.TURSO_DATABASE_URL || `file:${dbPath}`,
      authToken: process.env.TURSO_AUTH_TOKEN
    });
  }
  return dbInstance;
}

// Automatically create tables & seed real rows on first boot
export async function initializeDatabase() {
  const db = getDatabase();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT,
      store_world TEXT NOT NULL DEFAULT 'clothing',
      category TEXT NOT NULL,
      fit TEXT DEFAULT 'OVERSIZED',
      price REAL NOT NULL,
      original_price REAL,
      badge TEXT,
      drop_name TEXT NOT NULL,
      description TEXT NOT NULL,
      gsm INTEGER,
      rating REAL DEFAULT 4.9,
      review_count INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      model_height TEXT,
      model_wearing_size TEXT,
      hero_image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id),
      color_name TEXT NOT NULL,
      color_hex TEXT NOT NULL,
      hero_image_url TEXT NOT NULL,
      scrubber_frames TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory_stocks (
      id TEXT PRIMARY KEY,
      product_slug TEXT NOT NULL,
      size TEXT NOT NULL,
      total_physical_stock INTEGER NOT NULL,
      reserved_cart_stock INTEGER NOT NULL DEFAULT 0,
      available_stock INTEGER NOT NULL,
      low_stock_threshold INTEGER DEFAULT 3,
      UNIQUE(product_slug, size)
    );
  `);

  // Verify if products already seeded
  const check = await db.execute('SELECT COUNT(*) as count FROM products');
  const count = Number(check.rows[0].count);

  if (count === 0) {
    // SEED 100% MENSWEAR DATABASE RECORDS
    await db.execute({
      sql: `
        INSERT INTO products (
          id, sku, slug, name, tagline, store_world, category, fit, price, original_price, badge, drop_name, description, gsm, rating, review_count, is_featured, model_height, model_wearing_size, hero_image
        ) VALUES 
        (
          'prod-001', 'KM-DENIM-001', 'dark-blue-barrel-fit-jeans', 'DARK BLUE BARREL FIT JEANS',
          'Heavyweight Rigid Cotton Denim with Structured Curved Leg Silhouette', 'clothing', 'denim', 'BAGGY',
          1899.00, 2699.00, 'GEN-Z TREND', 'AUTUMN / WINTER EDITION',
          'Engineered with premium rigid cotton denim in a deep indigo wash. Features the signature Gen-Z barrel-leg curve, relaxed rise, and vintage whiskering treatment.',
          440, 4.9, 47, 1, '6''1" (185 cm)', '32', 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605'
        ),
        (
          'prod-002', 'KM-TEE-002', 'black-and-white-striped-t-shirt', 'BLACK AND WHITE STRIPED T-SHIRT',
          '280 GSM Premium Combed Cotton in Relaxed Boxy Silhouette', 'clothing', 'tees', 'OVERSIZED',
          1449.00, 1999.00, 'BEST SELLER', 'AUTUMN / WINTER EDITION',
          'Yarn-dyed monochrome stripe pattern constructed from 280 GSM combed cotton. Dropped shoulder seams and reinforced ribbed collar for an effortless streetwear drape.',
          280, 4.8, 39, 1, '6''0" (183 cm)', 'L', 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304'
        ),
        (
          'prod-003', 'KM-HOOD-003', 'flame-graphic-heavyweight-hoodie', 'FLAME GRAPHIC HEAVYWEIGHT HOODIE',
          '500 GSM Brushed Fleece with Double-Layered Hood Construction', 'clothing', 'hoodies', 'OVERSIZED',
          2499.00, 3499.00, 'CORE DROP', 'AUTUMN / WINTER EDITION',
          'Maximum density 500 GSM loopback fleece built for winter night shifts. Features deep kangaroo pockets, reinforced eyelets, and high-density distressed flame artwork.',
          500, 4.9, 63, 1, '6''2" (188 cm)', 'XL', '/media/product-hoodie.png'
        ),
        (
          'prod-004', 'KM-CARGO-004', 'tactical-parachute-cargo-pant', 'TACTICAL PARACHUTE CARGO PANT',
          'Heavy Duty Ripstop Fabric with Adjustable Drawcord Ankles', 'clothing', 'cargos', 'BAGGY',
          1999.00, 2799.00, 'LIMITED', 'AUTUMN / WINTER EDITION',
          'Engineered for maximum utility with deep dimensional pocket bags, reinforced knee articulation, and custom metal hardware.',
          360, 4.8, 51, 1, '6''1" (185 cm)', '32', '/media/product-cargo.png'
        ),
        (
          'prod-005', 'SM-SNK-001', 'model-1239-chunky-street-sneaker', 'MODEL 1239 CHUNKY STREET SNEAKER',
          'Multi-Layered Tactical High-Tread Sneaker with Reinforced Mudguard', 'shoes', 'Sneaker Shoes', 'REGULAR',
          1899.00, 2799.00, 'SHOES MAFIA EXCLUSIVE', 'FOOTWEAR DROP 01',
          'Chunky exaggerated platform sole with geometric traction channels and breathable mesh overlays. Engineered for all-day urban movement and heavy ground grip.',
          NULL, 4.9, 88, 1, '6''0" (183 cm)', 'UK 9', 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg'
        );
      `,
      args: []
    });

    // SEED REAL DISTINCT MULTI-ANGLE ASSETS FOR 360 SCRUBBING
    await db.execute({
      sql: `
        INSERT INTO product_variants (id, product_id, color_name, color_hex, hero_image_url, scrubber_frames) VALUES
        (
          'var-001', 'prod-001', 'Dark Indigo Blue', '#1c2438',
          'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
          json_array(
            'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
            'https://www.powerlook.in/cdn/shop/files/1_3x_3fcf586c-4861-41e9-9a73-82ef137f698e.jpg?v=1787636605',
            'https://www.powerlook.in/cdn/shop/files/2_3x_6bc7632a-d9df-4c3e-8f2e-0639e3ec0244.jpg?v=1787636605',
            'https://www.powerlook.in/cdn/shop/files/4_3x_c94025d5-8f64-44b4-82ee-674312c1bc9b.jpg?v=1787636605'
          )
        ),
        (
          'var-002', 'prod-002', 'Monochrome Stripe', '#222222',
          'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304',
          json_array(
            'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304',
            'https://www.powerlook.in/cdn/shop/files/1_3x_3fcf586c-4861-41e9-9a73-82ef137f698e.jpg?v=1787636605',
            'https://www.powerlook.in/cdn/shop/files/4_e933779f-2bf8-442e-8e66-f2d137b7b628.jpg?v=1780054457'
          )
        ),
        (
          'var-003', 'prod-003', 'Washed Coal Black', '#171717',
          '/media/product-hoodie.png',
          json_array(
            '/media/product-hoodie.png',
            '/media/campaign-after-dark.png',
            '/media/product-cargo.png'
          )
        ),
        (
          'var-004', 'prod-004', 'Tactical Charcoal', '#1f1f1f',
          '/media/product-cargo.png',
          json_array(
            '/media/product-cargo.png',
            '/media/product-jacket.png',
            '/media/campaign-after-dark.png'
          )
        ),
        (
          'var-005', 'prod-005', 'Triple Black', '#111111',
          'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
          json_array(
            'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
            'https://bunnyboss.in/secure-admin/uploads/item-master/1788695961_IMG_2627.PNG'
          )
        );
      `,
      args: []
    });

    // SEED STRICT DATABASE INVENTORY STOCK LEDGER (ZERO FAKE FOMO)
    await db.execute({
      sql: `
        INSERT INTO inventory_stocks (id, product_slug, size, total_physical_stock, reserved_cart_stock, available_stock, low_stock_threshold) VALUES
        ('stk-001', 'dark-blue-barrel-fit-jeans', '30', 4, 1, 3, 3),
        ('stk-002', 'dark-blue-barrel-fit-jeans', '32', 8, 2, 6, 3),
        ('stk-003', 'dark-blue-barrel-fit-jeans', '34', 2, 0, 2, 3), -- STRICT: Only 2 left
        ('stk-004', 'dark-blue-barrel-fit-jeans', '36', 1, 0, 1, 2), -- STRICT: Only 1 left

        ('stk-005', 'black-and-white-striped-t-shirt', 'S', 6, 1, 5, 3),
        ('stk-006', 'black-and-white-striped-t-shirt', 'M', 10, 2, 8, 4),
        ('stk-007', 'black-and-white-striped-t-shirt', 'L', 3, 1, 2, 3), -- STRICT: Only 2 left
        ('stk-008', 'black-and-white-striped-t-shirt', 'XL', 1, 0, 1, 2), -- STRICT: Only 1 left

        ('stk-009', 'flame-graphic-heavyweight-hoodie', 'M', 5, 2, 3, 3),
        ('stk-010', 'flame-graphic-heavyweight-hoodie', 'L', 2, 0, 2, 2), -- STRICT: Only 2 left
        ('stk-011', 'flame-graphic-heavyweight-hoodie', 'XL', 0, 0, 0, 2), -- STRICT: Sold out

        ('stk-012', 'tactical-parachute-cargo-pant', '30', 3, 1, 2, 2),
        ('stk-013', 'tactical-parachute-cargo-pant', '32', 7, 2, 5, 3),
        ('stk-014', 'tactical-parachute-cargo-pant', '34', 1, 0, 1, 2),

        ('stk-015', 'model-1239-chunky-street-sneaker', 'UK 7', 3, 1, 2, 2),
        ('stk-016', 'model-1239-chunky-street-sneaker', 'UK 8', 7, 2, 5, 3),
        ('stk-017', 'model-1239-chunky-street-sneaker', 'UK 9', 2, 0, 2, 2),
        ('stk-018', 'model-1239-chunky-street-sneaker', 'UK 10', 1, 0, 1, 2);
      `,
      args: []
    });
  }
}
