
-- Create custom_products table
CREATE TABLE public.custom_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  material TEXT NOT NULL,
  shape TEXT,
  gemstone TEXT,
  sizes TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  customizable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grillz_products table
CREATE TABLE public.grillz_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  material TEXT NOT NULL,
  style TEXT,
  gemstone TEXT,
  teeth_count TEXT,
  sizes TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create glasses_products table
CREATE TABLE public.glasses_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  lens_color TEXT,
  material TEXT NOT NULL,
  frame_style TEXT,
  sizes TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create diamond_products table
CREATE TABLE public.diamond_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  material TEXT NOT NULL,
  chain_type TEXT,
  sizes TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vvs_simulant_products table
CREATE TABLE public.vvs_simulant_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  material TEXT NOT NULL,
  carat_weight TEXT,
  cut_quality TEXT,
  clarity_grade TEXT,
  sizes TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for all tables
ALTER TABLE public.custom_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grillz_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glasses_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diamond_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vvs_simulant_products ENABLE ROW LEVEL SECURITY;

-- Create policies for all tables
CREATE POLICY "Anyone can view custom products" ON public.custom_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view grillz products" ON public.grillz_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view glasses products" ON public.glasses_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view diamond products" ON public.diamond_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view vvs simulant products" ON public.vvs_simulant_products FOR SELECT USING (true);

-- Insert sample data for custom products
INSERT INTO public.custom_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, shape, gemstone, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured, customizable
) VALUES 
('prod_custom_1', 'Custom Name Pendant 14K Gold', 'Personalized name pendant', 38500, 40500, 'NAME PENDANTS / UNISEX', 'Name Pendants', 'Yellow Gold', '925 Silver', 'Letters', 'Moissanite', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 892, 5, true, true, true, true),
('prod_custom_2', 'Custom Letter Pendant 925 Silver', 'Single letter pendant', 15600, 16400, 'LETTER PENDANTS / UNISEX', 'Letter Pendants', 'White Gold', '925 Silver', 'Letter shape', 'VVS Diamond Simulants (CZ)', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 445, 5, true, true, false, true),
('prod_custom_3', 'Custom Logo Pendant Moissanite 14K Gold', 'Custom logo design', 56700, 59700, 'LOGO PENDANTS / UNISEX', 'Logo Pendants', 'Rose Gold', 'Solid Gold', 'Logo', 'VVS Moissanite', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80', 5, 328, 5, true, true, true, true);

-- Insert sample data for grillz
INSERT INTO public.grillz_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, style, gemstone, teeth_count, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_grillz_1', 'Diamond Grillz Top 6 14K Gold', 'Premium diamond top grillz', 234500, 246800, 'Top Grillz', 'Diamond Grillz', 'Yellow Gold', 'Solid Gold', 'Iced Out', 'VVS Diamond Simulants (CZ)', '6 Teeth', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 342, 5, true, true, true),
('prod_grillz_2', 'Moissanite Grillz Bottom 8 White Gold', 'Moissanite bottom grillz set', 189000, 198900, 'Bottom Grillz', 'Moissanite Grillz', 'White Gold', '925 Silver', 'Classic', 'Moissanite', '8 Teeth', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 267, 5, true, true, false),
('prod_grillz_3', 'Full Set Grillz Rose Gold Custom', 'Complete top and bottom set', 445600, 468400, 'Full Set Grillz', 'Custom Grillz', 'Rose Gold', 'Solid Gold', 'Custom Design', 'VVS Moissanite', 'Full Set', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80', 5, 156, 5, true, false, true);

-- Insert sample data for glasses
INSERT INTO public.glasses_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, lens_color, material, frame_style, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_glasses_1', 'Custom Sunglasses 14K Gold Frame', 'Luxury custom sunglasses', 47600, 50100, 'CUSTOM / UNISEX', 'Custom Sunglasses', 'Yellow Gold', 'Black', '14K Gold', 'Aviator', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80', 5, 1082, 5, true, true, true),
('prod_glasses_2', 'Fleuree Glasses 14K Gold', 'Designer fleuree style', 82500, 86700, 'FLEUREE / UNISEX', 'Fleuree Glasses', 'White Gold', 'Clear', '14K Gold', 'Rectangle', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80', 5, 456, 5, true, true, false),
('prod_glasses_3', 'Classic Glasses Rose Gold', 'Classic design glasses', 120000, 126500, 'CLASSIC / UNISEX', 'Classic Glasses', 'Rose Gold', 'Brown', '14K Gold', 'Round', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', 5, 89, 5, true, false, true);

-- Insert sample data for diamond chains
INSERT INTO public.diamond_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, chain_type, sizes, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_diamond_1', 'Diamond Cuban Chain 14K Gold Premium', 'Premium diamond cuban chain', 289500, 304700, '14K SOLID GOLD / UNISEX', 'Cuban Chains', 'Yellow Gold', '14K Solid Gold', 'Cuban Link', '{"6MM","5MM","4MM"}', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 342, 5, true, true, true),
('prod_diamond_2', 'Diamond Tennis Chain 14K Gold Classic', 'Classic tennis chain design', 329900, 347200, '14K SOLID GOLD / UNISEX', 'Tennis Chains', 'White Gold', '14K Solid Gold', 'Tennis', '{}', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 456, 5, true, true, false),
('prod_diamond_3', 'Diamond Figaro Chain 14K Gold', 'Premium figaro chain', 274900, 289300, '14K SOLID GOLD / UNISEX', 'Figaro Chains', 'Rose Gold', '14K Solid Gold', 'Figaro', '{}', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80', 5, 189, 5, true, false, true);

-- Insert sample data for VVS simulants
INSERT INTO public.vvs_simulant_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, carat_weight, cut_quality, clarity_grade, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_vvs_1', 'VVS Diamond Simulant Round 2CT', 'Premium VVS diamond simulant', 45600, 48000, 'Loose Stones', 'Round Simulants', 'Colorless', 'Synthetic Diamond', '2.0 CT', 'Excellent', 'VVS1', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 234, 5, true, true, true),
('prod_vvs_2', 'VVS Diamond Simulant Princess 1.5CT', 'Princess cut VVS simulant', 38900, 40900, 'Loose Stones', 'Princess Simulants', 'Near Colorless', 'Synthetic Diamond', '1.5 CT', 'Very Good', 'VVS2', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 189, 5, true, true, false),
('prod_vvs_3', 'VVS Diamond Simulant Emerald 3CT', 'Emerald cut premium simulant', 67800, 71300, 'Loose Stones', 'Emerald Simulants', 'Fancy Yellow', 'Synthetic Diamond', '3.0 CT', 'Excellent', 'VVS1', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 156, 5, true, false, true);
