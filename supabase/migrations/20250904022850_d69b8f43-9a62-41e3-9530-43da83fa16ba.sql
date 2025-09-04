-- Create polo_g table for Polo G products
CREATE TABLE public.polo_g (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  material TEXT NOT NULL,
  gemstone TEXT,
  image_url TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  sizes TEXT[] DEFAULT '{}',
  lengths_and_prices JSONB DEFAULT '[]',
  stripe_price_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.polo_g ENABLE ROW LEVEL SECURITY;

-- Create policies for polo_g table
CREATE POLICY "Anyone can view polo g products" 
ON public.polo_g 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage polo g products" 
ON public.polo_g 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_polo_g_updated_at
BEFORE UPDATE ON public.polo_g
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to sync with unified products table
CREATE TRIGGER sync_polo_g_to_unified
AFTER INSERT OR UPDATE OR DELETE ON public.polo_g
FOR EACH ROW
EXECUTE FUNCTION public.sync_product_to_unified_table();