
-- Add lengths_and_prices column to grillz_products table to store teeth count options with prices and stripe IDs
ALTER TABLE public.grillz_products 
ADD COLUMN lengths_and_prices jsonb DEFAULT '[]'::jsonb;

-- Update the comment to reflect the new usage for teeth count pricing
COMMENT ON COLUMN public.grillz_products.lengths_and_prices IS 'JSON array storing teeth count options with corresponding prices and stripe price IDs';
