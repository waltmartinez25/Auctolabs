
-- Create form_submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous) to insert
CREATE POLICY "Anyone can submit contact form"
ON public.form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admins can read (using user_roles pattern)
-- For now, allow authenticated users to read (you can restrict further with roles later)
CREATE POLICY "Authenticated users can read submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (true);
