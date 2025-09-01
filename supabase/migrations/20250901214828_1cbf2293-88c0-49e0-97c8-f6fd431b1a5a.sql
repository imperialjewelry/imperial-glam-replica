
-- First, let's check if triggers exist for all product tables and create them if missing
-- Create triggers for all product tables to sync to the unified products table

-- Chain products trigger
DROP TRIGGER IF EXISTS sync_chain_products_trigger ON public.chain_products;
CREATE TRIGGER sync_chain_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.chain_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Bracelet products trigger  
DROP TRIGGER IF EXISTS sync_bracelet_products_trigger ON public.bracelet_products;
CREATE TRIGGER sync_bracelet_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.bracelet_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Watch products trigger
DROP TRIGGER IF EXISTS sync_watch_products_trigger ON public.watch_products;
CREATE TRIGGER sync_watch_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.watch_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Pendant products trigger
DROP TRIGGER IF EXISTS sync_pendant_products_trigger ON public.pendant_products;
CREATE TRIGGER sync_pendant_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.pendant_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Earring products trigger
DROP TRIGGER IF EXISTS sync_earring_products_trigger ON public.earring_products;
CREATE TRIGGER sync_earring_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.earring_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Grillz products trigger
DROP TRIGGER IF EXISTS sync_grillz_products_trigger ON public.grillz_products;
CREATE TRIGGER sync_grillz_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.grillz_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- VVS simulant products trigger
DROP TRIGGER IF EXISTS sync_vvs_simulant_products_trigger ON public.vvs_simulant_products;
CREATE TRIGGER sync_vvs_simulant_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.vvs_simulant_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Hip hop ring products trigger
DROP TRIGGER IF EXISTS sync_hip_hop_ring_products_trigger ON public.hip_hop_ring_products;
CREATE TRIGGER sync_hip_hop_ring_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.hip_hop_ring_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Engagement ring products trigger
DROP TRIGGER IF EXISTS sync_engagement_ring_products_trigger ON public.engagement_ring_products;
CREATE TRIGGER sync_engagement_ring_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.engagement_ring_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Diamond products trigger
DROP TRIGGER IF EXISTS sync_diamond_products_trigger ON public.diamond_products;
CREATE TRIGGER sync_diamond_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.diamond_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Glasses products trigger
DROP TRIGGER IF EXISTS sync_glasses_products_trigger ON public.glasses_products;
CREATE TRIGGER sync_glasses_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.glasses_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Custom products trigger
DROP TRIGGER IF EXISTS sync_custom_products_trigger ON public.custom_products;
CREATE TRIGGER sync_custom_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.custom_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Now manually sync all existing products to the unified table by inserting/updating from each table
-- This will populate the products table with all existing data

-- Clear and repopulate the products table
DELETE FROM public.products;

-- Insert from chain_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'chain_products', id
FROM public.chain_products;

-- Insert from bracelet_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'bracelet_products', id
FROM public.bracelet_products;

-- Insert from watch_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'watch_products', id
FROM public.watch_products;

-- Insert from pendant_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'pendant_products', id
FROM public.pendant_products;

-- Insert from earring_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'earring_products', id
FROM public.earring_products;

-- Insert from grillz_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'grillz_products', id
FROM public.grillz_products;

-- Insert from vvs_simulant_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'vvs_simulant_products', id
FROM public.vvs_simulant_products;

-- Insert from hip_hop_ring_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'hip_hop_ring_products', id
FROM public.hip_hop_ring_products;

-- Insert from engagement_ring_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'engagement_ring_products', id
FROM public.engagement_ring_products;

-- Insert from diamond_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'diamond_products', id
FROM public.diamond_products;

-- Insert from glasses_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'glasses_products', id
FROM public.glasses_products;

-- Insert from custom_products
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, stripe_price_id, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, COALESCE(rating, 5.0), COALESCE(review_count, 0), COALESCE(discount_percentage, 0),
  COALESCE(in_stock, true), COALESCE(ships_today, false), COALESCE(featured, false), 
  COALESCE(sizes, ARRAY[]::text[]), stripe_price_id, 'custom_products', id
FROM public.custom_products;
