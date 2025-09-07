-- Fix RLS policies for contact_requests and promo_list tables to prevent unauthorized access

-- Fix contact_requests table RLS policies
-- The table currently allows anyone to create contact requests but doesn't restrict read access
-- We need to ensure only service role can read contact requests

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Service role can manage contact requests" ON public.contact_requests;

-- Recreate secure policies for contact_requests
CREATE POLICY "service_role_contact_requests_access" ON public.contact_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anyone to create contact requests (normal functionality)
CREATE POLICY "anyone_can_create_contact_requests" ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Deny read access to prevent harvesting of contact information
CREATE POLICY "deny_public_read_contact_requests" ON public.contact_requests
FOR SELECT
TO anon, authenticated
USING (false);

-- Fix promo_list table RLS policies
-- Currently allows service role management but may allow public read access

-- Drop existing policies
DROP POLICY IF EXISTS "Service role can manage promo list" ON public.promo_list;

-- Recreate secure policies for promo_list
CREATE POLICY "service_role_promo_list_access" ON public.promo_list
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Deny all public access to promo list to prevent email harvesting
CREATE POLICY "deny_public_access_promo_list" ON public.promo_list
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);