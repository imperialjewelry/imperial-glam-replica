
-- Add product_table_type column to orders table to track which product table the order references
ALTER TABLE public.orders ADD COLUMN product_table_type TEXT;

-- Update existing orders to reference chain_products as default (since that was the original implementation)
UPDATE public.orders SET product_table_type = 'chain_products' WHERE product_table_type IS NULL;
