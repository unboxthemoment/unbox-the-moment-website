-- Create waitlist table for Unbox The Moment
-- This table stores email signups for pre-launch waitlist

CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Email address (unique to prevent duplicates)
  email TEXT UNIQUE NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified_at TIMESTAMP WITH TIME ZONE, -- When launch notification email was sent
  converted_at TIMESTAMP WITH TIME ZONE -- When they made their first purchase
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_notified_at ON public.waitlist(notified_at);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything (for API endpoints)
CREATE POLICY "Service role has full access to waitlist"
  ON public.waitlist
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Authenticated users can view waitlist (for admin dashboard)
CREATE POLICY "Authenticated users can view waitlist"
  ON public.waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;
