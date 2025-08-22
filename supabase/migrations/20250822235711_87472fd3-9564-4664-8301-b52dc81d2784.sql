
-- Update the sync_product_to_unified_table function to include search_path for security
CREATE OR REPLACE FUNCTION public.sync_product_to_unified_table()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.products 
    WHERE source_table = TG_TABLE_NAME AND source_id = OLD.id;
    RETURN OLD;
  END IF;

  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO public.products (
      name, description, price, original_price, category, product_type, color, material,
      image_url, stripe_product_id, rating, review_count, discount_percentage,
      in_stock, ships_today, featured, sizes,
      stripe_price_id, source_table, source_id
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
      stripe_price_id = EXCLUDED.stripe_price_id,
      updated_at = now();

    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$function$
