
-- Create a separate table for bracelet products
CREATE TABLE public.bracelet_products (
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

-- Add Row Level Security (RLS) to allow public read access
ALTER TABLE public.bracelet_products ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view bracelet products
CREATE POLICY "Anyone can view bracelet products" 
  ON public.bracelet_products 
  FOR SELECT 
  USING (true);

-- Insert some sample bracelet data based on your filter requirements
INSERT INTO public.bracelet_products (
  stripe_product_id, name, description, price, original_price, category, product_type, 
  color, material, gemstone, diamond_cut, image_url, rating, review_count, 
  discount_percentage, in_stock, ships_today, featured
) VALUES 
('prod_bracelet_1', 'Moissanite Cuban Bracelet 14K Gold', 'Premium Cuban bracelet with moissanite stones', 47600, 50100, 'Bracelets', 'Cuban Bracelets', 'Yellow Gold', '925 Silver', 'Moissanite', 'Round Cut', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 108, 5, true, true, true),
('prod_bracelet_2', 'VVS Tennis Bracelet 14K White Gold', 'Classic tennis bracelet with VVS stones', 22500, 23700, 'Bracelets', 'Tennis Bracelets', 'White Gold', '925 Silver', 'VVS Diamond Simulants (CZ)', 'Round Cut', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 256, 5, true, true, false),
('prod_bracelet_3', 'Plain Cuban Link Bracelet Rose Gold', 'Simple and elegant Cuban link design', 33700, 35500, 'Bracelets', 'Plain Cuban Bracelets', 'Rose Gold', '925 Silver', null, 'Round Cut', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 62, 5, true, false, false),
('prod_bracelet_4', 'Baguette Diamond Bracelet 14K Gold', 'Stunning baguette cut diamond bracelet', 123500, 130000, 'Bracelets', 'Baguette Bracelets', 'Yellow Gold', 'Solid Gold', 'VVS Moissanite', 'Baguette Cut', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 5, 106, 5, true, true, true),
('prod_bracelet_5', 'Cross Link Bracelet Black Gold', 'Unique cross design bracelet', 89200, 93900, 'Bracelets', 'Cross Bracelets', 'Black Gold', 'Brass', 'VVS Moissanites', 'Emerald Cut', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80', 5, 44, 5, true, true, false);
