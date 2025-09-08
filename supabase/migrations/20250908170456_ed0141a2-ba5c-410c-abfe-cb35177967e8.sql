-- Fix RLS policies for contact_requests table
-- Drop existing policies first
DROP POLICY IF EXISTS "anyone_can_create_contact_requests" ON public.contact_requests;
DROP POLICY IF EXISTS "deny_public_read_contact_requests" ON public.contact_requests;
DROP POLICY IF EXISTS "service_role_contact_requests_access" ON public.contact_requests;

-- Create proper RLS policies for contact_requests
CREATE POLICY "allow_anonymous_contact_form_submission"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "service_role_full_access_contact_requests"
ON public.contact_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "deny_public_read_contact_requests"
ON public.contact_requests
FOR SELECT
TO anon, authenticated
USING (false);

-- Fix RLS policies for promo_list table
-- Drop existing policies first
DROP POLICY IF EXISTS "deny_public_access_promo_list" ON public.promo_list;
DROP POLICY IF EXISTS "service_role_promo_list_access" ON public.promo_list;

-- Create proper RLS policies for promo_list
CREATE POLICY "allow_anonymous_newsletter_signup"
ON public.promo_list
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "service_role_full_access_promo_list"
ON public.promo_list
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "deny_public_read_promo_list"
ON public.promo_list
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "deny_public_update_delete_promo_list"
ON public.promo_list
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "deny_public_delete_promo_list"
ON public.promo_list
FOR DELETE
TO anon, authenticated
USING (false);