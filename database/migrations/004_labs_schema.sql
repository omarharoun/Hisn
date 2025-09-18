-- Labs table
CREATE TABLE IF NOT EXISTS labs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- 'coding', 'networking', 'simulation'
  difficulty VARCHAR(20) NOT NULL, -- 'beginner', 'intermediate', 'advanced'
  estimated_minutes INT NOT NULL DEFAULT 60,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  environment JSONB NOT NULL DEFAULT '{}', -- Docker config, ports, resources
  instructions TEXT,
  initial_code TEXT,
  solution_code TEXT,
  hints TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lab tasks
CREATE TABLE IF NOT EXISTS lab_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  validation_type VARCHAR(20), -- 'command', 'file', 'output'
  validation_data JSONB DEFAULT '{}',
  points INT DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User lab sessions
CREATE TABLE IF NOT EXISTS lab_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'abandoned'
  container_id VARCHAR(255), -- Docker container ID if real Docker is used
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  environment_data JSONB DEFAULT '{}', -- Runtime environment details
  UNIQUE(user_id, lab_id, status) -- Only one active session per user per lab
);

-- User lab progress
CREATE TABLE IF NOT EXISTS lab_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES lab_sessions(id) ON DELETE CASCADE,
  task_id UUID REFERENCES lab_tasks(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  attempts INT DEFAULT 0,
  last_attempt_data JSONB DEFAULT '{}',
  UNIQUE(session_id, task_id)
);

-- Lab command history (optional, for analytics)
CREATE TABLE IF NOT EXISTS lab_command_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES lab_sessions(id) ON DELETE CASCADE,
  command TEXT NOT NULL,
  output TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lab code saves
CREATE TABLE IF NOT EXISTS lab_code_saves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES lab_sessions(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language VARCHAR(50),
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_labs_type ON labs(type);
CREATE INDEX idx_labs_difficulty ON labs(difficulty);
CREATE INDEX idx_labs_is_public ON labs(is_public);
CREATE INDEX idx_lab_sessions_user_id ON lab_sessions(user_id);
CREATE INDEX idx_lab_sessions_lab_id ON lab_sessions(lab_id);
CREATE INDEX idx_lab_sessions_status ON lab_sessions(status);
CREATE INDEX idx_lab_progress_session_id ON lab_progress(session_id);

-- RLS Policies
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_command_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_code_saves ENABLE ROW LEVEL SECURITY;

-- Public labs are viewable by all
CREATE POLICY "Public labs are viewable by all" ON labs
  FOR SELECT USING (is_public = true);

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON lab_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own progress
CREATE POLICY "Users can manage own progress" ON lab_progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM lab_sessions
      WHERE lab_sessions.id = lab_progress.session_id
      AND lab_sessions.user_id = auth.uid()
    )
  );

-- Users can manage their own command history
CREATE POLICY "Users can manage own command history" ON lab_command_history
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM lab_sessions
      WHERE lab_sessions.id = lab_command_history.session_id
      AND lab_sessions.user_id = auth.uid()
    )
  );

-- Users can manage their own code saves
CREATE POLICY "Users can manage own code saves" ON lab_code_saves
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM lab_sessions
      WHERE lab_sessions.id = lab_code_saves.session_id
      AND lab_sessions.user_id = auth.uid()
    )
  );