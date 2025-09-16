-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE trend_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user ID from Clerk
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM users 
    WHERE clerk_id = auth.jwt() ->> 'sub'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (id = get_current_user_id());

CREATE POLICY "Users can view public profiles" ON users
  FOR SELECT USING (true); -- All profiles are viewable for now

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (id = get_current_user_id());

-- Roadmaps policies
CREATE POLICY "Anyone can view public roadmaps" ON roadmaps
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own roadmaps" ON roadmaps
  FOR SELECT USING (created_by = get_current_user_id());

CREATE POLICY "Authenticated users can create roadmaps" ON roadmaps
  FOR INSERT WITH CHECK (created_by = get_current_user_id());

CREATE POLICY "Users can update their own roadmaps" ON roadmaps
  FOR UPDATE USING (created_by = get_current_user_id());

CREATE POLICY "Users can delete their own roadmaps" ON roadmaps
  FOR DELETE USING (created_by = get_current_user_id());

-- Roadmap steps policies
CREATE POLICY "Anyone can view steps of public roadmaps" ON roadmap_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM roadmaps 
      WHERE roadmaps.id = roadmap_steps.roadmap_id 
      AND roadmaps.is_public = true
    )
  );

CREATE POLICY "Users can view steps of their own roadmaps" ON roadmap_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM roadmaps 
      WHERE roadmaps.id = roadmap_steps.roadmap_id 
      AND roadmaps.created_by = get_current_user_id()
    )
  );

CREATE POLICY "Users can manage steps of their own roadmaps" ON roadmap_steps
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM roadmaps 
      WHERE roadmaps.id = roadmap_steps.roadmap_id 
      AND roadmaps.created_by = get_current_user_id()
    )
  );

-- Resources policies
CREATE POLICY "Anyone can view resources of accessible steps" ON resources
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM roadmap_steps rs
      JOIN roadmaps r ON r.id = rs.roadmap_id
      WHERE rs.id = resources.step_id 
      AND (r.is_public = true OR r.created_by = get_current_user_id())
    )
  );

CREATE POLICY "Users can manage resources of their own roadmap steps" ON resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM roadmap_steps rs
      JOIN roadmaps r ON r.id = rs.roadmap_id
      WHERE rs.id = resources.step_id 
      AND r.created_by = get_current_user_id()
    )
  );

-- Labs policies
CREATE POLICY "Anyone can view public labs" ON labs
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own labs" ON labs
  FOR SELECT USING (created_by = get_current_user_id());

CREATE POLICY "Authenticated users can create labs" ON labs
  FOR INSERT WITH CHECK (created_by = get_current_user_id());

CREATE POLICY "Users can update their own labs" ON labs
  FOR UPDATE USING (created_by = get_current_user_id());

CREATE POLICY "Users can delete their own labs" ON labs
  FOR DELETE USING (created_by = get_current_user_id());

-- Questions policies
CREATE POLICY "Anyone can view questions" ON questions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create questions" ON questions
  FOR INSERT WITH CHECK (created_by = get_current_user_id());

CREATE POLICY "Users can update their own questions" ON questions
  FOR UPDATE USING (created_by = get_current_user_id());

CREATE POLICY "Users can delete their own questions" ON questions
  FOR DELETE USING (created_by = get_current_user_id());

-- User progress policies
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (user_id = get_current_user_id());

CREATE POLICY "Users can manage their own progress" ON user_progress
  FOR ALL USING (user_id = get_current_user_id());

-- AI prompts policies
CREATE POLICY "Anyone can view AI prompts" ON ai_prompts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create AI prompts" ON ai_prompts
  FOR INSERT WITH CHECK (created_by = get_current_user_id());

CREATE POLICY "Users can update their own AI prompts" ON ai_prompts
  FOR UPDATE USING (created_by = get_current_user_id());

CREATE POLICY "Users can delete their own AI prompts" ON ai_prompts
  FOR DELETE USING (created_by = get_current_user_id());

-- Trend analysis policies
CREATE POLICY "Anyone can view trend analysis" ON trend_analysis
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage trend analysis" ON trend_analysis
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = get_current_user_id() 
      AND email IN ('admin@skillpath.com') -- Add admin emails here
    )
  );

-- Badges policies
CREATE POLICY "Anyone can view badges" ON badges
  FOR SELECT USING (true);

-- User badges policies
CREATE POLICY "Users can view their own badges" ON user_badges
  FOR SELECT USING (user_id = get_current_user_id());

CREATE POLICY "Anyone can view user badges" ON user_badges
  FOR SELECT USING (true); -- For leaderboards and profiles

-- Leaderboards policies
CREATE POLICY "Anyone can view leaderboards" ON leaderboards
  FOR SELECT USING (true);

-- Lab sessions policies
CREATE POLICY "Users can view their own lab sessions" ON lab_sessions
  FOR SELECT USING (user_id = get_current_user_id());

CREATE POLICY "Users can manage their own lab sessions" ON lab_sessions
  FOR ALL USING (user_id = get_current_user_id());

-- Comments policies
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (user_id = get_current_user_id());

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (user_id = get_current_user_id());

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (user_id = get_current_user_id());

-- Ratings policies
CREATE POLICY "Anyone can view ratings" ON ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own ratings" ON ratings
  FOR ALL USING (user_id = get_current_user_id());