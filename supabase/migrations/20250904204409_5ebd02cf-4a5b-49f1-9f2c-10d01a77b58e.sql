-- Add lengths_and_prices column to custom_products table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'custom_products' 
        AND column_name = 'lengths_and_prices'
    ) THEN
        ALTER TABLE public.custom_products 
        ADD COLUMN lengths_and_prices jsonb NOT NULL DEFAULT '[]'::jsonb;
    END IF;
END $$;