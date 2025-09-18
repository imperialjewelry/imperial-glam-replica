-- Add shipping_address column to checkout_sessions table
ALTER TABLE public.checkout_sessions 
ADD COLUMN shipping_address JSONB;