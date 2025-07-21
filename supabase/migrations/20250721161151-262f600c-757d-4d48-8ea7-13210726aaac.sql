
-- Add stripe_price_id column to all product tables
ALTER TABLE public.bracelet_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.chain_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.custom_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.diamond_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.earring_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.engagement_ring_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.glasses_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.grillz_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.hip_hop_ring_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.pendant_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.vvs_simulant_products ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.watch_products ADD COLUMN stripe_price_id TEXT;

-- Update existing sample data with placeholder stripe price IDs
-- Bracelet products
UPDATE public.bracelet_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Chain products  
UPDATE public.chain_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Custom products
UPDATE public.custom_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Diamond products
UPDATE public.diamond_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Earring products
UPDATE public.earring_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Engagement ring products
UPDATE public.engagement_ring_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Glasses products
UPDATE public.glasses_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Grillz products
UPDATE public.grillz_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Hip hop ring products
UPDATE public.hip_hop_ring_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Pendant products
UPDATE public.pendant_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- VVS simulant products
UPDATE public.vvs_simulant_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Watch products
UPDATE public.watch_products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;

-- Also add stripe_price_id to the unified products table
ALTER TABLE public.products ADD COLUMN stripe_price_id TEXT;
UPDATE public.products SET stripe_price_id = 'price_' || id WHERE stripe_price_id IS NULL;
