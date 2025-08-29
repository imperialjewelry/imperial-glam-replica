
-- Add customizable column to custom_products table
ALTER TABLE public.custom_products 
ADD COLUMN customizable boolean DEFAULT false;

-- Update existing products to be customizable by default (you can change this later)
UPDATE public.custom_products 
SET customizable = true;
