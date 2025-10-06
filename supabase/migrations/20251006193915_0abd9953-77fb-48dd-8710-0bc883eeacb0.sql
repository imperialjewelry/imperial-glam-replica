-- Create affiliate_applications table
CREATE TABLE public.affiliate_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_handle TEXT NOT NULL,
  tiktok_handle TEXT,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.affiliate_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application
CREATE POLICY "Anyone can submit affiliate application"
ON public.affiliate_applications
FOR INSERT
WITH CHECK (true);

-- Policy: Only service role can view applications
CREATE POLICY "Service role can view all affiliate applications"
ON public.affiliate_applications
FOR SELECT
USING (true);

-- Policy: Only service role can manage applications
CREATE POLICY "Service role can manage affiliate applications"
ON public.affiliate_applications
FOR ALL
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_affiliate_applications_updated_at
BEFORE UPDATE ON public.affiliate_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();