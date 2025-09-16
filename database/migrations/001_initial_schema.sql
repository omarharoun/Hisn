-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE roadmap_category AS ENUM ('software-development', 'ip-networking', 'other');
CREATE TYPE step_type AS ENUM ('reading', 'video', 'lab', 'quiz', 'project');
CREATE TYPE lab_type AS ENUM ('coding', 'networking', 'simulation');
CREATE TYPE lab_environment_type AS ENUM ('docker', 'kubernetes', 'browser');
CREATE TYPE question_type AS ENUM ('multiple-choice', 'coding', 'system-design', 'behavioral');
CREATE TYPE question_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE progress_status AS ENUM ('not-started', 'in-progress', 'completed', 'skipped');
CREATE TYPE resource_type AS ENUM ('link', 'document', 'video', 'book');
CREATE TYPE badge_rarity AS ENUM ('common', 'uncommon', 'rare', 'epic', 'legendary');
CREATE TYPE leaderboard_type AS ENUM ('global', 'roadmap', 'monthly', 'weekly');

-- Users table (extends Clerk user data)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  image_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  github_username TEXT,
  linkedin_url TEXT,
  total_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roadmaps table
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category roadmap_category NOT NULL,
  difficulty difficulty_level NOT NULL,
  estimated_hours INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  image_url TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roadmap steps table
CREATE TABLE roadmap_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  step_order INTEGER NOT NULL,
  type step_type NOT NULL,
  estimated_minutes INTEGER NOT NULL DEFAULT 0,
  prerequisites UUID[] DEFAULT '{}', -- Array of step IDs
  is_optional BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(roadmap_id, step_order)
);

-- Resources table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_id UUID REFERENCES roadmap_steps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type resource_type NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Labs table
CREATE TABLE labs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_id UUID REFERENCES roadmap_steps(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type lab_type NOT NULL,
  difficulty difficulty_level NOT NULL,
  instructions TEXT NOT NULL,
  initial_code TEXT,
  solution_code TEXT,
  validation_script TEXT,
  hints TEXT[] DEFAULT '{}',
  estimated_minutes INTEGER NOT NULL DEFAULT 30,
  environment JSONB NOT NULL DEFAULT '{}', -- Lab environment configuration
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table (for interview prep)
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  subcategory TEXT,
  difficulty question_difficulty NOT NULL,
  type question_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  options TEXT[], -- For multiple choice questions
  correct_answer TEXT,
  explanation TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  companies TEXT[] DEFAULT '{}',
  frequency INTEGER DEFAULT 0, -- How often this question appears
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  step_id UUID REFERENCES roadmap_steps(id) ON DELETE CASCADE,
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  status progress_status NOT NULL DEFAULT 'not-started',
  score INTEGER, -- Percentage score for quizzes/labs
  time_spent INTEGER DEFAULT 0, -- Time in minutes
  attempts INTEGER DEFAULT 0,
  notes TEXT,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT progress_entity_check CHECK (
    (roadmap_id IS NOT NULL AND step_id IS NULL AND lab_id IS NULL AND question_id IS NULL) OR
    (roadmap_id IS NULL AND step_id IS NOT NULL AND lab_id IS NULL AND question_id IS NULL) OR
    (roadmap_id IS NULL AND step_id IS NULL AND lab_id IS NOT NULL AND question_id IS NULL) OR
    (roadmap_id IS NULL AND step_id IS NULL AND lab_id IS NULL AND question_id IS NOT NULL)
  )
);

-- AI prompts table
CREATE TABLE ai_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  template TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  description TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trend analysis table
CREATE TABLE trend_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill TEXT NOT NULL,
  category TEXT NOT NULL,
  trend_score DECIMAL(3,2) NOT NULL, -- 0.00 to 1.00
  demand_growth DECIMAL(5,2) NOT NULL, -- Percentage growth
  salary_impact DECIMAL(10,2), -- Average salary impact in USD
  job_postings INTEGER DEFAULT 0,
  sources TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- Icon name or URL
  criteria TEXT NOT NULL, -- Description of how to earn this badge
  points INTEGER DEFAULT 0,
  rarity badge_rarity DEFAULT 'common',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges table
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Leaderboards table
CREATE TABLE leaderboards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type leaderboard_type NOT NULL,
  criteria JSONB NOT NULL DEFAULT '{}', -- Leaderboard calculation criteria
  entries JSONB NOT NULL DEFAULT '[]', -- Cached leaderboard entries
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lab sessions table (for tracking active lab instances)
CREATE TABLE lab_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
  container_id TEXT, -- Docker container ID
  pod_name TEXT, -- Kubernetes pod name
  status TEXT NOT NULL DEFAULT 'starting', -- starting, running, stopped, error
  environment JSONB NOT NULL DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stopped_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '2 hours'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table (for community features)
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  step_id UUID REFERENCES roadmap_steps(id) ON DELETE CASCADE,
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For nested comments
  content TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT comment_entity_check CHECK (
    (roadmap_id IS NOT NULL AND step_id IS NULL AND lab_id IS NULL) OR
    (roadmap_id IS NULL AND step_id IS NOT NULL AND lab_id IS NULL) OR
    (roadmap_id IS NULL AND step_id IS NULL AND lab_id IS NOT NULL)
  )
);

-- Ratings table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, roadmap_id),
  UNIQUE(user_id, lab_id),
  CONSTRAINT rating_entity_check CHECK (
    (roadmap_id IS NOT NULL AND lab_id IS NULL) OR
    (roadmap_id IS NULL AND lab_id IS NOT NULL)
  )
);

-- Create indexes for better performance
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

CREATE INDEX idx_roadmaps_category ON roadmaps(category);
CREATE INDEX idx_roadmaps_difficulty ON roadmaps(difficulty);
CREATE INDEX idx_roadmaps_created_by ON roadmaps(created_by);
CREATE INDEX idx_roadmaps_is_public ON roadmaps(is_public);
CREATE INDEX idx_roadmaps_is_featured ON roadmaps(is_featured);

CREATE INDEX idx_roadmap_steps_roadmap_id ON roadmap_steps(roadmap_id);
CREATE INDEX idx_roadmap_steps_order ON roadmap_steps(roadmap_id, step_order);

CREATE INDEX idx_resources_step_id ON resources(step_id);

CREATE INDEX idx_labs_step_id ON labs(step_id);
CREATE INDEX idx_labs_type ON labs(type);
CREATE INDEX idx_labs_difficulty ON labs(difficulty);
CREATE INDEX idx_labs_created_by ON labs(created_by);
CREATE INDEX idx_labs_is_public ON labs(is_public);

CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_type ON questions(type);
CREATE INDEX idx_questions_created_by ON questions(created_by);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_roadmap_id ON user_progress(roadmap_id);
CREATE INDEX idx_user_progress_step_id ON user_progress(step_id);
CREATE INDEX idx_user_progress_lab_id ON user_progress(lab_id);
CREATE INDEX idx_user_progress_question_id ON user_progress(question_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);

CREATE INDEX idx_ai_prompts_category ON ai_prompts(category);
CREATE INDEX idx_ai_prompts_created_by ON ai_prompts(created_by);

CREATE INDEX idx_trend_analysis_skill ON trend_analysis(skill);
CREATE INDEX idx_trend_analysis_category ON trend_analysis(category);
CREATE INDEX idx_trend_analysis_trend_score ON trend_analysis(trend_score DESC);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);

CREATE INDEX idx_leaderboards_type ON leaderboards(type);

CREATE INDEX idx_lab_sessions_user_id ON lab_sessions(user_id);
CREATE INDEX idx_lab_sessions_lab_id ON lab_sessions(lab_id);
CREATE INDEX idx_lab_sessions_status ON lab_sessions(status);
CREATE INDEX idx_lab_sessions_expires_at ON lab_sessions(expires_at);

CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_roadmap_id ON comments(roadmap_id);
CREATE INDEX idx_comments_step_id ON comments(step_id);
CREATE INDEX idx_comments_lab_id ON comments(lab_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_roadmap_id ON ratings(roadmap_id);
CREATE INDEX idx_ratings_lab_id ON ratings(lab_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roadmaps_updated_at BEFORE UPDATE ON roadmaps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roadmap_steps_updated_at BEFORE UPDATE ON roadmap_steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_labs_updated_at BEFORE UPDATE ON labs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_prompts_updated_at BEFORE UPDATE ON ai_prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ratings_updated_at BEFORE UPDATE ON ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();