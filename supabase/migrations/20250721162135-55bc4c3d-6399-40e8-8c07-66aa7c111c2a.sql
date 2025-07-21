
-- Update the sync function to handle the new stripe_price_id column and fix field access issues
CREATE OR REPLACE FUNCTION sync_product_to_unified_table()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle INSERT and UPDATE
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO public.products (
      name, description, price, original_price, category, product_type, color, material,
      image_url, stripe_product_id, rating, review_count, discount_percentage,
      in_stock, ships_today, featured, sizes, gemstone, diamond_cut, chain_type,
      frame_style, lens_color, style, teeth_count, shape, customizable,
      carat_weight, cut_quality, clarity_grade, stripe_price_id, source_table, source_id
    )
    VALUES (
      NEW.name, NEW.description, NEW.price, NEW.original_price, NEW.category, NEW.product_type,
      NEW.color, NEW.material, NEW.image_url, NEW.stripe_product_id, NEW.rating,
      NEW.review_count, NEW.discount_percentage, NEW.in_stock, NEW.ships_today,
      NEW.featured, NEW.sizes, 
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
      TG_TABLE_NAME, NEW.id
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
  
  -- Handle DELETE
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.products 
    WHERE source_table = TG_TABLE_NAME AND source_id = OLD.id;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
