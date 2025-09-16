import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { 
  Code, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Play,
  Terminal,
  Globe,
  Cpu,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Settings
} from 'lucide-react'

interface Props {
  params: { id: string }
}

export default async function LabDetailPage({ params }: Props) {
  const { userId } = auth()
  
  // Mock data - in real app, this would come from API
  const labs = {
    'linux-basics-lab': {
      id: 'linux-basics-lab',
      title: 'Linux Command Line Essentials',
      description: 'Master essential Linux commands including file operations, permissions, process management, and system navigation. This comprehensive lab will teach you the fundamental skills needed for system administration and DevOps work.',
      type: 'coding',
      difficulty: 'beginner',
      estimatedMinutes: 90,
      tags: ['linux', 'bash', 'command-line', 'system-admin'],
      isPublic: true,
      completedBy: 1247,
      rating: 4.7,
      environment: {
        type: 'docker',
        image: 'ubuntu:20.04',
        ports: [22],
        resources: {
          cpu: '0.5',
          memory: '1Gi'
        }
      },
      author: {
        name: 'System Admin Team',
        avatar: '/avatars/sysadmin-team.png'
      },
      instructions: `# Linux Command Line Essentials Lab

Welcome to the Linux Command Line Essentials lab! In this hands-on exercise, you'll learn the fundamental commands and concepts needed to work effectively with Linux systems.

## Learning Objectives

By the end of this lab, you will be able to:
- Navigate the Linux file system using basic commands
- Create, modify, and delete files and directories
- Understand and manage file permissions
- Work with processes and system information
- Use text manipulation tools

## Lab Environment

You have access to a Ubuntu 20.04 container with a full command-line environment. The system includes common tools and utilities for learning Linux administration.

## Tasks

### Task 1: File System Navigation
1. Use \`pwd\` to display your current directory
2. List the contents of the current directory with \`ls -la\`
3. Navigate to the root directory using \`cd /\`
4. Explore the \`/etc\`, \`/var\`, and \`/home\` directories

### Task 2: File Operations
1. Create a new directory called \`my-lab\` in your home directory
2. Create three files: \`file1.txt\`, \`file2.txt\`, and \`script.sh\`
3. Add some content to each file using \`echo\` or a text editor
4. Copy \`file1.txt\` to \`file1-backup.txt\`

### Task 3: Permissions Management
1. Check the permissions of your files using \`ls -l\`
2. Make \`script.sh\` executable using \`chmod\`
3. Change the permissions of \`file2.txt\` to read-only
4. Understand the difference between user, group, and other permissions

### Task 4: Process Management
1. List running processes with \`ps aux\`
2. Use \`top\` to monitor system resources
3. Run a background process and manage it with job control
4. Find and kill a specific process

### Task 5: Text Processing
1. Use \`grep\` to search for patterns in files
2. Sort file contents with \`sort\`
3. Count lines, words, and characters with \`wc\`
4. Use pipes to combine commands

## Validation

Your progress will be automatically validated as you complete each task. Look for the green checkmarks to confirm successful completion.
`,
      initialCode: `#!/bin/bash
# Welcome to the Linux Command Line Essentials Lab
# Complete the tasks below step by step

# Task 1: Navigation
echo "=== Task 1: File System Navigation ==="
# Your commands here

# Task 2: File Operations  
echo "=== Task 2: File Operations ==="
# Your commands here

# Task 3: Permissions
echo "=== Task 3: Permissions Management ==="
# Your commands here

# Task 4: Processes
echo "=== Task 4: Process Management ==="
# Your commands here

# Task 5: Text Processing
echo "=== Task 5: Text Processing ==="
# Your commands here
`,
      solutionCode: `#!/bin/bash
# Linux Command Line Essentials Lab - Solution

# Task 1: Navigation
echo "=== Task 1: File System Navigation ==="
pwd
ls -la
cd /
ls
cd /etc && ls
cd /var && ls  
cd /home && ls
cd ~

# Task 2: File Operations
echo "=== Task 2: File Operations ==="
mkdir my-lab
cd my-lab
echo "This is file 1" > file1.txt
echo "This is file 2" > file2.txt
echo "#!/bin/bash\necho 'Hello World'" > script.sh
cp file1.txt file1-backup.txt
ls -la

# Task 3: Permissions
echo "=== Task 3: Permissions Management ==="
ls -l
chmod +x script.sh
chmod 444 file2.txt
ls -l

# Task 4: Process Management
echo "=== Task 4: Process Management ==="
ps aux | head -10
sleep 30 &
jobs
kill %1

# Task 5: Text Processing
echo "=== Task 5: Text Processing ==="
echo -e "apple\nbanana\ncherry\napple" > fruits.txt
grep "apple" fruits.txt
sort fruits.txt
wc fruits.txt
cat fruits.txt | grep "a" | wc -l
`,
      hints: [
        "Use 'man command' to get help for any Linux command",
        "The 'ls -la' command shows detailed file information including permissions",
        "File permissions are represented as rwx (read, write, execute) for user, group, and others",
        "Use 'chmod +x filename' to make a file executable",
        "The '&' symbol runs a command in the background",
        "Pipes (|) allow you to connect the output of one command to the input of another"
      ],
      createdAt: '2024-01-15'
    },
    'docker-basics-lab': {
      id: 'docker-basics-lab',
      title: 'Docker Containerization Lab',
      description: 'Learn to build, run, and manage Docker containers. Create Dockerfiles, work with images, and understand container networking.',
      type: 'coding',
      difficulty: 'intermediate',
      estimatedMinutes: 120,
      tags: ['docker', 'containers', 'devops', 'microservices'],
      isPublic: true,
      completedBy: 892,
      rating: 4.8,
      environment: {
        type: 'docker',
        image: 'docker:dind',
        ports: [2375, 8080],
        resources: {
          cpu: '1',
          memory: '2Gi'
        }
      },
      author: {
        name: 'DevOps Team',
        avatar: '/avatars/devops-team.png'
      },
      instructions: `# Docker Containerization Lab

Learn Docker fundamentals through hands-on practice with containers, images, and Dockerfiles.

## Learning Objectives
- Understand Docker concepts and architecture
- Work with Docker images and containers
- Create custom Docker images with Dockerfiles
- Manage container networking and volumes
- Implement multi-container applications

## Tasks
1. Run your first container
2. Build a custom image
3. Work with volumes and networking
4. Create a multi-container application
`,
      initialCode: `# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Your Dockerfile instructions here

EXPOSE 3000

CMD ["npm", "start"]
`,
      solutionCode: `# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
`,
      hints: [
        "Use 'docker run' to start a container",
        "The '-d' flag runs containers in detached mode",
        "Use 'docker build -t name:tag .' to build images",
        "Volumes persist data outside containers"
      ],
      createdAt: '2024-01-18'
    }
  }

  const lab = labs[params.id as keyof typeof labs]
  
  if (!lab) {
    notFound()
  }

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning', 
    advanced: 'destructive'
  }

  const getEnvironmentIcon = (type: string) => {
    switch (type) {
      case 'docker':
        return <Terminal className="w-5 h-5" />
      case 'kubernetes':
        return <Cpu className="w-5 h-5" />
      case 'browser':
        return <Globe className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  // Mock session status
  const hasActiveSession = userId && Math.random() > 0.7
  const sessionStatus = hasActiveSession ? 'running' : null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/labs" className="text-gray-600 hover:text-gray-900">
              Labs
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{lab.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge 
                    variant={difficultyColors[lab.difficulty as keyof typeof difficultyColors] as any}
                  >
                    {lab.difficulty}
                  </Badge>
                  <Badge variant="outline">{lab.type}</Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {getEnvironmentIcon(lab.environment.type)}
                    <span>{lab.environment.type}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {lab.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  {lab.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lab.estimatedMinutes} minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{lab.completedBy.toLocaleString()} completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{lab.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {lab.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Session Status */}
                {sessionStatus && (
                  <Card className="mb-6 border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Lab environment is running</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        Your lab session will expire in 1 hour 23 minutes
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto">
                        {lab.instructions}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Code Editor */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Editor</h2>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Workspace</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Settings
                        </Button>
                        <Button variant="outline" size="sm">
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                      <pre className="whitespace-pre-wrap overflow-x-auto">
                        {lab.initialCode}
                      </pre>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button>
                        <Play className="w-4 h-4 mr-1" />
                        Run Code
                      </Button>
                      <Button variant="outline">
                        <Terminal className="w-4 h-4 mr-1" />
                        Open Terminal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hints */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hints</h2>
                <div className="space-y-3">
                  {lab.hints.map((hint, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">{hint}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Start Lab Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {sessionStatus ? 'Lab Running' : 'Start Lab'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userId ? (
                      <>
                        {sessionStatus ? (
                          <div className="space-y-3">
                            <Button className="w-full" variant="outline">
                              <Terminal className="w-4 h-4 mr-1" />
                              Continue Lab
                            </Button>
                            <Button className="w-full" variant="destructive" size="sm">
                              Stop Session
                            </Button>
                          </div>
                        ) : (
                          <Button className="w-full mb-4">
                            <Play className="w-4 h-4 mr-1" />
                            Start Lab Environment
                          </Button>
                        )}
                        <div className="text-sm text-gray-600">
                          Environment will auto-stop after 2 hours of inactivity
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-600 mb-4">
                          Sign in to start the lab environment
                        </div>
                        <Link href="/sign-in">
                          <Button className="w-full">
                            Sign In to Start
                          </Button>
                        </Link>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Environment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Environment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getEnvironmentIcon(lab.environment.type)}
                      <span className="font-medium">{lab.environment.type}</span>
                    </div>
                    {lab.environment.image && (
                      <div className="text-sm text-gray-600">
                        <strong>Image:</strong> {lab.environment.image}
                      </div>
                    )}
                    {lab.environment.resources && (
                      <div className="text-sm text-gray-600">
                        <strong>Resources:</strong><br />
                        CPU: {lab.environment.resources.cpu}<br />
                        Memory: {lab.environment.resources.memory}
                      </div>
                    )}
                    {lab.environment.ports && (
                      <div className="text-sm text-gray-600">
                        <strong>Ports:</strong> {lab.environment.ports.join(', ')}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Author Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Created by</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-medium">{lab.author.name}</div>
                        <div className="text-sm text-gray-600">Lab Expert</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <Code className="w-4 h-4" />
                      Example Code
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <Users className="w-4 h-4" />
                      Community Discussion
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}