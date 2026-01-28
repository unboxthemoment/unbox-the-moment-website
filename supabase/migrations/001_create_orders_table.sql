-- Create orders table for Unbox The Moment
-- This table stores all orders including guest orders and preferences

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Stripe identifiers
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_payment_intent_id TEXT,
  
  -- User reference (nullable for guest orders)
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Customer info
  email TEXT NOT NULL,
  
  -- Product details
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  tier TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  
  -- Purchase type
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('one-time', 'subscription')),
  
  -- Preferences stored as JSONB
  -- Structure: { "vegan": boolean, "allergies": string, "otherNotes": string }
  preferences JSONB DEFAULT '{}'::jsonb,
  
  -- Order status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'shipped', 'delivered', 'cancelled')),
  
  -- Shipping info (populated from Stripe)
  shipping_address JSONB,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_customer_id ON public.orders(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_category ON public.orders(category);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  USING (
    auth.uid() = user_id 
    OR email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  );

-- Policy: Service role can do everything (for webhooks)
CREATE POLICY "Service role has full access"
  ON public.orders
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
