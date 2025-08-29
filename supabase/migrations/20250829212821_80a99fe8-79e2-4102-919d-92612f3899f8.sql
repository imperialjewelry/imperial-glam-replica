
-- Make product_id nullable in orders table since we're storing product details in JSON
ALTER TABLE public.orders 
ALTER COLUMN product_id DROP NOT NULL;
