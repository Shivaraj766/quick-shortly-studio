-- 1. Create the contact_messages table
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    inquiry_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    attachment TEXT,
    contact_method TEXT,
    status TEXT DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and setup policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public insert on contact_messages" 
ON contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated users (Admins) to select
CREATE POLICY "Allow authenticated read on contact_messages" 
ON contact_messages FOR SELECT 
TO authenticated 
USING (true);
