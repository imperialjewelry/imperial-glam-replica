
-- Add product_table_type column to orders table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'product_table_type') THEN
        ALTER TABLE public.orders ADD COLUMN product_table_type TEXT;
    END IF;
END $$;
