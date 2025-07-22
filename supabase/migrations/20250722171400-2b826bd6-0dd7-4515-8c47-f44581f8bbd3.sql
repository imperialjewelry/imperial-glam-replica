
-- Update the sync function to handle DELETE operations properly and fix null value issues
CREATE OR REPLACE FUNCTION sync_product_to_unified_table()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle DELETE first
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.products 
    WHERE source_table = TG_TABLE_NAME AND source_id = OLD.id;
    RETURN OLD;
  END IF;
  
  -- Handle INSERT and UPDATE - add null checks
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    -- Skip if essential fields are null
    IF NEW.name IS NULL OR NEW.stripe_product_id IS NULL THEN
      RETURN NEW;
    END IF;
    
    INSERT INTO public.products (
      name, description, price, original_price, category, product_type, color, material,
      image_url, stripe_product_id, rating, review_count, discount_percentage,
      in_stock, ships_today, featured, sizes, gemstone, diamond_cut, chain_type,
      frame_style, lens_color, style, teeth_count, shape, customizable,
      carat_weight, cut_quality, clarity_grade, stripe_price_id, source_table, source_id
    )
    VALUES (
      NEW.name, 
      NEW.description, 
      COALESCE(NEW.price, 0), 
      NEW.original_price, 
      COALESCE(NEW.category, ''), 
      COALESCE(NEW.product_type, ''),
      COALESCE(NEW.color, ''), 
      COALESCE(NEW.material, ''), 
      COALESCE(NEW.image_url, ''), 
      NEW.stripe_product_id, 
      COALESCE(NEW.rating, 5.0),
      COALESCE(NEW.review_count, 0), 
      COALESCE(NEW.discount_percentage, 0), 
      COALESCE(NEW.in_stock, true), 
      COALESCE(NEW.ships_today, false),
      COALESCE(NEW.featured, false), 
      COALESCE(NEW.sizes, ARRAY[]::text[]), 
      CASE WHEN TG_TABLE_NAME IN ('earring_products', 'pendant_products', 'custom_products', 'grillz_products', 'hip_hop_ring_products', 'bracelet_products', 'engagement_ring_products', 'watch_products') 
           THEN NEW.gemstone ELSE NULL END,
      CASE WHEN TG_TABLE_NAME IN ('earring_products', 'pendant_products', 'hip_hop_ring_products', 'bracelet_products', 'engagement_ring_products', 'watch_products') 
           THEN NEW.diamond_cut ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'diamond_products' THEN NEW.chain_type ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'glasses_products' THEN NEW.frame_style ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'glasses_products' THEN NEW.lens_color ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'grillz_products' THEN NEW.style ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'grillz_products' THEN NEW.teeth_count ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'custom_products' THEN NEW.shape ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'custom_products' THEN NEW.customizable ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'vvs_simulant_products' THEN NEW.carat_weight ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'vvs_simulant_products' THEN NEW.cut_quality ELSE NULL END,
      CASE WHEN TG_TABLE_NAME = 'vvs_simulant_products' THEN NEW.clarity_grade ELSE NULL END,
      NEW.stripe_price_id,
      TG_TABLE_NAME, 
      NEW.id
    )
    ON CONFLICT (source_table, source_id) 
    DO UPDATE SET
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      price = EXCLUDED.price,
      original_price = EXCLUDED.original_price,
      category = EXCLUDED.category,
      product_type = EXCLUDED.product_type,
      color = EXCLUDED.color,
      material = EXCLUDED.material,
      image_url = EXCLUDED.image_url,
      stripe_product_id = EXCLUDED.stripe_product_id,
      rating = EXCLUDED.rating,
      review_count = EXCLUDED.review_count,
      discount_percentage = EXCLUDED.discount_percentage,
      in_stock = EXCLUDED.in_stock,
      ships_today = EXCLUDED.ships_today,
      featured = EXCLUDED.featured,
      sizes = EXCLUDED.sizes,
      gemstone = EXCLUDED.gemstone,
      diamond_cut = EXCLUDED.diamond_cut,
      chain_type = EXCLUDED.chain_type,
      frame_style = EXCLUDED.frame_style,
      lens_color = EXCLUDED.lens_color,
      style = EXCLUDED.style,
      teeth_count = EXCLUDED.teeth_count,
      shape = EXCLUDED.shape,
      customizable = EXCLUDED.customizable,
      carat_weight = EXCLUDED.carat_weight,
      cut_quality = EXCLUDED.cut_quality,
      clarity_grade = EXCLUDED.clarity_grade,
      stripe_price_id = EXCLUDED.stripe_price_id,
      updated_at = now();
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Add RLS policies to allow service role to delete from product tables
CREATE POLICY "Service role can manage chain products" ON public.chain_products
  FOR ALL USING (true);

CREATE POLICY "Service role can manage bracelet products" ON public.bracelet_products
  FOR ALL USING (true);

CREATE POLICY "Service role can manage earring products" ON public.earring_products
  FOR ALL USING (true);

CREATE POLICY "Service role can manage pendant products" ON public.pendant_products
  FOR ALL USING (true);

CREATE POLICY "Service role can manage watch products" ON public.watch_products
  FOR ALL USING (true);

CREATE POLICY "Service role can manage hip hop ring products" ON public.hip_hop_ring_products
  FOR ALL USING (true);

CREATE POLICY "Service role can manage engagement ring products" ON public.engagement_ring_products
  FOR ALL USING (true);

-- Create similar policies for other product tables if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'grillz_products') THEN
        EXECUTE 'CREATE POLICY "Service role can manage grillz products" ON public.grillz_products FOR ALL USING (true)';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'custom_products') THEN
        EXECUTE 'CREATE POLICY "Service role can manage custom products" ON public.custom_products FOR ALL USING (true)';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'diamond_products') THEN
        EXECUTE 'CREATE POLICY "Service role can manage diamond products" ON public.diamond_products FOR ALL USING (true)';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'glasses_products') THEN
        EXECUTE 'CREATE POLICY "Service role can manage glasses products" ON public.glasses_products FOR ALL USING (true)';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'vvs_simulant_products') THEN
        EXECUTE 'CREATE POLICY "Service role can manage vvs simulant products" ON public.vvs_simulant_products FOR ALL USING (true)';
    END IF;
END $$;
