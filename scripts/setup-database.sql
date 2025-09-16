-- SkillPath Platform Database Setup Script
-- Run this script in your Supabase SQL editor to set up the complete database

-- 1. Initial Schema
\i database/migrations/001_initial_schema.sql

-- 2. Row Level Security Policies
\i database/migrations/002_rls_policies.sql

-- 3. Database Functions
\i database/migrations/003_functions.sql

-- 4. Seed Data - Badges
\i database/seed/001_badges.sql

-- 5. Seed Data - AI Prompts
\i database/seed/002_ai_prompts.sql

-- 6. Seed Data - DevOps Roadmap
\i database/seed/003_devops_roadmap.sql

-- Verify setup
SELECT 'Database setup completed successfully!' as status;