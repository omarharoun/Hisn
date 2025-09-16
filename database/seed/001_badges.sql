-- Insert initial badges
INSERT INTO badges (name, description, icon, criteria, points, rarity) VALUES
  ('First Steps', 'Complete your first roadmap', 'trophy', 'Complete any roadmap', 100, 'common'),
  ('Quick Learner', 'Complete a roadmap in under 10 hours', 'zap', 'Complete a roadmap with estimated time under 10 hours', 150, 'uncommon'),
  ('Lab Master', 'Complete 10 hands-on labs', 'code', 'Complete 10 different labs', 250, 'uncommon'),
  ('Code Warrior', 'Complete 5 coding labs with perfect score', 'sword', 'Complete 5 coding labs with 100% score', 300, 'rare'),
  ('Network Ninja', 'Master IP networking fundamentals', 'network', 'Complete the IP Networking roadmap', 200, 'uncommon'),
  ('Week Warrior', 'Maintain a 7-day learning streak', 'calendar', 'Learn for 7 consecutive days', 100, 'common'),
  ('Month Master', 'Maintain a 30-day learning streak', 'calendar-check', 'Learn for 30 consecutive days', 500, 'rare'),
  ('Question Crusher', 'Answer 100 interview questions correctly', 'help-circle', 'Answer 100 questions with correct responses', 200, 'uncommon'),
  ('Perfect Score', 'Get 100% on any lab or quiz', 'star', 'Achieve a perfect score on any assessment', 50, 'common'),
  ('Early Bird', 'One of the first 100 users', 'sunrise', 'Join the platform as one of the first 100 users', 1000, 'legendary'),
  ('Community Helper', 'Help others by contributing content', 'users', 'Create a public roadmap or lab', 300, 'rare'),
  ('Speed Demon', 'Complete a lab in record time', 'timer', 'Complete a lab 50% faster than estimated time', 150, 'uncommon'),
  ('Knowledge Seeker', 'Complete roadmaps in 3 different categories', 'book-open', 'Complete roadmaps in software development, networking, and another category', 400, 'rare'),
  ('Perfectionist', 'Maintain 90%+ average score across all assessments', 'target', 'Maintain an average score of 90% or higher', 350, 'rare'),
  ('Mentor', 'Receive 10 helpful ratings on your comments', 'graduation-cap', 'Receive 10+ helpful votes on community contributions', 250, 'uncommon'),
  ('Explorer', 'Try labs in 5 different technologies', 'compass', 'Complete labs covering 5 different technology stacks', 200, 'uncommon'),
  ('Dedicated', 'Spend 100+ hours learning', 'clock', 'Accumulate 100+ hours of learning time', 500, 'rare'),
  ('Trendsetter', 'Complete a trending skill roadmap', 'trending-up', 'Complete a roadmap for a skill in the top 10 trending list', 150, 'uncommon'),
  ('Problem Solver', 'Successfully debug 25 coding challenges', 'bug', 'Fix bugs or solve coding problems in 25 different labs', 300, 'rare'),
  ('Legend', 'Achieve top 10 on global leaderboard', 'crown', 'Reach top 10 position on the global points leaderboard', 1500, 'legendary')
ON CONFLICT (name) DO NOTHING;