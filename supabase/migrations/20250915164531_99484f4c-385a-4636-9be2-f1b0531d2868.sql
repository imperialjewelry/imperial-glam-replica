-- Create checkout_sessions table for storing cart data during payment processing
CREATE TABLE public.checkout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  cart_items JSONB NOT NULL,
  customer_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Service role can manage checkout sessions"
ON public.checkout_sessions
FOR ALL
USING (true);

-- Create index for faster lookups by session_id
CREATE INDEX idx_checkout_sessions_session_id ON public.checkout_sessions(session_id);