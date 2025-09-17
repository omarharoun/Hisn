import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { InteractiveLabLayout } from '@/components/lab/interactive-lab-layout'
import { Question } from '@/components/lab/question-panel'
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
  searchParams: { interactive?: string }
}

export default async function LabDetailPage({ params, searchParams }: Props) {
  const { userId } = auth()
  const isInteractiveMode = searchParams.interactive === 'true'
  
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
      questions: [
        {
          id: 'navigation-basics',
          title: 'File System Navigation',
          description: 'Learn to navigate the Linux file system using basic commands.',
          instructions: [
            'Use the `pwd` command to display your current directory',
            'List the contents of the current directory with `ls -la`',
            'Navigate to the root directory using `cd /`',
            'Explore the `/etc`, `/var`, and `/home` directories',
            'Return to your home directory using `cd ~`'
          ],
          hints: [
            '`pwd` stands for "print working directory"',
            'The `-la` flags show all files (including hidden) in long format',
            'Use `cd` without arguments to return to your home directory',
            'The root directory `/` is the top-level directory in Linux',
            'The tilde `~` is a shortcut for your home directory'
          ],
          expectedCommands: ['pwd', 'ls -la', 'cd /', 'ls', 'cd /etc', 'ls', 'cd /var', 'ls', 'cd /home', 'ls', 'cd ~'],
          validationRules: [
            {
              type: 'command',
              pattern: 'pwd',
              description: 'Execute the pwd command'
            }
          ],
          completed: false
        },
        {
          id: 'file-operations',
          title: 'File and Directory Operations',
          description: 'Create, modify, and manage files and directories.',
          instructions: [
            'Create a new directory called `linux-lab` in your home directory',
            'Navigate into the `linux-lab` directory',
            'Create three files: `notes.txt`, `config.conf`, and `backup.sh`',
            'Add content to `notes.txt` using echo: "Learning Linux commands"',
            'Copy `notes.txt` to `notes-backup.txt`',
            'Create a subdirectory called `scripts`',
            'Move `backup.sh` into the `scripts` directory'
          ],
          hints: [
            'Use `mkdir` to create directories',
            'Use `cd` to change directories',
            'Use `touch` to create empty files',
            'Use `echo "content" > filename` to add content to files',
            'Use `cp source destination` to copy files',
            'Use `mv source destination` to move files'
          ],
          expectedCommands: ['mkdir linux-lab', 'cd linux-lab', 'touch notes.txt config.conf backup.sh', 'echo "Learning Linux commands" > notes.txt', 'cp notes.txt notes-backup.txt', 'mkdir scripts', 'mv backup.sh scripts/'],
          validationRules: [
            {
              type: 'command',
              pattern: 'mkdir.*linux-lab',
              description: 'Create the linux-lab directory'
            }
          ],
          completed: false
        },
        {
          id: 'permissions-ownership',
          title: 'File Permissions and Ownership',
          description: 'Master Linux file permissions and ownership concepts.',
          instructions: [
            'Check the permissions of all files using `ls -la`',
            'Make the `backup.sh` script executable for the owner: `chmod u+x scripts/backup.sh`',
            'Set read-only permissions for `config.conf`: `chmod 444 config.conf`',
            'Change permissions using octal notation: `chmod 755 scripts/`',
            'View the current user and group with `id`',
            'Check file ownership with `ls -la`'
          ],
          hints: [
            'Permissions are shown as rwx (read, write, execute) for user, group, and others',
            'Use `u+x` to add execute permission for user',
            'Octal 755 means rwxr-xr-x (owner: rwx, group: r-x, others: r-x)',
            'Octal 644 means rw-r--r-- (owner: rw-, group: r--, others: r--)',
            'The `id` command shows your user ID and group memberships'
          ],
          expectedCommands: ['ls -la', 'chmod u+x scripts/backup.sh', 'chmod 444 config.conf', 'chmod 755 scripts/', 'id', 'ls -la'],
          validationRules: [
            {
              type: 'command',
              pattern: 'chmod.*u\\+x.*backup\\.sh',
              description: 'Make backup.sh executable'
            }
          ],
          completed: false
        },
        {
          id: 'text-processing',
          title: 'Text Processing and Searching',
          description: 'Learn powerful text processing and search commands.',
          instructions: [
            'Create a log file with sample data: `echo -e "ERROR: Connection failed\\nINFO: Server started\\nWARN: Low memory\\nERROR: Database error\\nINFO: Request processed" > server.log`',
            'Search for ERROR entries: `grep "ERROR" server.log`',
            'Count the number of ERROR lines: `grep -c "ERROR" server.log`',
            'Search case-insensitively for "info": `grep -i "info" server.log`',
            'Sort the log file alphabetically: `sort server.log`',
            'Count lines, words, and characters: `wc server.log`',
            'Use pipes to find and count INFO messages: `grep "INFO" server.log | wc -l`'
          ],
          hints: [
            '`grep` searches for patterns in files',
            'Use `-c` flag with grep to count matches',
            'Use `-i` flag with grep for case-insensitive search',
            '`sort` arranges lines alphabetically',
            '`wc` counts lines, words, and characters',
            'Pipes (|) connect command output to input of next command'
          ],
          expectedCommands: ['echo -e "ERROR: Connection failed\\nINFO: Server started\\nWARN: Low memory\\nERROR: Database error\\nINFO: Request processed" > server.log', 'grep "ERROR" server.log', 'grep -c "ERROR" server.log', 'grep -i "info" server.log', 'sort server.log', 'wc server.log', 'grep "INFO" server.log | wc -l'],
          validationRules: [
            {
              type: 'command',
              pattern: 'grep.*ERROR.*server\\.log',
              description: 'Search for ERROR in server.log'
            }
          ],
          completed: false
        },
        {
          id: 'process-management',
          title: 'Process Management',
          description: 'Learn to monitor and manage system processes.',
          instructions: [
            'View currently running processes: `ps aux`',
            'Display processes in a tree format: `ps aux --forest` (or just `ps aux`)',
            'Show processes for current user only: `ps ux`',
            'Use `top` to see real-time process information (press q to quit)',
            'Start a background process: `sleep 60 &`',
            'List background jobs: `jobs`',
            'Find processes by name: `pgrep sleep` or `ps aux | grep sleep`',
            'Kill the sleep process: `pkill sleep` or use the job number with `kill %1`'
          ],
          hints: [
            '`ps aux` shows all processes with detailed information',
            'The `&` symbol runs commands in the background',
            '`jobs` shows active background jobs',
            '`pgrep` finds process IDs by name',
            '`pkill` terminates processes by name',
            'Use `kill %jobnumber` to kill background jobs'
          ],
          expectedCommands: ['ps aux', 'ps ux', 'sleep 60 &', 'jobs', 'pgrep sleep', 'pkill sleep'],
          validationRules: [
            {
              type: 'command',
              pattern: 'ps.*aux',
              description: 'List all processes'
            }
          ],
          completed: false
        },
        {
          id: 'system-monitoring',
          title: 'System Monitoring and Information',
          description: 'Monitor system resources and gather system information.',
          instructions: [
            'Check system uptime and load: `uptime`',
            'Display memory usage: `free -h`',
            'Show disk usage: `df -h`',
            'Check disk usage of current directory: `du -sh .`',
            'Display system information: `uname -a`',
            'Show CPU information: `cat /proc/cpuinfo | head -20`',
            'Check running processes and resource usage: `top` (press q to quit)',
            'Monitor system resources: `htop` (if available, otherwise use `top`)'
          ],
          hints: [
            '`uptime` shows how long the system has been running',
            '`free -h` displays memory in human-readable format',
            '`df -h` shows disk space in human-readable format',
            '`du -sh` shows directory size summary',
            '`uname -a` displays all system information',
            '/proc/cpuinfo contains CPU details'
          ],
          expectedCommands: ['uptime', 'free -h', 'df -h', 'du -sh .', 'uname -a', 'cat /proc/cpuinfo | head -20'],
          validationRules: [
            {
              type: 'command',
              pattern: 'uptime',
              description: 'Check system uptime'
            }
          ],
          completed: false
        },
        {
          id: 'networking-basics',
          title: 'Basic Network Commands',
          description: 'Learn essential networking commands for system administration.',
          instructions: [
            'Check network interface configuration: `ip addr show` (or `ifconfig` if available)',
            'Display routing table: `ip route show` (or `route -n`)',
            'Test network connectivity: `ping -c 4 8.8.8.8`',
            'Check if a port is listening: `netstat -tlnp` (or `ss -tlnp`)',
            'Resolve hostname to IP: `nslookup google.com` (or `dig google.com`)',
            'Check network statistics: `netstat -i` (or `ip -s link`)',
            'Display active network connections: `netstat -an | head -20`'
          ],
          hints: [
            '`ip` is the modern replacement for older tools like `ifconfig` and `route`',
            '`ping -c 4` sends 4 ping packets',
            '`netstat -tlnp` shows listening TCP ports',
            '`ss` is the modern replacement for `netstat`',
            '`nslookup` and `dig` are DNS lookup tools'
          ],
          expectedCommands: ['ip addr show', 'ip route show', 'ping -c 4 8.8.8.8', 'netstat -tlnp', 'nslookup google.com'],
          validationRules: [
            {
              type: 'command',
              pattern: 'ip.*addr.*show',
              description: 'Show network interfaces'
            }
          ],
          completed: false
        },
        {
          id: 'archives-compression',
          title: 'File Archives and Compression',
          description: 'Learn to create and extract archives and compressed files.',
          instructions: [
            'Create some test files: `echo "File 1" > test1.txt && echo "File 2" > test2.txt && echo "File 3" > test3.txt`',
            'Create a tar archive: `tar -cvf myarchive.tar test*.txt`',
            'List contents of tar archive: `tar -tvf myarchive.tar`',
            'Create a compressed tar.gz archive: `tar -czvf myarchive.tar.gz test*.txt`',
            'Extract the tar.gz archive to a new directory: `mkdir extracted && tar -xzvf myarchive.tar.gz -C extracted/`',
            'Create a zip archive: `zip myfiles.zip test*.txt` (if zip is available)',
            'Check file sizes: `ls -lh *.tar* *.zip 2>/dev/null || ls -lh *.tar*`'
          ],
          hints: [
            '`tar -cvf` creates a tar archive (c=create, v=verbose, f=file)',
            '`tar -tvf` lists contents (t=list, v=verbose, f=file)',
            '`tar -czvf` creates compressed gzip archive (z=gzip)',
            '`tar -xzvf` extracts compressed archive (x=extract)',
            'Use `-C directory` to extract to a specific directory'
          ],
          expectedCommands: ['echo "File 1" > test1.txt && echo "File 2" > test2.txt && echo "File 3" > test3.txt', 'tar -cvf myarchive.tar test*.txt', 'tar -tvf myarchive.tar', 'tar -czvf myarchive.tar.gz test*.txt', 'mkdir extracted && tar -xzvf myarchive.tar.gz -C extracted/', 'ls -lh *.tar*'],
          validationRules: [
            {
              type: 'command',
              pattern: 'tar.*-cvf.*myarchive\\.tar',
              description: 'Create tar archive'
            }
          ],
          completed: false
        },
        {
          id: 'environment-variables',
          title: 'Environment Variables and Shell Configuration',
          description: 'Understand and work with environment variables.',
          instructions: [
            'Display all environment variables: `env`',
            'Show the PATH variable: `echo $PATH`',
            'Display your home directory: `echo $HOME`',
            'Show current user: `echo $USER`',
            'Set a custom environment variable: `export MY_VAR="Hello Linux"`',
            'Display your custom variable: `echo $MY_VAR`',
            'Add a directory to PATH temporarily: `export PATH=$PATH:/tmp`',
            'Verify the updated PATH: `echo $PATH`'
          ],
          hints: [
            '`env` displays all environment variables',
            'Use `$` prefix to access variable values',
            '`export` makes variables available to child processes',
            'PATH determines where the shell looks for commands',
            'Environment variables are case-sensitive'
          ],
          expectedCommands: ['env', 'echo $PATH', 'echo $HOME', 'echo $USER', 'export MY_VAR="Hello Linux"', 'echo $MY_VAR', 'export PATH=$PATH:/tmp', 'echo $PATH'],
          validationRules: [
            {
              type: 'command',
              pattern: 'echo.*\\$PATH',
              description: 'Display PATH variable'
            }
          ],
          completed: false
        },
        {
          id: 'advanced-commands',
          title: 'Advanced Command Line Techniques',
          description: 'Master advanced command line features and techniques.',
          instructions: [
            'Use command substitution to store date: `current_date=$(date +%Y-%m-%d) && echo "Today is $current_date"`',
            'Find files by name: `find . -name "*.txt"`',
            'Find files modified in last 7 days: `find . -mtime -7`',
            'Use xargs to process find results: `find . -name "*.txt" | xargs ls -l`',
            'Create an alias: `alias ll="ls -la"`',
            'Use the new alias: `ll`',
            'Show command history: `history | tail -10`',
            'Execute a previous command by number: `!-2` (executes 2nd previous command)'
          ],
          hints: [
            'Command substitution: `$(command)` or `` `command` ``',
            '`find` is powerful for locating files',
            '`xargs` processes command output as arguments',
            'Aliases create command shortcuts',
            '`history` shows command history',
            '`!n` executes command number n from history'
          ],
          expectedCommands: ['current_date=$(date +%Y-%m-%d) && echo "Today is $current_date"', 'find . -name "*.txt"', 'find . -mtime -7', 'find . -name "*.txt" | xargs ls -l', 'alias ll="ls -la"', 'll', 'history | tail -10'],
          validationRules: [
            {
              type: 'command',
              pattern: 'find.*-name.*\\.txt',
              description: 'Find .txt files'
            }
          ],
          completed: false
        }
      ] as Question[],
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
      questions: [
        {
          id: 'docker-basics',
          title: 'Docker Fundamentals',
          description: 'Learn fundamental Docker commands and concepts.',
          instructions: [
            'Check Docker version and installation: `docker --version`',
            'Display Docker system information: `docker info`',
            'Pull the official nginx image: `docker pull nginx:latest`',
            'Pull a specific version: `docker pull nginx:1.21-alpine`',
            'List all downloaded images: `docker images`',
            'Run nginx container in detached mode: `docker run -d -p 8080:80 --name web-server nginx`',
            'List running containers: `docker ps`',
            'List all containers (running and stopped): `docker ps -a`'
          ],
          hints: [
            'Docker version shows if Docker is properly installed',
            '`docker info` displays detailed system information',
            'The `pull` command downloads images from Docker Hub',
            'Tags specify image versions (latest is default)',
            'The `-d` flag runs containers in detached (background) mode',
            'The `-p` flag maps host port to container port (host:container)'
          ],
          expectedCommands: ['docker --version', 'docker info', 'docker pull nginx:latest', 'docker pull nginx:1.21-alpine', 'docker images', 'docker run -d -p 8080:80 --name web-server nginx', 'docker ps'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*--version',
              description: 'Check Docker version'
            }
          ],
          completed: false
        },
        {
          id: 'container-management',
          title: 'Container Lifecycle Management',
          description: 'Master container creation, management, and cleanup.',
          instructions: [
            'Create and start a container: `docker run -d --name test-container alpine sleep 3600`',
            'Stop the running container: `docker stop test-container`',
            'Start the stopped container: `docker start test-container`',
            'Restart the container: `docker restart test-container`',
            'Execute commands in running container: `docker exec -it test-container sh`',
            'Exit the container shell (type `exit`)',
            'View container logs: `docker logs test-container`',
            'Remove the container: `docker rm -f test-container`'
          ],
          hints: [
            '`docker run` creates and starts a new container',
            '`docker stop` gracefully stops a container',
            '`docker start` starts an existing stopped container',
            '`docker exec -it` runs interactive commands in containers',
            '`docker logs` shows container output',
            '`docker rm -f` forcefully removes containers'
          ],
          expectedCommands: ['docker run -d --name test-container alpine sleep 3600', 'docker stop test-container', 'docker start test-container', 'docker restart test-container', 'docker exec -it test-container sh', 'docker logs test-container', 'docker rm -f test-container'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*run.*--name.*test-container',
              description: 'Create named container'
            }
          ],
          completed: false
        },
        {
          id: 'dockerfile-basics',
          title: 'Creating Basic Dockerfiles',
          description: 'Build custom Docker images using Dockerfiles.',
          instructions: [
            'Create a simple Dockerfile: `echo "FROM alpine:latest" > Dockerfile`',
            'Add a maintainer label: `echo "LABEL maintainer=\\"student@skillpath.com\\"" >> Dockerfile`',
            'Set working directory: `echo "WORKDIR /app" >> Dockerfile`',
            'Copy a file instruction: `echo "COPY . ." >> Dockerfile`',
            'Install packages: `echo "RUN apk add --no-cache curl" >> Dockerfile`',
            'Set default command: `echo "CMD [\\"echo\\", \\"Hello from Docker!\\"]" >> Dockerfile`',
            'View the complete Dockerfile: `cat Dockerfile`',
            'Build the image: `docker build -t my-alpine-app .`'
          ],
          hints: [
            'FROM specifies the base image',
            'LABEL adds metadata to images',
            'WORKDIR sets the working directory for subsequent instructions',
            'COPY transfers files from host to image',
            'RUN executes commands during build',
            'CMD sets the default command when container starts'
          ],
          expectedCommands: ['echo "FROM alpine:latest" > Dockerfile', 'echo "LABEL maintainer=\\"student@skillpath.com\\"" >> Dockerfile', 'echo "WORKDIR /app" >> Dockerfile', 'echo "COPY . ." >> Dockerfile', 'echo "RUN apk add --no-cache curl" >> Dockerfile', 'echo "CMD [\\"echo\\", \\"Hello from Docker!\\"]" >> Dockerfile', 'cat Dockerfile', 'docker build -t my-alpine-app .'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*build.*-t.*my-alpine-app',
              description: 'Build custom Docker image'
            }
          ],
          completed: false
        },
        {
          id: 'dockerfile-nodejs',
          title: 'Node.js Application Dockerfile',
          description: 'Create a production-ready Dockerfile for a Node.js application.',
          instructions: [
            'Create a Node.js Dockerfile: `echo "FROM node:16-alpine" > Dockerfile.node`',
            'Set working directory: `echo "WORKDIR /usr/src/app" >> Dockerfile.node`',
            'Copy package files first: `echo "COPY package*.json ./" >> Dockerfile.node`',
            'Install dependencies: `echo "RUN npm ci --only=production" >> Dockerfile.node`',
            'Copy application code: `echo "COPY . ." >> Dockerfile.node`',
            'Create non-root user: `echo "RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001" >> Dockerfile.node`',
            'Change ownership: `echo "RUN chown -R nodejs:nodejs /usr/src/app" >> Dockerfile.node`',
            'Switch to non-root user: `echo "USER nodejs" >> Dockerfile.node`',
            'Expose port: `echo "EXPOSE 3000" >> Dockerfile.node`',
            'Set startup command: `echo "CMD [\\"node\\", \\"index.js\\"]" >> Dockerfile.node`',
            'View the Dockerfile: `cat Dockerfile.node`'
          ],
          hints: [
            'Copy package.json first to leverage Docker layer caching',
            'Use `npm ci` for production builds (faster and more reliable)',
            'Always run containers as non-root users for security',
            'EXPOSE documents which port the app uses',
            'Use alpine images for smaller size'
          ],
          expectedCommands: ['echo "FROM node:16-alpine" > Dockerfile.node', 'echo "WORKDIR /usr/src/app" >> Dockerfile.node', 'echo "COPY package*.json ./" >> Dockerfile.node', 'echo "RUN npm ci --only=production" >> Dockerfile.node', 'echo "COPY . ." >> Dockerfile.node', 'cat Dockerfile.node'],
          validationRules: [
            {
              type: 'command',
              pattern: 'echo.*FROM.*node.*Dockerfile\\.node',
              description: 'Create Node.js Dockerfile'
            }
          ],
          completed: false
        },
        {
          id: 'docker-volumes',
          title: 'Docker Volumes and Data Persistence',
          description: 'Learn to manage persistent data with Docker volumes.',
          instructions: [
            'Create a named volume: `docker volume create my-data-volume`',
            'List all volumes: `docker volume ls`',
            'Inspect volume details: `docker volume inspect my-data-volume`',
            'Run container with volume mount: `docker run -d --name data-container -v my-data-volume:/data alpine sleep 3600`',
            'Write data to volume: `docker exec data-container sh -c "echo \\"Persistent data\\" > /data/test.txt"`',
            'Read data from volume: `docker exec data-container cat /data/test.txt`',
            'Stop and remove container: `docker rm -f data-container`',
            'Create new container with same volume: `docker run -d --name new-container -v my-data-volume:/data alpine sleep 3600`',
            'Verify data persistence: `docker exec new-container cat /data/test.txt`',
            'Clean up: `docker rm -f new-container && docker volume rm my-data-volume`'
          ],
          hints: [
            'Named volumes persist data independently of containers',
            'Use `-v volumename:/path` to mount named volumes',
            'Data in volumes survives container deletion',
            'Multiple containers can share the same volume',
            'Use `docker volume prune` to clean up unused volumes'
          ],
          expectedCommands: ['docker volume create my-data-volume', 'docker volume ls', 'docker volume inspect my-data-volume', 'docker run -d --name data-container -v my-data-volume:/data alpine sleep 3600', 'docker exec data-container sh -c "echo \\"Persistent data\\" > /data/test.txt"', 'docker exec data-container cat /data/test.txt'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*volume.*create.*my-data-volume',
              description: 'Create Docker volume'
            }
          ],
          completed: false
        },
        {
          id: 'docker-networking',
          title: 'Docker Networking',
          description: 'Understand Docker networking concepts and container communication.',
          instructions: [
            'List Docker networks: `docker network ls`',
            'Inspect the bridge network: `docker network inspect bridge`',
            'Create a custom network: `docker network create my-network`',
            'Run container on custom network: `docker run -d --name app1 --network my-network alpine sleep 3600`',
            'Run second container on same network: `docker run -d --name app2 --network my-network alpine sleep 3600`',
            'Test connectivity between containers: `docker exec app1 ping -c 3 app2`',
            'Check container network details: `docker inspect app1 | grep -A 10 NetworkSettings`',
            'Run container with port mapping: `docker run -d --name web --network my-network -p 8081:80 nginx`',
            'Test external connectivity: `curl -s localhost:8081 | head -5` (or just check if port is mapped)',
            'Clean up: `docker rm -f app1 app2 web && docker network rm my-network`'
          ],
          hints: [
            'Docker creates bridge, host, and none networks by default',
            'Custom networks provide automatic DNS resolution between containers',
            'Containers on same network can communicate using container names',
            'Use `-p` to expose container ports to host',
            'Bridge network is the default for containers'
          ],
          expectedCommands: ['docker network ls', 'docker network inspect bridge', 'docker network create my-network', 'docker run -d --name app1 --network my-network alpine sleep 3600', 'docker run -d --name app2 --network my-network alpine sleep 3600', 'docker exec app1 ping -c 3 app2'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*network.*create.*my-network',
              description: 'Create custom Docker network'
            }
          ],
          completed: false
        },
        {
          id: 'docker-compose-basics',
          title: 'Docker Compose Introduction',
          description: 'Learn to manage multi-container applications with Docker Compose.',
          instructions: [
            'Create a docker-compose.yml file: `echo "version: \\"3.8\\"" > docker-compose.yml`',
            'Add services section: `echo "services:" >> docker-compose.yml`',
            'Define web service: `echo "  web:" >> docker-compose.yml`',
            'Set image: `echo "    image: nginx:alpine" >> docker-compose.yml`',
            'Map ports: `echo "    ports:" >> docker-compose.yml`',
            'Add port mapping: `echo "      - \\"8082:80\\"" >> docker-compose.yml`',
            'Define database service: `echo "  db:" >> docker-compose.yml`',
            'Set database image: `echo "    image: postgres:13-alpine" >> docker-compose.yml`',
            'Add environment variables: `echo "    environment:" >> docker-compose.yml`',
            'Set postgres password: `echo "      POSTGRES_PASSWORD: mypassword" >> docker-compose.yml`',
            'View the compose file: `cat docker-compose.yml`',
            'Start services: `docker-compose up -d`',
            'List running services: `docker-compose ps`',
            'Stop services: `docker-compose down`'
          ],
          hints: [
            'Docker Compose uses YAML format for configuration',
            'Services are defined under the services section',
            'Compose automatically creates networks between services',
            '`docker-compose up -d` starts services in detached mode',
            '`docker-compose down` stops and removes containers'
          ],
          expectedCommands: ['echo "version: \\"3.8\\"" > docker-compose.yml', 'echo "services:" >> docker-compose.yml', 'echo "  web:" >> docker-compose.yml', 'echo "    image: nginx:alpine" >> docker-compose.yml', 'cat docker-compose.yml', 'docker-compose up -d', 'docker-compose ps', 'docker-compose down'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker-compose.*up.*-d',
              description: 'Start Docker Compose services'
            }
          ],
          completed: false
        },
        {
          id: 'multi-stage-builds',
          title: 'Multi-stage Docker Builds',
          description: 'Create optimized Docker images using multi-stage builds.',
          instructions: [
            'Create a multi-stage Dockerfile: `echo "# Build stage" > Dockerfile.multi`',
            'Set build stage: `echo "FROM node:16-alpine AS builder" >> Dockerfile.multi`',
            'Set work directory: `echo "WORKDIR /app" >> Dockerfile.multi`',
            'Copy package files: `echo "COPY package*.json ./" >> Dockerfile.multi`',
            'Install all dependencies: `echo "RUN npm install" >> Dockerfile.multi`',
            'Copy source code: `echo "COPY . ." >> Dockerfile.multi`',
            'Build application: `echo "RUN npm run build" >> Dockerfile.multi`',
            'Add production stage: `echo "# Production stage" >> Dockerfile.multi`',
            'Set production base: `echo "FROM nginx:alpine AS production" >> Dockerfile.multi`',
            'Copy built files: `echo "COPY --from=builder /app/dist /usr/share/nginx/html" >> Dockerfile.multi`',
            'Expose port: `echo "EXPOSE 80" >> Dockerfile.multi`',
            'Set command: `echo "CMD [\\"nginx\\", \\"-g\\", \\"daemon off;\\"]" >> Dockerfile.multi`',
            'View the multi-stage Dockerfile: `cat Dockerfile.multi`'
          ],
          hints: [
            'Multi-stage builds reduce final image size',
            'Use AS keyword to name build stages',
            'COPY --from=stage copies files from previous stages',
            'Only the final stage becomes the final image',
            'Build dependencies stay in build stage, not in final image'
          ],
          expectedCommands: ['echo "# Build stage" > Dockerfile.multi', 'echo "FROM node:16-alpine AS builder" >> Dockerfile.multi', 'echo "WORKDIR /app" >> Dockerfile.multi', 'echo "COPY --from=builder /app/dist /usr/share/nginx/html" >> Dockerfile.multi', 'cat Dockerfile.multi'],
          validationRules: [
            {
              type: 'command',
              pattern: 'echo.*FROM.*AS.*builder.*Dockerfile\\.multi',
              description: 'Create multi-stage Dockerfile'
            }
          ],
          completed: false
        },
        {
          id: 'docker-registry',
          title: 'Working with Docker Registries',
          description: 'Learn to work with Docker registries and image distribution.',
          instructions: [
            'Tag an image for registry: `docker tag nginx:alpine localhost:5000/my-nginx:v1.0`',
            'List images to see the tag: `docker images | grep my-nginx`',
            'Simulate registry push (will fail but shows concept): `docker push localhost:5000/my-nginx:v1.0 || echo "Registry not available - this is expected"`',
            'Search Docker Hub for images: `docker search --limit 5 python`',
            'Pull an official image: `docker pull python:3.9-slim`',
            'Inspect image layers: `docker history python:3.9-slim`',
            'Create a simple registry container: `docker run -d -p 5000:5000 --name registry registry:2`',
            'Wait and push to local registry: `sleep 5 && docker push localhost:5000/my-nginx:v1.0`',
            'Pull from local registry: `docker pull localhost:5000/my-nginx:v1.0`',
            'Clean up registry: `docker rm -f registry`'
          ],
          hints: [
            'Tags follow format: [registry/]namespace/repository:tag',
            'Default registry is Docker Hub',
            'Use docker search to find public images',
            'docker history shows image layer information',
            'Local registries are useful for private images'
          ],
          expectedCommands: ['docker tag nginx:alpine localhost:5000/my-nginx:v1.0', 'docker images | grep my-nginx', 'docker search --limit 5 python', 'docker pull python:3.9-slim', 'docker history python:3.9-slim'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*tag.*nginx.*localhost:5000',
              description: 'Tag image for registry'
            }
          ],
          completed: false
        },
        {
          id: 'docker-security',
          title: 'Docker Security Best Practices',
          description: 'Implement security best practices in Docker containers.',
          instructions: [
            'Run container as non-root user: `docker run --user 1000:1000 --name secure-container alpine id`',
            'Check the user ID: `docker logs secure-container`',
            'Limit container resources: `docker run -d --memory=128m --cpus=0.5 --name limited-container alpine sleep 3600`',
            'Check container resource limits: `docker stats limited-container --no-stream`',
            'Run container with read-only filesystem: `docker run --read-only --name readonly-container alpine touch /tmp/test 2>&1 || echo "Read-only filesystem prevents writes"`',
            'Use security options: `docker run --security-opt=no-new-privileges --name secure-opts alpine id`',
            'Scan image for vulnerabilities: `docker scan alpine:latest || echo "Docker scan not available - use third-party tools"`',
            'Check container processes: `docker exec limited-container ps aux`',
            'Clean up security test containers: `docker rm -f secure-container limited-container readonly-container secure-opts`'
          ],
          hints: [
            'Always run containers as non-root users when possible',
            'Limit memory and CPU to prevent resource exhaustion',
            'Use read-only filesystems when applications dont need to write',
            'Apply security options like no-new-privileges',
            'Regularly scan images for vulnerabilities'
          ],
          expectedCommands: ['docker run --user 1000:1000 --name secure-container alpine id', 'docker logs secure-container', 'docker run -d --memory=128m --cpus=0.5 --name limited-container alpine sleep 3600', 'docker stats limited-container --no-stream'],
          validationRules: [
            {
              type: 'command',
              pattern: 'docker.*run.*--user.*1000:1000',
              description: 'Run container as non-root user'
            }
          ],
          completed: false
        }
      ] as Question[],
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
    },
    'kubernetes-fundamentals-lab': {
      id: 'kubernetes-fundamentals-lab',
      title: 'Kubernetes Fundamentals',
      description: 'Deploy and manage applications on Kubernetes. Learn pods, services, deployments, and basic cluster operations.',
      type: 'coding',
      difficulty: 'advanced',
      estimatedMinutes: 180,
      tags: ['kubernetes', 'k8s', 'orchestration', 'cloud-native'],
      isPublic: true,
      completedBy: 423,
      rating: 4.9,
      environment: {
        type: 'kubernetes',
        resources: {
          cpu: '2',
          memory: '4Gi'
        }
      },
      author: {
        name: 'Cloud Native Team',
        avatar: '/avatars/cloudnative-team.png'
      },
      questions: [
        {
          id: 'kubectl-basics',
          title: 'Kubectl and Cluster Information',
          description: 'Learn to interact with Kubernetes clusters using kubectl.',
          instructions: [
            'Check kubectl version: `kubectl version --client`',
            'Get cluster information: `kubectl cluster-info`',
            'List all nodes in the cluster: `kubectl get nodes`',
            'Get detailed node information: `kubectl describe nodes`',
            'List all namespaces: `kubectl get namespaces`',
            'Get all resources in default namespace: `kubectl get all`'
          ],
          hints: [
            'kubectl is the command-line tool for Kubernetes',
            'Most kubectl commands can use short forms',
            'Namespaces provide logical separation of resources'
          ],
          expectedCommands: ['kubectl version --client', 'kubectl cluster-info', 'kubectl get nodes', 'kubectl get namespaces'],
          validationRules: [
            {
              type: 'command',
              pattern: 'kubectl.*version.*--client',
              description: 'Check kubectl version'
            }
          ],
          completed: false
        },
        {
          id: 'pods-management',
          title: 'Pod Creation and Management',
          description: 'Create and manage Kubernetes pods.',
          instructions: [
            'Create a simple pod: `kubectl run my-pod --image=nginx --restart=Never`',
            'List all pods: `kubectl get pods`',
            'Get detailed pod information: `kubectl describe pod my-pod`',
            'Check pod logs: `kubectl logs my-pod`',
            'Execute command in pod: `kubectl exec my-pod -- ls /usr/share/nginx/html`',
            'Delete the pod: `kubectl delete pod my-pod`'
          ],
          hints: [
            'Pods are the smallest deployable units in Kubernetes',
            'Use --restart=Never to create a pod instead of deployment',
            'kubectl exec allows running commands inside containers'
          ],
          expectedCommands: ['kubectl run my-pod --image=nginx --restart=Never', 'kubectl get pods', 'kubectl describe pod my-pod'],
          validationRules: [
            {
              type: 'command',
              pattern: 'kubectl.*run.*my-pod.*--image=nginx',
              description: 'Create nginx pod'
            }
          ],
          completed: false
        },
        {
          id: 'deployments',
          title: 'Deployments and Scaling',
          description: 'Learn to manage application deployments with scaling and updates.',
          instructions: [
            'Create a deployment: `kubectl create deployment web-app --image=nginx:1.20`',
            'List deployments: `kubectl get deployments`',
            'Scale the deployment: `kubectl scale deployment web-app --replicas=3`',
            'Update deployment image: `kubectl set image deployment/web-app nginx=nginx:1.21`',
            'Check rollout status: `kubectl rollout status deployment/web-app`',
            'Delete deployment: `kubectl delete deployment web-app`'
          ],
          hints: [
            'Deployments manage ReplicaSets which manage Pods',
            'Scaling changes the number of pod replicas',
            'Rolling updates ensure zero-downtime deployments'
          ],
          expectedCommands: ['kubectl create deployment web-app --image=nginx:1.20', 'kubectl scale deployment web-app --replicas=3'],
          validationRules: [
            {
              type: 'command',
              pattern: 'kubectl.*create.*deployment.*web-app',
              description: 'Create deployment'
            }
          ],
          completed: false
        }
      ] as Question[],
      instructions: `# Kubernetes Fundamentals Lab

Learn Kubernetes orchestration through hands-on practice with pods, services, deployments, and cluster management.`,
      initialCode: `# Kubernetes commands here`,
      solutionCode: `kubectl version --client
kubectl get nodes
kubectl run my-pod --image=nginx --restart=Never`,
      hints: [
        "Use 'kubectl --help' to see all available commands",
        "Most kubectl commands support -o yaml for detailed output"
      ],
      createdAt: '2024-01-22'
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

  // If in interactive mode, render the interactive layout
  if (isInteractiveMode && lab.questions) {
    return <InteractiveLabLayout 
      labId={lab.id} 
      labTitle={lab.title} 
      questions={lab.questions} 
    />
  }

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
                      <Link href={`/labs/${lab.id}?interactive=true`}>
                        <Button variant="outline">
                          <Terminal className="w-4 h-4 mr-1" />
                          Open Interactive Terminal
                        </Button>
                      </Link>
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
                          <Link href={`/labs/${lab.id}?interactive=true`}>
                            <Button className="w-full mb-4">
                              <Play className="w-4 h-4 mr-1" />
                              Start Interactive Lab
                            </Button>
                          </Link>
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