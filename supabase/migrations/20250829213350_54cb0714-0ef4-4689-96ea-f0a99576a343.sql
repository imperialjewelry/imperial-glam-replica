
-- Add stripe_customer_id column to orders table to store Stripe customer IDs
ALTER TABLE public.orders 
ADD COLUMN stripe_customer_id TEXT;

-- Add index on stripe_customer_id for better query performance
CREATE INDEX idx_orders_stripe_customer_id ON public.orders(stripe_customer_id);
