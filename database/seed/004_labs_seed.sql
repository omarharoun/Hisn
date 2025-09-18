-- Insert sample labs
INSERT INTO labs (id, title, description, type, difficulty, estimated_minutes, tags, environment, instructions, initial_code, hints, is_public)
VALUES 
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Linux Command Line Essentials',
    'Master essential Linux commands including file operations, permissions, process management, and system navigation.',
    'coding',
    'beginner',
    90,
    ARRAY['linux', 'bash', 'command-line', 'system-admin'],
    '{"type": "docker", "image": "ubuntu:20.04", "ports": [22], "resources": {"cpu": "0.5", "memory": "1Gi"}}'::jsonb,
    E'# Linux Command Line Essentials Lab\n\nWelcome to the Linux Command Line Essentials lab!',
    '#!/bin/bash\n# Welcome to the Linux Lab\necho "Starting Linux basics..."',
    ARRAY['Use man command for help', 'ls -la shows hidden files', 'chmod changes permissions'],
    true
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    'Docker Containerization Lab',
    'Learn to build, run, and manage Docker containers. Create Dockerfiles, work with images, and understand container networking.',
    'coding',
    'intermediate',
    120,
    ARRAY['docker', 'containers', 'devops', 'microservices'],
    '{"type": "docker", "image": "docker:dind", "ports": [2375, 8080], "resources": {"cpu": "1", "memory": "2Gi"}}'::jsonb,
    E'# Docker Containerization Lab\n\nLearn Docker fundamentals through hands-on practice.',
    'FROM node:16-alpine\nWORKDIR /app\n# Your Dockerfile here',
    ARRAY['Use docker run to start containers', 'The -d flag runs in detached mode'],
    true
  );

-- Insert tasks for Linux lab
INSERT INTO lab_tasks (lab_id, title, description, order_index, validation_type, validation_data, points)
VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Navigate the File System',
    'Use pwd, ls, and cd commands to explore the file system',
    1,
    'command',
    '{"expected": ["pwd", "ls -la", "cd /"]}'::jsonb,
    10
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Create Files and Directories',
    'Create a directory called my-lab and add three files to it',
    2,
    'file',
    '{"expected": ["my-lab/file1.txt", "my-lab/file2.txt", "my-lab/script.sh"]}'::jsonb,
    15
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Manage Permissions',
    'Make script.sh executable and set file2.txt to read-only',
    3,
    'command',
    '{"expected": ["chmod +x", "chmod 444"]}'::jsonb,
    20
  );

-- Insert tasks for Docker lab
INSERT INTO lab_tasks (lab_id, title, description, order_index, validation_type, validation_data, points)
VALUES
  (
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    'Run Your First Container',
    'Pull and run a hello-world container',
    1,
    'command',
    '{"expected": ["docker run hello-world"]}'::jsonb,
    10
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    'Build Custom Image',
    'Create a Dockerfile and build your own image',
    2,
    'command',
    '{"expected": ["docker build"]}'::jsonb,
    25
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    'Container Management',
    'List, stop, and remove containers',
    3,
    'command',
    '{"expected": ["docker ps", "docker stop", "docker rm"]}'::jsonb,
    15
  );