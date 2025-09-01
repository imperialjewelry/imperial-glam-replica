
-- Add lengths_and_prices column to diamond_products table
ALTER TABLE public.diamond_products 
ADD COLUMN lengths_and_prices jsonb DEFAULT '[]'::jsonb;
