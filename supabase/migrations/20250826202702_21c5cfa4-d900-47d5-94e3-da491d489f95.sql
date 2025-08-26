
-- Create a table for promo codes
CREATE TABLE public.promo_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  active BOOLEAN NOT NULL DEFAULT true,
  usage_limit INTEGER,
  usage_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view active promo codes (for validation)
CREATE POLICY "Anyone can view active promo codes" 
  ON public.promo_codes 
  FOR SELECT 
  USING (active = true);

-- Create policy that allows service role to manage promo codes
CREATE POLICY "Service role can manage promo codes" 
  ON public.promo_codes 
  FOR ALL 
  USING (true);

-- Insert some sample promo codes for testing
INSERT INTO public.promo_codes (code, discount_percentage, usage_limit, expires_at) VALUES
('SAVE10', 10, 100, now() + interval '30 days'),
('WELCOME20', 20, 50, now() + interval '60 days'),
('FLASH25', 25, 25, now() + interval '7 days');
