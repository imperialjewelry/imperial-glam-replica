
-- Create a table for email signups from the footer
CREATE TABLE public.promo_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'footer_signup',
  active BOOLEAN NOT NULL DEFAULT true
);

-- Add Row Level Security (RLS) to ensure only service roles can access
ALTER TABLE public.promo_list ENABLE ROW LEVEL SECURITY;

-- Create policy that only allows service role to view and manage promo list
CREATE POLICY "Service role can manage promo list" 
  ON public.promo_list 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Create an index on email for better performance
CREATE INDEX idx_promo_list_email ON public.promo_list(email);
CREATE INDEX idx_promo_list_subscribed_at ON public.promo_list(subscribed_at DESC);
