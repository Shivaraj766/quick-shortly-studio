-- Run this in your Supabase SQL Editor

-- 1. Create the project_status ENUM
CREATE TYPE project_status AS ENUM ('PENDING_REVIEW', 'QUOTATION_SENT', 'IN_NEGOTIATION', 'APPROVED', 'REJECTED');

-- 2. Create the project_requests table
CREATE TABLE project_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id VARCHAR(20) UNIQUE NOT NULL, -- e.g. QS-2026-000124
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Nullable for guest bookings
    status project_status DEFAULT 'PENDING_REVIEW',
    
    -- Client Details
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT,
    social_links TEXT,
    
    -- Project Overview
    service TEXT NOT NULL,
    
    -- Creative Brief
    title TEXT,
    description TEXT,
    goal TEXT,
    audience TEXT,
    emotion TEXT,
    
    -- Attributes (Arrays)
    style TEXT[],
    features TEXT[],
    
    -- Logistics
    budget_range TEXT,
    deadline TEXT,
    communication_method TEXT,
    communication_time TEXT,
    
    -- Attachments (JSON array of URLs)
    "references" JSONB DEFAULT '[]'::jsonb,
    attachments JSONB DEFAULT '[]'::jsonb,
    
    -- Flexible JSON for service-specific questions
    dynamic_service_answers JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create a Sequence for generating QS-2026-XXXXXX IDs
CREATE SEQUENCE project_id_seq START 1;

-- 4. Create the Supabase Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('project-attachments', 'project-attachments', true);

-- Enable RLS and setup policies
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (since users might not be logged in to book)
CREATE POLICY "Allow public insert on project_requests" 
ON project_requests FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated users (Admins) to select
CREATE POLICY "Allow authenticated read on project_requests" 
ON project_requests FOR SELECT 
TO authenticated 
USING (true);

-- Storage bucket policies
CREATE POLICY "Allow public upload to project-attachments"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'project-attachments');

CREATE POLICY "Allow public read from project-attachments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-attachments');
