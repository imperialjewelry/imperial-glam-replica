
-- Add columns to support multiple prices and lengths for chain products
ALTER TABLE public.chain_products 
ADD COLUMN lengths_and_prices JSONB DEFAULT '[]'::jsonb;

-- Add a comment to explain the structure
COMMENT ON COLUMN public.chain_products.lengths_and_prices IS 'Array of objects with structure: [{"length": "18\"", "price": 199900, "stripe_price_id": "price_xxx"}, ...]';

-- Update existing products to use the new structure if they have single price
UPDATE public.chain_products 
SET lengths_and_prices = jsonb_build_array(
  jsonb_build_object(
    'length', '20"',
    'price', price,
    'stripe_price_id', stripe_price_id
  )
)
WHERE stripe_price_id IS NOT NULL AND lengths_and_prices = '[]'::jsonb;
