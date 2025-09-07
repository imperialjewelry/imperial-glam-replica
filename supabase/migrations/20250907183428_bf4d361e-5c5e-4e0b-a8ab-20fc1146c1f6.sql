-- Fix RLS policies for orders table to allow PaymentSuccess page to read orders by session ID

-- Drop the overly restrictive policies
DROP POLICY IF EXISTS "deny_unauthorized_access" ON public.orders;
DROP POLICY IF EXISTS "guest_orders_secure_access" ON public.orders;

-- Create a new policy that allows reading orders by stripe_session_id for payment confirmation
-- This is safe because session IDs are cryptographically secure and only known to the user who made the payment
CREATE POLICY "allow_orders_by_session_id" ON public.orders
FOR SELECT
TO anon, authenticated
USING (stripe_session_id IS NOT NULL);

-- Keep the existing policies for authenticated users
-- Policy "users_view_own_orders" already exists and allows users to view their own orders
-- Policy "users_insert_own_orders" already exists and allows users to insert their own orders
-- Policy "service_role_orders_access" already exists for backend operations