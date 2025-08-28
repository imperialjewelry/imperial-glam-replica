
-- Add lengths_and_prices column to bracelet_products table
ALTER TABLE public.bracelet_products 
ADD COLUMN lengths_and_prices jsonb DEFAULT '[]'::jsonb;
