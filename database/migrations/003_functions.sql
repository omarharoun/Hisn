-- Function to handle user creation from Clerk webhook
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (clerk_id, email, first_name, last_name, username, image_url)
  VALUES (
    NEW.clerk_id,
    NEW.email,
    NEW.first_name,
    NEW.last_name,
    NEW.username,
    NEW.image_url
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate user total points
CREATE OR REPLACE FUNCTION calculate_user_points(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_points INTEGER := 0;
BEGIN
  -- Points from completed roadmaps (100 points each)
  SELECT COALESCE(SUM(100), 0) INTO total_points
  FROM user_progress
  WHERE user_id = user_uuid 
  AND roadmap_id IS NOT NULL 
  AND status = 'completed';
  
  -- Points from completed steps (10 points each)
  total_points := total_points + COALESCE((
    SELECT SUM(10)
    FROM user_progress
    WHERE user_id = user_uuid 
    AND step_id IS NOT NULL 
    AND status = 'completed'
  ), 0);
  
  -- Points from completed labs (25 points each)
  total_points := total_points + COALESCE((
    SELECT SUM(25)
    FROM user_progress
    WHERE user_id = user_uuid 
    AND lab_id IS NOT NULL 
    AND status = 'completed'
  ), 0);
  
  -- Points from answered questions (5 points each)
  total_points := total_points + COALESCE((
    SELECT SUM(5)
    FROM user_progress
    WHERE user_id = user_uuid 
    AND question_id IS NOT NULL 
    AND status = 'completed'
  ), 0);
  
  -- Points from badges
  total_points := total_points + COALESCE((
    SELECT SUM(b.points)
    FROM user_badges ub
    JOIN badges b ON b.id = ub.badge_id
    WHERE ub.user_id = user_uuid
  ), 0);
  
  RETURN total_points;
END;
$$ LANGUAGE plpgsql;

-- Function to update user points
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users 
  SET total_points = calculate_user_points(NEW.user_id)
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate learning streak
CREATE OR REPLACE FUNCTION calculate_learning_streak(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  streak_days INTEGER := 0;
  current_date DATE := CURRENT_DATE;
  check_date DATE;
BEGIN
  -- Start from yesterday and count backwards
  check_date := current_date - INTERVAL '1 day';
  
  LOOP
    -- Check if user had any activity on this date
    IF EXISTS (
      SELECT 1 FROM user_progress 
      WHERE user_id = user_uuid 
      AND DATE(last_accessed_at) = check_date
    ) THEN
      streak_days := streak_days + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      EXIT; -- Break the loop when no activity found
    END IF;
  END LOOP;
  
  RETURN streak_days;
END;
$$ LANGUAGE plpgsql;

-- Function to update learning streak
CREATE OR REPLACE FUNCTION update_learning_streak()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users 
  SET 
    streak_days = calculate_learning_streak(NEW.user_id),
    last_activity_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  badge_record RECORD;
BEGIN
  -- First Roadmap Completion Badge
  IF NOT EXISTS (
    SELECT 1 FROM user_badges ub
    JOIN badges b ON b.id = ub.badge_id
    WHERE ub.user_id = NEW.user_id AND b.name = 'First Steps'
  ) AND EXISTS (
    SELECT 1 FROM user_progress
    WHERE user_id = NEW.user_id AND roadmap_id IS NOT NULL AND status = 'completed'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    SELECT NEW.user_id, id FROM badges WHERE name = 'First Steps';
  END IF;
  
  -- Lab Master Badge (10 labs completed)
  IF NOT EXISTS (
    SELECT 1 FROM user_badges ub
    JOIN badges b ON b.id = ub.badge_id
    WHERE ub.user_id = NEW.user_id AND b.name = 'Lab Master'
  ) AND (
    SELECT COUNT(*) FROM user_progress
    WHERE user_id = NEW.user_id AND lab_id IS NOT NULL AND status = 'completed'
  ) >= 10 THEN
    INSERT INTO user_badges (user_id, badge_id)
    SELECT NEW.user_id, id FROM badges WHERE name = 'Lab Master';
  END IF;
  
  -- Streak badges
  DECLARE
    current_streak INTEGER;
  BEGIN
    current_streak := calculate_learning_streak(NEW.user_id);
    
    -- 7-day streak
    IF current_streak >= 7 AND NOT EXISTS (
      SELECT 1 FROM user_badges ub
      JOIN badges b ON b.id = ub.badge_id
      WHERE ub.user_id = NEW.user_id AND b.name = 'Week Warrior'
    ) THEN
      INSERT INTO user_badges (user_id, badge_id)
      SELECT NEW.user_id, id FROM badges WHERE name = 'Week Warrior';
    END IF;
    
    -- 30-day streak
    IF current_streak >= 30 AND NOT EXISTS (
      SELECT 1 FROM user_badges ub
      JOIN badges b ON b.id = ub.badge_id
      WHERE ub.user_id = NEW.user_id AND b.name = 'Month Master'
    ) THEN
      INSERT INTO user_badges (user_id, badge_id)
      SELECT NEW.user_id, id FROM badges WHERE name = 'Month Master';
    END IF;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to get roadmap completion percentage
CREATE OR REPLACE FUNCTION get_roadmap_completion(roadmap_uuid UUID, user_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
  total_steps INTEGER;
  completed_steps INTEGER;
BEGIN
  -- Get total number of steps in roadmap
  SELECT COUNT(*) INTO total_steps
  FROM roadmap_steps
  WHERE roadmap_id = roadmap_uuid;
  
  -- Get completed steps for user
  SELECT COUNT(*) INTO completed_steps
  FROM user_progress up
  JOIN roadmap_steps rs ON rs.id = up.step_id
  WHERE rs.roadmap_id = roadmap_uuid 
  AND up.user_id = user_uuid 
  AND up.status = 'completed';
  
  -- Return percentage
  IF total_steps = 0 THEN
    RETURN 0;
  ELSE
    RETURN (completed_steps::DECIMAL / total_steps::DECIMAL) * 100;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get user learning statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_points', COALESCE(u.total_points, 0),
    'streak_days', COALESCE(u.streak_days, 0),
    'completed_roadmaps', COALESCE(roadmap_count.count, 0),
    'completed_steps', COALESCE(step_count.count, 0),
    'completed_labs', COALESCE(lab_count.count, 0),
    'answered_questions', COALESCE(question_count.count, 0),
    'badges_earned', COALESCE(badge_count.count, 0),
    'total_time_spent', COALESCE(time_spent.total, 0)
  ) INTO stats
  FROM users u
  LEFT JOIN (
    SELECT COUNT(*) as count
    FROM user_progress
    WHERE user_id = user_uuid AND roadmap_id IS NOT NULL AND status = 'completed'
  ) roadmap_count ON true
  LEFT JOIN (
    SELECT COUNT(*) as count
    FROM user_progress
    WHERE user_id = user_uuid AND step_id IS NOT NULL AND status = 'completed'
  ) step_count ON true
  LEFT JOIN (
    SELECT COUNT(*) as count
    FROM user_progress
    WHERE user_id = user_uuid AND lab_id IS NOT NULL AND status = 'completed'
  ) lab_count ON true
  LEFT JOIN (
    SELECT COUNT(*) as count
    FROM user_progress
    WHERE user_id = user_uuid AND question_id IS NOT NULL AND status = 'completed'
  ) question_count ON true
  LEFT JOIN (
    SELECT COUNT(*) as count
    FROM user_badges
    WHERE user_id = user_uuid
  ) badge_count ON true
  LEFT JOIN (
    SELECT SUM(time_spent) as total
    FROM user_progress
    WHERE user_id = user_uuid
  ) time_spent ON true
  WHERE u.id = user_uuid;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired lab sessions
CREATE OR REPLACE FUNCTION cleanup_expired_lab_sessions()
RETURNS INTEGER AS $$
DECLARE
  cleanup_count INTEGER;
BEGIN
  UPDATE lab_sessions 
  SET status = 'expired', stopped_at = NOW()
  WHERE expires_at < NOW() AND status IN ('starting', 'running');
  
  GET DIAGNOSTICS cleanup_count = ROW_COUNT;
  RETURN cleanup_count;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_user_points
  AFTER INSERT OR UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

CREATE TRIGGER trigger_update_user_points_badges
  AFTER INSERT ON user_badges
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

CREATE TRIGGER trigger_update_learning_streak
  AFTER INSERT OR UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_learning_streak();

CREATE TRIGGER trigger_check_and_award_badges
  AFTER INSERT OR UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION check_and_award_badges();