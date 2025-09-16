-- Insert AI prompts for various use cases
INSERT INTO ai_prompts (name, category, template, variables, description) VALUES
  (
    'Code Review',
    'development',
    'Please review the following {language} code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or security issues\n3. Performance optimizations\n4. Readability and maintainability\n\nCode:\n```{language}\n{code}\n```\n\nPlease provide specific, actionable feedback.',
    ARRAY['language', 'code'],
    'Comprehensive code review with best practices and security analysis'
  ),
  (
    'Lab Validation',
    'education',
    'You are validating a student''s solution for a {lab_type} lab. The task was:\n\n{task_description}\n\nStudent''s solution:\n```{language}\n{student_code}\n```\n\nExpected solution:\n```{language}\n{solution_code}\n```\n\nPlease evaluate:\n1. Correctness (0-100%)\n2. Code quality (0-100%)\n3. Specific feedback for improvement\n4. Hints for next steps if incorrect\n\nProvide a JSON response with score, feedback, and hints.',
    ARRAY['lab_type', 'task_description', 'language', 'student_code', 'solution_code'],
    'Automated lab solution validation and feedback generation'
  ),
  (
    'Learning Path Recommendation',
    'education',
    'Based on a user''s current skills and goals, recommend a personalized learning path.\n\nUser Profile:\n- Current Skills: {current_skills}\n- Experience Level: {experience_level}\n- Learning Goals: {learning_goals}\n- Available Time: {time_commitment} hours per week\n- Preferred Learning Style: {learning_style}\n\nRecommend:\n1. Specific roadmaps to follow\n2. Estimated timeline\n3. Key skills to focus on\n4. Practical projects to build\n\nProvide a structured learning plan.',
    ARRAY['current_skills', 'experience_level', 'learning_goals', 'time_commitment', 'learning_style'],
    'Personalized learning path recommendations based on user profile'
  ),
  (
    'Interview Question Generation',
    'interview-prep',
    'Generate {question_count} {difficulty} level {question_type} interview questions for {topic}.\n\nFor each question, provide:\n1. The question text\n2. Expected answer or solution approach\n3. Follow-up questions\n4. Difficulty rating (1-10)\n5. Common mistakes to avoid\n\nTarget companies: {companies}\nFocus areas: {focus_areas}',
    ARRAY['question_count', 'difficulty', 'question_type', 'topic', 'companies', 'focus_areas'],
    'Generate targeted interview questions with solutions and follow-ups'
  ),
  (
    'Trend Analysis',
    'market-research',
    'Analyze the current market trends for {skill} in the {industry} industry.\n\nProvide analysis on:\n1. Demand growth (percentage)\n2. Salary impact\n3. Job market trends\n4. Required complementary skills\n5. Future outlook (1-2 years)\n6. Learning resources recommendations\n\nData sources to consider: {data_sources}\nGeographic focus: {location}',
    ARRAY['skill', 'industry', 'data_sources', 'location'],
    'Market trend analysis for specific skills and technologies'
  ),
  (
    'Lab Hint Generator',
    'education',
    'A student is stuck on a {lab_type} lab. Generate progressive hints without giving away the solution.\n\nLab description: {lab_description}\nStudent''s current code: {current_code}\nStuck point: {stuck_point}\n\nGenerate 3 progressive hints:\n1. Gentle nudge (conceptual)\n2. More specific guidance (approach)\n3. Near-solution hint (implementation detail)\n\nEach hint should help them learn, not just copy.',
    ARRAY['lab_type', 'lab_description', 'current_code', 'stuck_point'],
    'Progressive hint generation for students stuck on labs'
  ),
  (
    'Roadmap Content Generator',
    'content-creation',
    'Create detailed content for a roadmap step on {topic}.\n\nStep details:\n- Title: {step_title}\n- Target audience: {audience_level}\n- Estimated time: {duration} minutes\n- Learning objectives: {objectives}\n\nGenerate:\n1. Comprehensive explanation\n2. Key concepts and definitions\n3. Practical examples\n4. Common pitfalls\n5. Additional resources\n6. Practice exercises\n\nMake it engaging and educational.',
    ARRAY['topic', 'step_title', 'audience_level', 'duration', 'objectives'],
    'Generate comprehensive educational content for roadmap steps'
  ),
  (
    'Code Explanation',
    'education',
    'Explain the following {language} code in simple terms for a {experience_level} developer.\n\nCode:\n```{language}\n{code}\n```\n\nProvide:\n1. Line-by-line explanation\n2. Overall purpose and functionality\n3. Key concepts used\n4. Potential improvements\n5. Related topics to explore\n\nUse clear, educational language.',
    ARRAY['language', 'experience_level', 'code'],
    'Detailed code explanation for educational purposes'
  ),
  (
    'Project Idea Generator',
    'project-planning',
    'Generate {project_count} practical project ideas for someone learning {technology}.\n\nRequirements:\n- Skill level: {skill_level}\n- Time commitment: {time_budget}\n- Focus areas: {focus_areas}\n- Portfolio building: {for_portfolio}\n\nFor each project, provide:\n1. Project title and description\n2. Key features to implement\n3. Technologies and tools needed\n4. Estimated timeline\n5. Learning outcomes\n6. Difficulty rating\n7. Portfolio value',
    ARRAY['project_count', 'technology', 'skill_level', 'time_budget', 'focus_areas', 'for_portfolio'],
    'Generate practical project ideas for skill development'
  ),
  (
    'Debugging Assistant',
    'development',
    'Help debug this {language} code that has the following issue: {error_description}\n\nCode:\n```{language}\n{code}\n```\n\nError message (if any): {error_message}\n\nProvide:\n1. Root cause analysis\n2. Step-by-step debugging approach\n3. Fixed code with explanations\n4. Prevention strategies\n5. Testing recommendations\n\nFocus on teaching debugging skills.',
    ARRAY['language', 'error_description', 'code', 'error_message'],
    'Interactive debugging assistance with educational focus'
  )
ON CONFLICT (name) DO NOTHING;