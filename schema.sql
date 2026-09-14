-- =========================================================================
-- KAPDA MAFIA & SHOES MAFIA PRODUCTION DATABASE SCHEMA
-- PostgreSQL / Supabase Compatible DDL
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS FOR STORE WORLDS, CATEGORIES, AND FITS
DO $$ BEGIN
    CREATE TYPE store_world_enum AS ENUM ('clothing', 'shoes');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE clothing_category_enum AS ENUM ('tees', 'hoodies', 'cargos', 'denim', 'jackets', 'shirts');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE footwear_category_enum AS ENUM ('SPORT SHOES', 'Sneaker Shoes', 'FORMAL SHOES', 'Boots');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE fit_type_enum AS ENUM ('OVERSIZED', 'BAGGY', 'BOXY', 'RELAXED', 'REGULAR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    store_world store_world_enum NOT NULL DEFAULT 'clothing',
    category VARCHAR(64) NOT NULL,
    fit fit_type_enum DEFAULT 'OVERSIZED',
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10, 2) CHECK (original_price >= price),
    badge VARCHAR(64),
    drop_name VARCHAR(128) NOT NULL DEFAULT 'DROP 09 — AFTER DARK',
    description TEXT NOT NULL,
    gsm INTEGER,
    rating NUMERIC(2, 1) DEFAULT 4.9 CHECK (rating >= 1.0 AND rating <= 5.0),
    review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    model_height VARCHAR(32),
    model_wearing_size VARCHAR(16),
    fabric_details JSONB DEFAULT '[]'::jsonb,
    care_instructions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCT VARIANTS (COLORWAYS & 360 SCRUBBER SPRITES)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color_name VARCHAR(64) NOT NULL,
    color_hex VARCHAR(16) NOT NULL,
    hero_image_url TEXT NOT NULL,
    -- Array of frame URLs for 16-angle 360 scrubbing or WebP sprite URL
    scrubber_frames JSONB DEFAULT '[]'::jsonb,
    scrubber_sprite_url TEXT,
    scrubber_frame_count INTEGER DEFAULT 16,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REAL INVENTORY STOCKS (ZERO FAKE FOMO: STRICT STOCK LEDGER)
CREATE TABLE IF NOT EXISTS inventory_stocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    size VARCHAR(16) NOT NULL,
    total_physical_stock INTEGER NOT NULL DEFAULT 0 CHECK (total_physical_stock >= 0),
    reserved_cart_stock INTEGER NOT NULL DEFAULT 0 CHECK (reserved_cart_stock >= 0),
    -- Computed available stock column
    available_stock INTEGER GENERATED ALWAYS AS (total_physical_stock - reserved_cart_stock) STORED,
    low_stock_threshold INTEGER DEFAULT 3,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_variant_size UNIQUE (variant_id, size)
);

-- 5. ORDERS & CHECKOUT TABLE
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    store_world store_world_enum NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    shipping_street TEXT NOT NULL,
    shipping_city VARCHAR(128) NOT NULL,
    shipping_state VARCHAR(128) NOT NULL,
    shipping_pincode VARCHAR(16) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(32) NOT NULL DEFAULT 'PREPAID',
    payment_status VARCHAR(32) NOT NULL DEFAULT 'CONFIRMED',
    order_status VARCHAR(64) NOT NULL DEFAULT 'ORDER_CONFIRMED',
    courier_name VARCHAR(64) DEFAULT 'DELHIVERY EXPRESS AIR',
    awb_tracking_number VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ORDER LINE ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID NOT NULL REFERENCES product_variants(id),
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(16) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    image_url TEXT
);

-- 7. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_store_world ON products(store_world);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_inventory_variant_size ON inventory_stocks(variant_id, size);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);

-- 8. INITIAL REAL STREETWEAR & FOOTWEAR SEED DATA (STRICT 100% MEN'S CATALOG)
INSERT INTO products (
    id, sku, slug, name, tagline, store_world, category, fit, price, original_price, badge, drop_name, description, gsm, rating, review_count, is_featured, model_height, model_wearing_size, fabric_details, care_instructions
) VALUES 
(
    'a1000000-0000-0000-0000-000000000001',
    'KM-DENIM-001',
    'dark-blue-barrel-fit-jeans',
    'DARK BLUE BARREL FIT JEANS',
    'Heavyweight Rigid Cotton Denim with Structured Curved Leg Silhouette',
    'clothing',
    'denim',
    'BAGGY',
    1899.00,
    2699.00,
    'GEN-Z TREND',
    'DROP 09 — AFTER DARK',
    'Engineered with premium rigid cotton denim in a deep indigo wash. Features the signature Gen-Z barrel-leg curve, relaxed rise, and vintage whiskering treatment.',
    440,
    4.9,
    47,
    true,
    '6''1" (185 cm)',
    '32',
    '["100% Cotton Rigid Denim", "Custom heavy contrast stitching", "Deep indigo stone-wash", "Mafia metallic rivets"]'::jsonb,
    '["Wash inside out with cold water", "Line dry in shade", "Do not bleach"]'::jsonb
),
(
    'a1000000-0000-0000-0000-000000000002',
    'KM-TEE-002',
    'black-and-white-striped-t-shirt',
    'BLACK AND WHITE STRIPED T-SHIRT',
    '280 GSM Premium Combed Cotton in Relaxed Boxy Silhouette',
    'clothing',
    'tees',
    'OVERSIZED',
    1449.00,
    1999.00,
    'BEST SELLER',
    'DROP 09 — AFTER DARK',
    'Yarn-dyed monochrome stripe pattern constructed from 280 GSM combed cotton. Dropped shoulder seams and reinforced ribbed collar for an effortless streetwear drape.',
    280,
    4.8,
    39,
    true,
    '6''0" (183 cm)',
    'L',
    '["100% Combed Heavy Cotton", "Yarn-dyed horizontal stripe pattern", "Drop-shoulder boxy cut", "Pre-shrunk fabric"]'::jsonb,
    '["Machine wash cold gentle", "Hang dry", "Warm iron if needed"]'::jsonb
),
(
    'a1000000-0000-0000-0000-000000000003',
    'KM-HOOD-003',
    'flame-graphic-heavyweight-hoodie',
    'FLAME GRAPHIC HEAVYWEIGHT HOODIE',
    '500 GSM Brushed Fleece with Double-Layered Hood Construction',
    'clothing',
    'hoodies',
    'OVERSIZED',
    2499.00,
    3499.00,
    'CORE DROP',
    'DROP 09 — AFTER DARK',
    'Maximum density 500 GSM loopback fleece built for winter night shifts. Features deep kangaroo pockets, reinforced eyelets, and high-density distressed flame artwork.',
    500,
    4.9,
    63,
    true,
    '6''2" (188 cm)',
    'XL',
    '["100% Ultra-Heavyweight Cotton Fleece", "Double-layered rigid hood", "Zero-drawstring minimalist collar", "Thick 2x2 ribbed cuffs"]'::jsonb,
    '["Machine wash inside out", "Do not tumble dry", "Iron on reverse"]'::jsonb
),
(
    'a1000000-0000-0000-0000-000000000004',
    'SM-SNK-001',
    'model-1239-chunky-street-sneaker',
    'MODEL 1239 CHUNKY STREET SNEAKER',
    'Multi-Layered Tactical High-Tread Sneaker with Reinforced Mudguard',
    'shoes',
    'Sneaker Shoes',
    'REGULAR',
    1899.00,
    2799.00,
    'SHOES MAFIA EXCLUSIVE',
    'FOOTWEAR DROP 01',
    'Chunky exaggerated platform sole with geometric traction channels and breathable mesh overlays. Engineered for all-day urban movement and heavy ground grip.',
    NULL,
    4.9,
    88,
    true,
    '6''0" (183 cm)',
    'UK 9',
    '["Abrasion-resistant ripstop mesh", "Dual-density EVA foam midsole", "High-grip vulcanized rubber outsole"]'::jsonb,
    '["Wipe clean with damp cloth", "Air dry naturally", "Do not submerge"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 9. INSERT VARIANTS WITH 16-ANGLE 360 SCRUBBER ARRAYS
INSERT INTO product_variants (
    id, product_id, color_name, color_hex, hero_image_url, scrubber_frames, scrubber_frame_count
) VALUES
(
    'b1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000001',
    'Dark Indigo Blue',
    '#1c2438',
    'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
    '[
      "https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605",
      "https://www.powerlook.in/cdn/shop/files/1_3x_3fcf586c-4861-41e9-9a73-82ef137f698e.jpg?v=1787636605",
      "https://www.powerlook.in/cdn/shop/files/2_3x_6bc7632a-d9df-4c3e-8f2e-0639e3ec0244.jpg?v=1787636605",
      "https://www.powerlook.in/cdn/shop/files/4_3x_c94025d5-8f64-44b4-82ee-674312c1bc9b.jpg?v=1787636605"
    ]'::jsonb,
    4
),
(
    'b1000000-0000-0000-0000-000000000002',
    'a1000000-0000-0000-0000-000000000002',
    'Monochrome Stripe',
    '#222222',
    'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304',
    '[
      "https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304",
      "https://www.powerlook.in/cdn/shop/files/1_3x_3fcf586c-4861-41e9-9a73-82ef137f698e.jpg?v=1787636605"
    ]'::jsonb,
    2
),
(
    'b1000000-0000-0000-0000-000000000003',
    'a1000000-0000-0000-0000-000000000003',
    'Washed Coal Black',
    '#171717',
    '/media/product-hoodie.png',
    '[
      "/media/product-hoodie.png",
      "/media/campaign-after-dark.png",
      "/media/product-hoodie.png"
    ]'::jsonb,
    3
),
(
    'b1000000-0000-0000-0000-000000000004',
    'a1000000-0000-0000-0000-000000000004',
    'Triple Black / Cement',
    '#111111',
    'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
    '[
      "https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg",
      "https://bunnyboss.in/secure-admin/uploads/item-master/1788695961_IMG_2627.PNG"
    ]'::jsonb,
    2
)
ON CONFLICT (id) DO NOTHING;

-- 10. REAL INVENTORY STOCK LEVELS (ACTUAL LEDGER NUMBERS)
INSERT INTO inventory_stocks (variant_id, size, total_physical_stock, reserved_cart_stock, low_stock_threshold) VALUES
('b1000000-0000-0000-0000-000000000001', '30', 4, 1, 3),
('b1000000-0000-0000-0000-000000000001', '32', 8, 2, 3),
('b1000000-0000-0000-0000-000000000001', '34', 2, 0, 3), -- Will trigger "Only 2 left"
('b1000000-0000-0000-0000-000000000001', '36', 1, 0, 2), -- Will trigger "Only 1 left"

('b1000000-0000-0000-0000-000000000002', 'S', 6, 1, 3),
('b1000000-0000-0000-0000-000000000002', 'M', 11, 3, 4),
('b1000000-0000-0000-0000-000000000002', 'L', 3, 1, 3), -- 2 available
('b1000000-0000-0000-0000-000000000002', 'XL', 1, 0, 2), -- 1 available

('b1000000-0000-0000-0000-000000000003', 'M', 5, 2, 3),
('b1000000-0000-0000-0000-000000000003', 'L', 2, 0, 2), -- 2 available
('b1000000-0000-0000-0000-000000000003', 'XL', 0, 0, 2), -- Sold out

('b1000000-0000-0000-0000-000000000004', 'UK 7', 3, 1, 2),
('b1000000-0000-0000-0000-000000000004', 'UK 8', 7, 2, 3),
('b1000000-0000-0000-0000-000000000004', 'UK 9', 2, 0, 2),
('b1000000-0000-0000-0000-000000000004', 'UK 10', 1, 0, 2)
ON CONFLICT (variant_id, size) DO UPDATE 
SET total_physical_stock = EXCLUDED.total_physical_stock,
    reserved_cart_stock = EXCLUDED.reserved_cart_stock;
