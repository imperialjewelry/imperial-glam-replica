
-- Create watch_products table
CREATE TABLE public.watch_products (
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
  gemstone TEXT,
  diamond_cut TEXT,
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

-- Create pendant_products table
CREATE TABLE public.pendant_products (
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
  gemstone TEXT,
  diamond_cut TEXT,
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

-- Create earring_products table
CREATE TABLE public.earring_products (
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
  gemstone TEXT,
  diamond_cut TEXT,
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

-- Create hip_hop_ring_products table
CREATE TABLE public.hip_hop_ring_products (
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
  gemstone TEXT,
  diamond_cut TEXT,
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

-- Create engagement_ring_products table
CREATE TABLE public.engagement_ring_products (
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
  gemstone TEXT,
  diamond_cut TEXT,
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
ALTER TABLE public.watch_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendant_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earring_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hip_hop_ring_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_ring_products ENABLE ROW LEVEL SECURITY;

-- Create policies for all tables
CREATE POLICY "Anyone can view watch products" ON public.watch_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view pendant products" ON public.pendant_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view earring products" ON public.earring_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view hip hop ring products" ON public.hip_hop_ring_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view engagement ring products" ON public.engagement_ring_products FOR SELECT USING (true);

-- Insert sample data for watches
INSERT INTO public.watch_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, gemstone, diamond_cut, sizes, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_watch_1', 'Presidential Moissanite Watch 14K Gold', 'Luxury presidential watch with moissanite', 185000, 194700, 'Watches', 'Presidential Watches', 'Yellow Gold', '925 Silver', 'Moissanite', 'Round Cut', '{"41MM","42MM"}', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 5, 342, 5, true, true, true),
('prod_watch_2', 'Bust Down VVS Diamond Watch 14K Gold', 'Iced out bust down watch', 245000, 257800, 'Watches', 'Bust Down Watches', 'White Gold', '925 Silver', 'VVS Diamond Simulants (CZ)', 'Round Cut', '{"40MM","41MM"}', 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80', 5, 156, 5, true, true, false),
('prod_watch_3', 'Skeleton Automatic Watch 14K White Gold', 'Premium skeleton watch', 289000, 304200, 'Watches', 'Skeleton Watches', 'Rose Gold', 'Solid Gold', 'VVS Moissanite', 'Baguette Cut', '{}', 'https://images.unsplash.com/photo-1548181622-7187e8b5c5b4?auto=format&fit=crop&w=800&q=80', 5, 89, 5, true, false, true);

-- Insert sample data for pendants
INSERT INTO public.pendant_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, gemstone, diamond_cut, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_pendant_1', 'Cross Pendant 14K Gold Moissanite', 'Religious cross pendant with stones', 45600, 48000, 'Pendants', 'Cross Pendants', 'Yellow Gold', '925 Silver', 'Moissanite', 'Round Cut', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 189, 5, true, true, true),
('prod_pendant_2', 'Jesus Piece Pendant White Gold', 'Detailed Jesus piece pendant', 78900, 83000, 'Pendants', 'Jesus Piece Pendants', 'White Gold', '925 Silver', 'VVS Diamond Simulants (CZ)', 'Round Cut', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 267, 5, true, true, false),
('prod_pendant_3', 'Custom Name Pendant Rose Gold', 'Personalized name pendant', 123500, 130000, 'Pendants', 'Custom Pendants', 'Rose Gold', 'Solid Gold', 'VVS Moissanite', 'Emerald Cut', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 95, 5, true, false, true);

-- Insert sample data for earrings
INSERT INTO public.earring_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, gemstone, diamond_cut, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_earring_1', 'Diamond Stud Earrings 14K Gold', 'Classic diamond stud earrings', 34500, 36300, 'Earrings', 'Stud Earrings', 'Yellow Gold', '925 Silver', 'Moissanite', 'Round Cut', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 234, 5, true, true, true),
('prod_earring_2', 'Hoop Earrings VVS White Gold', 'Large hoop earrings with stones', 56700, 59700, 'Earrings', 'Hoop Earrings', 'White Gold', '925 Silver', 'VVS Diamond Simulants (CZ)', 'Round Cut', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 178, 5, true, true, false),
('prod_earring_3', 'Drop Earrings Moissanite Rose Gold', 'Elegant drop earrings', 67800, 71300, 'Earrings', 'Drop Earrings', 'Rose Gold', 'Brass', 'VVS Moissanites', 'Baguette Cut', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 145, 5, true, false, true);

-- Insert sample data for hip hop rings
INSERT INTO public.hip_hop_ring_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, gemstone, diamond_cut, sizes, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_hiphop_ring_1', 'Iced Out Pinky Ring 14K Gold', 'Flashy pinky ring with stones', 89500, 94200, 'Hip Hop Rings', 'Pinky Rings', 'Yellow Gold', '925 Silver', 'Moissanite', 'Round Cut', '{"6","7","8","9","10","11","12"}', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 298, 5, true, true, true),
('prod_hiphop_ring_2', 'Championship Ring White Gold', 'Custom championship style ring', 156700, 164900, 'Hip Hop Rings', 'Championship Rings', 'White Gold', 'Solid Gold', 'VVS Diamond Simulants (CZ)', 'Emerald Cut', '{"8","9","10","11","12"}', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 167, 5, true, true, false),
('prod_hiphop_ring_3', 'Cuban Link Ring Rose Gold', 'Cuban link style ring', 67800, 71300, 'Hip Hop Rings', 'Cuban Link Rings', 'Rose Gold', '925 Silver', 'VVS Moissanite', 'Round Cut', '{"7","8","9","10","11"}', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 201, 5, true, false, true);

-- Insert sample data for engagement rings
INSERT INTO public.engagement_ring_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, gemstone, diamond_cut, sizes, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_engagement_1', 'Solitaire Engagement Ring 14K Gold', 'Classic solitaire engagement ring', 234500, 246800, 'Engagement Rings', 'Solitaire Rings', 'Yellow Gold', 'Solid Gold', 'Moissanite', 'Round Cut', '{"5","6","7","8","9"}', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 412, 5, true, true, true),
('prod_engagement_2', 'Halo Engagement Ring White Gold', 'Stunning halo setting ring', 345600, 363800, 'Engagement Rings', 'Halo Rings', 'White Gold', 'Solid Gold', 'VVS Diamond Simulants (CZ)', 'Princess Cut', '{"5","6","7","8","9"}', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 378, 5, true, true, false),
('prod_engagement_3', 'Vintage Engagement Ring Rose Gold', 'Vintage inspired engagement ring', 278900, 293600, 'Engagement Rings', 'Vintage Rings', 'Rose Gold', 'Solid Gold', 'VVS Moissanite', 'Oval Cut', '{"5","6","7","8","9"}', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 5, 289, 5, true, false, true);
