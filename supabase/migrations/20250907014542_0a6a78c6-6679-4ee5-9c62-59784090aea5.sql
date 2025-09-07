-- Create contact_requests table
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for contact requests
CREATE POLICY "Anyone can create contact requests"
ON public.contact_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can manage contact requests"
ON public.contact_requests
FOR ALL
USING (auth.role() = 'service_role');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_requests_updated_at
  BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();