
-- Create a unified products table for search and cart functionality
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  product_type TEXT NOT NULL,
  color TEXT NOT NULL,
  material TEXT NOT NULL,
  image_url TEXT NOT NULL,
  stripe_product_id TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  ships_today BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  sizes TEXT[] DEFAULT '{}',
  
  -- Category-specific fields (nullable since not all products will have all fields)
  gemstone TEXT,
  diamond_cut TEXT,
  chain_type TEXT,
  frame_style TEXT,
  lens_color TEXT,
  style TEXT,
  teeth_count TEXT,
  shape TEXT,
  customizable BOOLEAN,
  carat_weight TEXT,
  cut_quality TEXT,
  clarity_grade TEXT,
  
  -- Reference to the original table and ID for detailed product info
  source_table TEXT NOT NULL, -- e.g., 'chain_products', 'watch_products', etc.
  source_id UUID NOT NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view products)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT
  USING (true);

-- Create policy for service role to manage products
CREATE POLICY "Service role can manage products" ON public.products
  FOR ALL
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_name ON public.products USING gin(to_tsvector('english', name));
CREATE INDEX idx_products_description ON public.products USING gin(to_tsvector('english', description));
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_featured ON public.products(featured);
CREATE INDEX idx_products_in_stock ON public.products(in_stock);
CREATE INDEX idx_products_source ON public.products(source_table, source_id);

-- Create a function to sync products from category tables
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
      carat_weight, cut_quality, clarity_grade, source_table, source_id
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

-- Add unique constraint for source_table and source_id combination
ALTER TABLE public.products ADD CONSTRAINT unique_source_product UNIQUE (source_table, source_id);

-- Create triggers for all product tables
CREATE TRIGGER sync_chain_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.chain_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_watch_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.watch_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_bracelet_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.bracelet_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_earring_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.earring_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_pendant_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.pendant_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_grillz_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.grillz_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_custom_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.custom_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_diamond_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.diamond_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_glasses_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.glasses_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_hip_hop_ring_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.hip_hop_ring_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_engagement_ring_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.engagement_ring_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

CREATE TRIGGER sync_vvs_simulant_products_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.vvs_simulant_products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_unified_table();

-- Populate the products table with existing data
INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, 'chain_products', id
FROM public.chain_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, 'watch_products', id
FROM public.watch_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, 'bracelet_products', id
FROM public.bracelet_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, 'earring_products', id
FROM public.earring_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, 'pendant_products', id
FROM public.pendant_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, style, teeth_count, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, style, teeth_count, 'grillz_products', id
FROM public.grillz_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, shape, gemstone, customizable, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, shape, gemstone, customizable, 'custom_products', id
FROM public.custom_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, chain_type, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, chain_type, 'diamond_products', id
FROM public.diamond_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, frame_style, lens_color, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, frame_style, lens_color, 'glasses_products', id
FROM public.glasses_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, 'hip_hop_ring_products', id
FROM public.hip_hop_ring_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, gemstone, diamond_cut, 'engagement_ring_products', id
FROM public.engagement_ring_products;

INSERT INTO public.products (
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, carat_weight, cut_quality, clarity_grade, source_table, source_id
)
SELECT 
  name, description, price, original_price, category, product_type, color, material,
  image_url, stripe_product_id, rating, review_count, discount_percentage,
  in_stock, ships_today, featured, sizes, carat_weight, cut_quality, clarity_grade, 'vvs_simulant_products', id
FROM public.vvs_simulant_products;
