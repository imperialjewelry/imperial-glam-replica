
-- Remove the unique constraint on stripe_session_id to allow multiple products per checkout session
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_stripe_session_id_key;

-- Add a composite unique constraint instead to prevent duplicate product orders in the same session
-- This allows multiple products per session but prevents the same product being duplicated
ALTER TABLE public.orders ADD CONSTRAINT orders_session_product_unique 
  UNIQUE (stripe_session_id, product_details);
