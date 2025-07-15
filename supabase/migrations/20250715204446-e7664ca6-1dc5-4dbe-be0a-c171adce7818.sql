
-- Create the bracelet_products table
CREATE TABLE public.bracelet_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- price in cents
  original_price INTEGER, -- original price in cents for discounts
  category TEXT NOT NULL, -- e.g., "925 SILVER / UNISEX", "CZ / UNISEX", "BAGUETTE / UNISEX"
  product_type TEXT NOT NULL, -- e.g., "Cuban Bracelets", "Tennis Bracelets", "Baguette Bracelets"
  color TEXT NOT NULL, -- e.g., "Yellow Gold", "White Gold", "Rose Gold", "Black Gold"
  material TEXT NOT NULL, -- e.g., "925 Silver", "Solid Gold", "Brass"
  gemstone TEXT, -- e.g., "Moissanite", "VVS Moissanite", "VVS Diamond Simulants (CZ)"
  diamond_cut TEXT, -- e.g., "Round Cut", "Baguette", "Oval Cut", "Emerald Cut"
  sizes TEXT[] DEFAULT '{}', -- array of available sizes
  image_url TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_bracelet_products_product_type ON bracelet_products(product_type);
CREATE INDEX idx_bracelet_products_color ON bracelet_products(color);
CREATE INDEX idx_bracelet_products_material ON bracelet_products(material);
CREATE INDEX idx_bracelet_products_gemstone ON bracelet_products(gemstone);
CREATE INDEX idx_bracelet_products_diamond_cut ON bracelet_products(diamond_cut);
CREATE INDEX idx_bracelet_products_price ON bracelet_products(price);
CREATE INDEX idx_bracelet_products_featured ON bracelet_products(featured);
CREATE INDEX idx_bracelet_products_ships_today ON bracelet_products(ships_today);

-- Insert sample bracelet products
INSERT INTO bracelet_products (
  stripe_product_id,
  name,
  description,
  price,
  original_price,
  category,
  product_type,
  color,
  material,
  gemstone,
  diamond_cut,
  sizes,
  image_url,
  rating,
  review_count,
  discount_percentage,
  in_stock,
  ships_today,
  featured
) VALUES 
(
  'prod_bracelet_001',
  'Moissanite Tennis Bracelet 14K Gold (ALL SIZES)',
  'Premium moissanite tennis bracelet in 14K gold with brilliant sparkle',
  35600, -- $356.00 in cents
  37500, -- $375.00 in cents
  '925 SILVER / UNISEX',
  'Tennis Bracelets',
  'Yellow Gold',
  '925 Silver',
  'Moissanite',
  'Round Cut',
  ARRAY['6MM', '5MM', '4MM', '3MM'],
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  5.0,
  892,
  5,
  true,
  true,
  true
),
(
  'prod_bracelet_002',
  'VVS Cuban Bracelet 14K Gold (ALL SIZES)',
  'High-quality VVS cubic zirconia Cuban bracelet',
  19500, -- $195.00 in cents
  20500, -- $205.00 in cents
  'CZ / UNISEX',
  'Cuban Bracelets',
  'White Gold',
  '925 Silver',
  'VVS Diamond Simulants (CZ)',
  'Round Cut',
  ARRAY['8MM', '6MM'],
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
  5.0,
  445,
  5,
  true,
  true,
  false
),
(
  'prod_bracelet_003',
  'Baguette Tennis Bracelet 14K Gold',
  'Elegant baguette cut tennis bracelet',
  28700, -- $287.00 in cents
  30200, -- $302.00 in cents
  'BAGUETTE / UNISEX',
  'Baguette Bracelets',
  'Rose Gold',
  '925 Silver',
  'VVS Diamond Simulants (CZ)',
  'Baguette',
  ARRAY['5MM', '4MM'],
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
  5.0,
  326,
  5,
  true,
  true,
  false
),
(
  'prod_bracelet_004',
  'Cross Cuban Bracelet 14K Gold',
  'Stylish cross-themed Cuban bracelet',
  44400, -- $444.00 in cents
  46700, -- $467.00 in cents
  'CROSS / UNISEX',
  'Cross Bracelets',
  'Yellow Gold',
  'Solid Gold',
  'VVS Diamond Simulants (CZ)',
  'Round Cut',
  ARRAY[],
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  5.0,
  156,
  5,
  true,
  false,
  false
),
(
  'prod_bracelet_005',
  'Four-Leaf Clover Bracelet 14K Gold',
  'Lucky four-leaf clover design bracelet',
  32700, -- $327.00 in cents
  34400, -- $344.00 in cents
  'CLOVER / UNISEX',
  'Four-Leaf Clover Bracelets',
  'White Gold',
  '925 Silver',
  'Moissanite',
  'Round Cut',
  ARRAY[],
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
  5.0,
  234,
  5,
  true,
  false,
  false
),
(
  'prod_bracelet_006',
  'Infinity Link Bracelet 14K Gold',
  'Elegant infinity symbol link bracelet',
  39500, -- $395.00 in cents
  41600, -- $416.00 in cents
  'INFINITY / UNISEX',
  'Infinity Link Bracelets',
  'Rose Gold',
  'Brass',
  'VVS Moissanite',
  'Round Cut',
  ARRAY[],
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
  5.0,
  167,
  5,
  true,
  false,
  false
);

-- Enable Row Level Security
ALTER TABLE public.bracelet_products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to bracelet products
CREATE POLICY "Anyone can view bracelet products" ON public.bracelet_products
  FOR SELECT USING (true);

-- Update orders table to support bracelet products
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS product_table_type TEXT DEFAULT 'chain_products';
