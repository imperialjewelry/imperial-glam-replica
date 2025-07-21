
-- Add stripe_price_id column to all product tables
ALTER TABLE public.bracelet_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.chain_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.custom_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.diamond_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.earring_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.engagement_ring_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.glasses_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.grillz_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.hip_hop_ring_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.pendant_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.vvs_simulant_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE public.watch_products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

-- Update existing sample data with placeholder stripe price IDs
UPDATE public.bracelet_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.chain_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.custom_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.diamond_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.earring_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.engagement_ring_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.glasses_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.grillz_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.hip_hop_ring_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.pendant_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.vvs_simulant_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
UPDATE public.watch_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Also ensure the unified products table has stripe_price_id
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
UPDATE public.products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
