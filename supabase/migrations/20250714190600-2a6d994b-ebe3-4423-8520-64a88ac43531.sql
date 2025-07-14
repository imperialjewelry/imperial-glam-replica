
-- Create a table for chain products
CREATE TABLE public.chain_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- price in cents
  original_price INTEGER, -- original price in cents for discounts
  category TEXT NOT NULL, -- e.g., "925 SILVER / UNISEX", "CZ / UNISEX"
  product_type TEXT NOT NULL, -- e.g., "Cuban Chains", "Tennis Chains"
  color TEXT NOT NULL, -- e.g., "Yellow Gold", "White Gold"
  material TEXT NOT NULL, -- e.g., "925 Silver", "14K Solid Gold"
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
CREATE INDEX idx_chain_products_product_type ON chain_products(product_type);
CREATE INDEX idx_chain_products_color ON chain_products(color);
CREATE INDEX idx_chain_products_material ON chain_products(material);
CREATE INDEX idx_chain_products_price ON chain_products(price);
CREATE INDEX idx_chain_products_featured ON chain_products(featured);

-- Insert sample data starting with your product ID
INSERT INTO chain_products (
  stripe_product_id,
  name,
  description,
  price,
  original_price,
  category,
  product_type,
  color,
  material,
  sizes,
  image_url,
  rating,
  review_count,
  discount_percentage,
  in_stock,
  ships_today,
  featured
) VALUES (
  'prod_SgE71m1aZ0YJhh',
  'Moissanite Tennis Chain 14K Gold (ALL SIZES)',
  'Premium moissanite tennis chain in 14K gold with brilliant sparkle',
  47600, -- $476.00 in cents
  50100, -- $501.00 in cents
  '925 SILVER / UNISEX',
  'Tennis Chains',
  'Yellow Gold',
  '925 Silver',
  ARRAY['6MM', '5MM', '4MM', '3MM', '2MM'],
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
  5.0,
  1082,
  5,
  true,
  true,
  true
);

-- Add a few more sample products to populate the page
INSERT INTO chain_products (
  stripe_product_id,
  name,
  description,
  price,
  original_price,
  category,
  product_type,
  color,
  material,
  sizes,
  image_url,
  rating,
  review_count,
  discount_percentage,
  in_stock,
  ships_today
) VALUES 
(
  'prod_sample_001',
  'VVS Tennis Chain 14K Gold (ALL SIZES)',
  'High-quality VVS cubic zirconia tennis chain',
  22500,
  23700,
  'CZ / UNISEX',
  'Tennis Chains',
  'White Gold',
  '14K Solid Gold',
  ARRAY['3MM', '5MM'],
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  5.0,
  256,
  5,
  true,
  true
),
(
  'prod_sample_002',
  'VVS Cuban Link Chain 14K Gold (ALL SIZES)',
  'Premium Cuban link chain with VVS stones',
  33700,
  35500,
  'CZ / UNISEX',
  'Cuban Chains',
  'Rose Gold',
  '925 Silver',
  ARRAY['20MM', '15MM', '8MM'],
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
  5.0,
  626,
  5,
  true,
  true
);

-- Enable Row Level Security (optional - for future user-specific features)
ALTER TABLE public.chain_products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Anyone can view chain products" ON public.chain_products
  FOR SELECT USING (true);

-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_email TEXT,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  product_id UUID REFERENCES chain_products(id) NOT NULL,
  selected_size TEXT,
  amount INTEGER NOT NULL, -- amount paid in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- pending, paid, failed, cancelled
  customer_details JSONB, -- store customer info from Stripe
  shipping_details JSONB, -- store shipping info
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for order lookups
CREATE INDEX idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- Allow edge functions to insert and update orders
CREATE POLICY "Service role can manage orders" ON public.orders
  FOR ALL USING (true);
