-- Insert DevOps Roadmap
INSERT INTO roadmaps (
  id,
  title,
  description,
  category,
  difficulty,
  estimated_hours,
  tags,
  is_public,
  is_featured,
  image_url
) VALUES (
  'devops-roadmap',
  'DevOps Engineer Roadmap',
  'Complete guide to becoming a DevOps Engineer with hands-on labs covering CI/CD, containerization, cloud platforms, and monitoring. This comprehensive roadmap will take you from beginner to professional DevOps engineer.',
  'software-development',
  'intermediate',
  120,
  ARRAY['devops', 'docker', 'kubernetes', 'aws', 'terraform', 'jenkins', 'monitoring', 'ci-cd'],
  true,
  true,
  '/roadmaps/devops.png'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  estimated_hours = EXCLUDED.estimated_hours,
  tags = EXCLUDED.tags,
  is_public = EXCLUDED.is_public,
  is_featured = EXCLUDED.is_featured,
  image_url = EXCLUDED.image_url;

-- Insert DevOps Roadmap Steps
INSERT INTO roadmap_steps (
  id,
  roadmap_id,
  title,
  description,
  content,
  step_order,
  type,
  estimated_minutes,
  prerequisites,
  is_optional
) VALUES 
-- Foundation Phase
(
  'devops-intro',
  'devops-roadmap',
  'Introduction to DevOps',
  'Understanding DevOps culture, practices, and benefits',
  '# Introduction to DevOps

DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the development lifecycle and provide continuous delivery with high software quality.

## What is DevOps?

DevOps is not just a set of tools or a job title - it''s a cultural philosophy that emphasizes:

- **Collaboration** between development and operations teams
- **Automation** of repetitive tasks
- **Continuous Integration and Continuous Deployment (CI/CD)**
- **Monitoring and Logging** for better visibility
- **Infrastructure as Code (IaC)** for consistency

## Key Benefits

1. **Faster Time to Market**: Automated pipelines reduce manual work
2. **Improved Quality**: Automated testing catches issues early
3. **Better Collaboration**: Breaks down silos between teams
4. **Increased Reliability**: Consistent, repeatable processes
5. **Scalability**: Infrastructure can grow with demand

## DevOps Lifecycle

The DevOps lifecycle consists of several phases:

1. **Plan**: Define requirements and plan features
2. **Code**: Write and version control code
3. **Build**: Compile and package applications
4. **Test**: Automated and manual testing
5. **Release**: Deploy to staging/production
6. **Deploy**: Make available to users
7. **Operate**: Monitor and maintain systems
8. **Monitor**: Collect feedback and metrics

## DevOps vs Traditional IT

| Traditional IT | DevOps |
|----------------|--------|
| Siloed teams | Collaborative culture |
| Manual processes | Automated workflows |
| Infrequent releases | Continuous delivery |
| Reactive monitoring | Proactive monitoring |
| Documentation-heavy | Code-driven configuration |

## Getting Started

To begin your DevOps journey, focus on:

1. **Learning Linux fundamentals** - Most DevOps tools run on Linux
2. **Version control with Git** - Essential for collaboration
3. **Understanding networking basics** - How systems communicate
4. **Scripting and automation** - Bash, Python, or PowerShell
5. **Cloud platforms** - AWS, Azure, or Google Cloud

## Next Steps

In the following steps, we''ll dive deep into each of these areas, starting with version control and Linux fundamentals.',
  1,
  'reading',
  30,
  ARRAY[]::UUID[],
  false
),
(
  'git-fundamentals',
  'devops-roadmap',
  'Version Control with Git',
  'Master Git fundamentals and collaborative workflows',
  '# Version Control with Git

Git is a distributed version control system that tracks changes in source code during software development. It''s essential for DevOps practitioners to master Git for effective collaboration and code management.

## Why Git?

- **Distributed**: Every developer has a complete copy of the project history
- **Branching**: Create isolated environments for features/experiments
- **Merging**: Combine changes from different branches safely
- **History**: Track all changes with detailed commit messages
- **Collaboration**: Multiple developers can work on the same project

## Basic Git Concepts

### Repository (Repo)
A directory that contains your project files and the complete history of changes.

### Commit
A snapshot of your project at a specific point in time, with a unique identifier (hash).

### Branch
A parallel version of your repository that diverges from the main working project.

### Remote
A version of your repository hosted on a server (like GitHub, GitLab, or Bitbucket).

## Essential Git Commands

### Initial Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Repository Operations
```bash
git init                    # Initialize a new repository
git clone <url>            # Clone a remote repository
git status                 # Check repository status
git log                    # View commit history
```

### Working with Changes
```bash
git add <file>             # Stage changes
git add .                  # Stage all changes
git commit -m "message"    # Commit staged changes
git diff                   # Show unstaged changes
git diff --staged          # Show staged changes
```

### Branching
```bash
git branch                 # List branches
git branch <name>          # Create new branch
git checkout <branch>      # Switch to branch
git checkout -b <name>     # Create and switch to branch
git merge <branch>         # Merge branch into current branch
git branch -d <branch>     # Delete branch
```

### Remote Operations
```bash
git remote add origin <url>  # Add remote repository
git push origin <branch>     # Push changes to remote
git pull origin <branch>     # Pull changes from remote
git fetch                    # Fetch changes without merging
```

## Git Workflow Strategies

### Feature Branch Workflow
1. Create a feature branch from main
2. Work on the feature
3. Push the branch to remote
4. Create a pull/merge request
5. Review and merge into main
6. Delete the feature branch

### Gitflow Workflow
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Feature development
- **release/***: Release preparation
- **hotfix/***: Critical bug fixes

## Best Practices

1. **Write clear commit messages**: Describe what and why, not how
2. **Commit frequently**: Small, logical commits are easier to track
3. **Use branches**: Keep main branch stable
4. **Review code**: Use pull requests for code review
5. **Keep history clean**: Use rebase when appropriate
6. **Tag releases**: Mark important versions

## Common Git Scenarios

### Undoing Changes
```bash
git checkout -- <file>     # Discard unstaged changes
git reset HEAD <file>      # Unstage changes
git reset --soft HEAD~1    # Undo last commit, keep changes staged
git reset --hard HEAD~1    # Undo last commit, discard changes
```

### Resolving Merge Conflicts
1. Git will mark conflicted files
2. Edit files to resolve conflicts
3. Stage resolved files with `git add`
4. Complete merge with `git commit`

### Working with Remotes
```bash
git remote -v              # List remotes
git remote show origin     # Show remote details
git push --set-upstream origin <branch>  # Set tracking branch
```

## Git Hooks

Git hooks are scripts that run automatically on certain Git events:

- **pre-commit**: Run before creating a commit
- **post-commit**: Run after creating a commit
- **pre-push**: Run before pushing to remote
- **post-receive**: Run on server after receiving push

Example pre-commit hook for code formatting:
```bash
#!/bin/sh
# Run code formatter before commit
npm run format
git add -A
```

## Next Steps

Now that you understand Git fundamentals, you''ll use these skills throughout your DevOps journey for:
- Managing infrastructure code
- Collaborating on automation scripts
- Versioning configuration files
- Implementing GitOps workflows',
  2,
  'reading',
  45,
  ARRAY['devops-intro']::UUID[],
  false
),
(
  'linux-fundamentals',
  'devops-roadmap',
  'Linux Fundamentals',
  'Essential Linux commands and system administration',
  '# Linux Fundamentals for DevOps

Linux is the foundation of most modern infrastructure. As a DevOps engineer, you''ll work with Linux servers daily, so mastering Linux fundamentals is crucial for success.

## Why Linux for DevOps?

- **Open Source**: Free and customizable
- **Stability**: Reliable for production systems
- **Security**: Robust permission and security model
- **Performance**: Efficient resource utilization
- **Automation**: Excellent scripting capabilities
- **Community**: Large ecosystem and support

## Linux Distribution Overview

### Popular Server Distributions
- **Ubuntu**: User-friendly, great for beginners
- **CentOS/RHEL**: Enterprise-focused, stable
- **Debian**: Stable, lightweight
- **Amazon Linux**: Optimized for AWS
- **Alpine**: Minimal, security-focused

## File System Hierarchy

Understanding the Linux file system structure:

```
/                   # Root directory
├── bin/           # Essential command binaries
├── boot/          # Boot loader files
├── dev/           # Device files
├── etc/           # Configuration files
├── home/          # User home directories
├── lib/           # Shared libraries
├── media/         # Removable media mount points
├── mnt/           # Temporary mount points
├── opt/           # Optional software packages
├── proc/          # Process information
├── root/          # Root user home directory
├── run/           # Runtime data
├── sbin/          # System administration binaries
├── srv/           # Service data
├── sys/           # System information
├── tmp/           # Temporary files
├── usr/           # User programs and data
└── var/           # Variable data (logs, databases)
```

## Essential Commands

### Navigation and File Operations
```bash
pwd                        # Print working directory
ls -la                     # List files with details
cd /path/to/directory     # Change directory
mkdir dirname             # Create directory
rmdir dirname             # Remove empty directory
rm -rf dirname            # Remove directory and contents
cp source destination     # Copy files/directories
mv source destination     # Move/rename files
find /path -name "*.txt"  # Find files by pattern
locate filename           # Find files in database
which command             # Show command location
```

### File Content Operations
```bash
cat filename              # Display file contents
less filename             # View file page by page
head -n 10 filename       # Show first 10 lines
tail -n 10 filename       # Show last 10 lines
tail -f filename          # Follow file changes
grep "pattern" filename   # Search for patterns
sed ''s/old/new/g'' filename # Replace text
awk ''{print $1}'' filename  # Process text columns
sort filename             # Sort file contents
uniq filename             # Remove duplicate lines
wc -l filename            # Count lines
```

### File Permissions

Linux uses a permission system with three types of access:
- **r (read)**: View file contents or list directory
- **w (write)**: Modify file or create/delete in directory  
- **x (execute)**: Run file or access directory

Permissions are set for three categories:
- **u (user/owner)**: File owner
- **g (group)**: File group members
- **o (others)**: Everyone else

```bash
ls -l filename            # Show permissions
chmod 755 filename        # Set permissions (rwxr-xr-x)
chmod u+x filename        # Add execute for user
chmod g-w filename        # Remove write for group
chown user:group filename # Change ownership
chgrp group filename      # Change group
```

### Process Management
```bash
ps aux                    # List all processes
ps -ef                    # List processes (different format)
top                       # Real-time process monitor
htop                      # Enhanced process monitor
kill PID                  # Terminate process by ID
killall processname       # Terminate processes by name
jobs                      # List active jobs
bg                        # Put job in background
fg                        # Bring job to foreground
nohup command &           # Run command immune to hangups
```

### System Information
```bash
uname -a                  # System information
whoami                    # Current username
id                        # User and group IDs
uptime                    # System uptime and load
free -h                   # Memory usage
df -h                     # Disk space usage
du -sh directory          # Directory size
lscpu                     # CPU information
lsblk                     # Block devices
mount                     # Show mounted filesystems
```

### Network Commands
```bash
ping hostname             # Test connectivity
wget url                  # Download files
curl url                  # Transfer data from servers
ssh user@hostname         # Secure shell connection
scp file user@host:/path  # Secure copy over network
netstat -tulpn            # Show network connections
ss -tulpn                 # Modern netstat alternative
iptables -L               # Show firewall rules
```

## Text Editors

### Vi/Vim
Essential for editing files on servers:
```bash
vi filename               # Open file in vi
# In vi:
i                         # Insert mode
:w                        # Save file
:q                        # Quit
:wq                       # Save and quit
:q!                       # Quit without saving
/pattern                  # Search for pattern
```

### Nano
User-friendly alternative:
```bash
nano filename             # Open file in nano
# Ctrl+O: Save
# Ctrl+X: Exit
# Ctrl+W: Search
```

## Package Management

### Ubuntu/Debian (APT)
```bash
apt update                # Update package list
apt upgrade               # Upgrade packages
apt install package       # Install package
apt remove package        # Remove package
apt search keyword        # Search packages
dpkg -l                   # List installed packages
```

### CentOS/RHEL (YUM/DNF)
```bash
yum update                # Update packages
yum install package       # Install package
yum remove package        # Remove package
yum search keyword        # Search packages
rpm -qa                   # List installed packages
```

## Environment Variables
```bash
echo $PATH                # Show PATH variable
export VAR=value          # Set environment variable
env                       # Show all environment variables
which command             # Show command location in PATH
```

## Input/Output Redirection
```bash
command > file            # Redirect output to file
command >> file           # Append output to file
command < file            # Use file as input
command1 | command2       # Pipe output to next command
command 2>&1              # Redirect stderr to stdout
command &> file           # Redirect both stdout and stderr
```

## Archive and Compression
```bash
tar -czf archive.tar.gz directory/    # Create compressed archive
tar -xzf archive.tar.gz               # Extract compressed archive
tar -tzf archive.tar.gz               # List archive contents
zip -r archive.zip directory/        # Create zip archive
unzip archive.zip                     # Extract zip archive
```

## System Services (systemd)
```bash
systemctl status service     # Check service status
systemctl start service      # Start service
systemctl stop service       # Stop service
systemctl restart service    # Restart service
systemctl enable service     # Enable service at boot
systemctl disable service    # Disable service at boot
journalctl -u service        # View service logs
```

## Cron Jobs (Scheduled Tasks)
```bash
crontab -e                   # Edit cron jobs
crontab -l                   # List cron jobs
# Cron format: minute hour day month weekday command
# Example: 0 2 * * * /path/to/backup.sh  # Run daily at 2 AM
```

## Shell Scripting Basics
```bash
#!/bin/bash                  # Shebang line
echo "Hello World"           # Print text
read -p "Enter name: " name  # Read user input
if [ condition ]; then       # Conditional statement
    echo "True"
fi
for i in {1..5}; do         # Loop
    echo $i
done
```

## Best Practices

1. **Use absolute paths** in scripts and cron jobs
2. **Check command exit codes** with `$?`
3. **Quote variables** to handle spaces: `"$variable"`
4. **Use meaningful names** for files and directories
5. **Regular backups** of important data
6. **Monitor logs** in `/var/log/`
7. **Keep systems updated** with security patches
8. **Use sudo** instead of root login
9. **Document your changes** and configurations
10. **Test commands** in development before production

## Security Considerations

- **Principle of least privilege**: Give minimum necessary permissions
- **Regular updates**: Keep system and packages updated
- **Strong passwords**: Use complex passwords and SSH keys
- **Firewall configuration**: Control network access
- **Log monitoring**: Watch for suspicious activity
- **Backup strategy**: Regular, tested backups

## Next Steps

With Linux fundamentals mastered, you''re ready to:
- Set up and manage servers
- Write automation scripts
- Deploy applications
- Configure monitoring systems
- Implement security measures

The next step will put these skills to practice with hands-on labs!',
  3,
  'reading',
  60,
  ARRAY['git-fundamentals']::UUID[],
  false
),
(
  'linux-lab',
  'devops-roadmap',
  'Linux Command Line Lab',
  'Practice essential Linux commands in a real environment',
  'Hands-on practice with Linux command line operations, file management, permissions, and basic system administration tasks.',
  4,
  'lab',
  90,
  ARRAY['linux-fundamentals']::UUID[],
  false
),
(
  'networking-fundamentals',
  'devops-roadmap',
  'Networking Fundamentals',
  'TCP/IP, DNS, HTTP/HTTPS, and network troubleshooting',
  '# Networking Fundamentals for DevOps

Understanding networking is crucial for DevOps engineers. You''ll work with distributed systems, configure load balancers, set up monitoring, and troubleshoot connectivity issues.

## OSI Model Overview

The OSI (Open Systems Interconnection) model has 7 layers:

1. **Physical Layer**: Cables, switches, electrical signals
2. **Data Link Layer**: MAC addresses, Ethernet frames
3. **Network Layer**: IP addresses, routing (Layer 3)
4. **Transport Layer**: TCP/UDP, ports (Layer 4)
5. **Session Layer**: Session management
6. **Presentation Layer**: Encryption, compression
7. **Application Layer**: HTTP, HTTPS, SSH, FTP

## TCP/IP Protocol Suite

### Internet Protocol (IP)
- **IPv4**: 32-bit addresses (e.g., 192.168.1.1)
- **IPv6**: 128-bit addresses (e.g., 2001:db8::1)
- **Private IP ranges**:
  - 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)
  - 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
  - 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)

### Transmission Control Protocol (TCP)
- **Connection-oriented**: Reliable, ordered delivery
- **Three-way handshake**: SYN, SYN-ACK, ACK
- **Common ports**: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)

### User Datagram Protocol (UDP)
- **Connectionless**: Fast, but no delivery guarantee
- **Common ports**: 53 (DNS), 67/68 (DHCP), 161 (SNMP)

## Subnetting and CIDR

### CIDR Notation
- **192.168.1.0/24**: Network with 256 addresses (192.168.1.0 - 192.168.1.255)
- **10.0.0.0/16**: Network with 65,536 addresses
- **172.16.0.0/12**: Network with 1,048,576 addresses

### Subnet Mask Examples
- /24 = 255.255.255.0 (Class C)
- /16 = 255.255.0.0 (Class B)  
- /8 = 255.0.0.0 (Class A)

## Domain Name System (DNS)

DNS translates human-readable domain names to IP addresses.

### DNS Record Types
- **A**: Maps domain to IPv4 address
- **AAAA**: Maps domain to IPv6 address
- **CNAME**: Canonical name (alias)
- **MX**: Mail exchange server
- **TXT**: Text records (SPF, DKIM, etc.)
- **NS**: Name server records
- **SOA**: Start of authority

### DNS Resolution Process
1. Browser checks local cache
2. Query local DNS resolver
3. Query root name servers
4. Query TLD name servers
5. Query authoritative name servers
6. Return IP address to client

## HTTP/HTTPS Protocol

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Submit data
- **PUT**: Update/replace resource
- **PATCH**: Partial update
- **DELETE**: Remove resource
- **HEAD**: Get headers only
- **OPTIONS**: Get supported methods

### HTTP Status Codes
- **1xx**: Informational
- **2xx**: Success (200 OK, 201 Created)
- **3xx**: Redirection (301 Moved, 302 Found)
- **4xx**: Client error (400 Bad Request, 404 Not Found)
- **5xx**: Server error (500 Internal Error, 502 Bad Gateway)

### HTTPS and TLS
- **TLS/SSL**: Encrypts HTTP traffic
- **Certificate Authority (CA)**: Issues SSL certificates
- **TLS Handshake**: Establishes secure connection
- **Perfect Forward Secrecy**: Each session has unique keys

## Load Balancing

### Load Balancer Types
- **Layer 4 (Transport)**: Routes based on IP and port
- **Layer 7 (Application)**: Routes based on HTTP content

### Load Balancing Algorithms
- **Round Robin**: Distribute requests evenly
- **Least Connections**: Route to server with fewest connections
- **IP Hash**: Route based on client IP hash
- **Weighted**: Assign different weights to servers

## Firewalls and Security

### Firewall Types
- **Packet Filter**: Examines individual packets
- **Stateful**: Tracks connection state
- **Application Layer**: Deep packet inspection

### Common Firewall Rules
```bash
# iptables examples
iptables -A INPUT -p tcp --dport 22 -j ACCEPT    # Allow SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT    # Allow HTTP
iptables -A INPUT -p tcp --dport 443 -j ACCEPT   # Allow HTTPS
iptables -A INPUT -j DROP                        # Drop all other traffic
```

## Network Troubleshooting Tools

### Connectivity Testing
```bash
ping google.com                    # Test basic connectivity
ping -c 4 8.8.8.8                 # Send 4 packets
traceroute google.com              # Show route to destination
mtr google.com                     # Continuous traceroute
```

### DNS Testing
```bash
nslookup google.com                # Basic DNS lookup
dig google.com                     # Detailed DNS lookup
dig @8.8.8.8 google.com           # Query specific DNS server
dig google.com MX                  # Query specific record type
```

### Port and Service Testing
```bash
telnet google.com 80               # Test TCP connection
nc -zv google.com 80               # Test port connectivity
nmap -p 80,443 google.com          # Port scan
ss -tulpn                          # Show listening ports
netstat -tulpn                     # Show network connections
```

### Network Interface Information
```bash
ip addr show                       # Show IP addresses
ip route show                      # Show routing table
ifconfig                           # Network interface config (deprecated)
ethtool eth0                       # Ethernet interface details
```

### Packet Capture
```bash
tcpdump -i eth0                    # Capture packets on interface
tcpdump -i eth0 port 80            # Capture HTTP traffic
wireshark                          # GUI packet analyzer
```

## Virtual Private Networks (VPN)

### VPN Types
- **Site-to-Site**: Connect entire networks
- **Remote Access**: Connect individual clients
- **SSL VPN**: Browser-based access
- **IPSec VPN**: Network layer encryption

### VPN Protocols
- **OpenVPN**: Open source, flexible
- **IPSec**: Industry standard, complex
- **WireGuard**: Modern, simple, fast
- **PPTP**: Legacy, insecure

## Software Defined Networking (SDN)

### SDN Components
- **Controller**: Centralized network control
- **Switches**: Forward packets based on controller rules
- **Northbound API**: Applications communicate with controller
- **Southbound API**: Controller communicates with switches

### SDN Benefits
- **Centralized management**: Single point of control
- **Programmability**: Network automation
- **Flexibility**: Dynamic network configuration
- **Visibility**: Better network monitoring

## Container Networking

### Docker Networking
- **Bridge**: Default network for containers
- **Host**: Use host network stack
- **None**: No networking
- **Overlay**: Multi-host networking
- **Macvlan**: Assign MAC addresses to containers

### Kubernetes Networking
- **Pod Network**: Each pod gets unique IP
- **Service Network**: Load balancing within cluster
- **Ingress**: External access to services
- **Network Policies**: Traffic filtering rules

## Cloud Networking

### Virtual Private Cloud (VPC)
- **Subnets**: Segment network into smaller parts
- **Route Tables**: Control traffic routing
- **Internet Gateway**: Internet access
- **NAT Gateway**: Outbound internet for private subnets
- **VPC Peering**: Connect VPCs together

### Content Delivery Network (CDN)
- **Edge Locations**: Cached content closer to users
- **Origin Server**: Source of original content
- **Cache Hit/Miss**: Content found/not found in cache
- **TTL**: Time content stays cached

## Network Monitoring

### Key Metrics
- **Bandwidth Utilization**: How much capacity is used
- **Latency**: Round-trip time for packets
- **Packet Loss**: Percentage of lost packets
- **Jitter**: Variation in packet arrival time
- **Throughput**: Actual data transfer rate

### Monitoring Tools
- **SNMP**: Simple Network Management Protocol
- **NetFlow/sFlow**: Network traffic analysis
- **Ping/Traceroute**: Connectivity testing
- **Nagios/Zabbix**: Network monitoring platforms
- **Wireshark**: Packet analysis

## Network Security Best Practices

1. **Principle of Least Privilege**: Only allow necessary traffic
2. **Network Segmentation**: Isolate different network zones
3. **Regular Updates**: Keep network devices patched
4. **Strong Authentication**: Use certificates and strong passwords
5. **Monitoring**: Log and monitor network traffic
6. **Encryption**: Use TLS/SSL for sensitive data
7. **Backup Configurations**: Regular config backups
8. **Change Management**: Document and approve changes

## Common Network Issues

### Connectivity Problems
- **Physical issues**: Cable, port, interface problems
- **Configuration errors**: Wrong IP, subnet, gateway
- **DNS issues**: Name resolution failures
- **Firewall blocking**: Security rules preventing traffic

### Performance Issues
- **Bandwidth saturation**: Too much traffic
- **High latency**: Network delays
- **Packet loss**: Network congestion or errors
- **Routing loops**: Circular routing paths

### Security Issues
- **DDoS attacks**: Overwhelming traffic
- **Man-in-the-middle**: Traffic interception
- **Port scanning**: Unauthorized reconnaissance
- **DNS hijacking**: Malicious DNS redirection

## Next Steps

Understanding networking fundamentals prepares you for:
- Configuring cloud infrastructure
- Setting up container orchestration
- Implementing monitoring solutions
- Troubleshooting distributed systems
- Designing secure architectures

The next step will dive into containerization with Docker!',
  5,
  'reading',
  75,
  ARRAY['linux-lab']::UUID[],
  false
);

-- Continue with more steps...
INSERT INTO roadmap_steps (
  id,
  roadmap_id,
  title,
  description,
  content,
  step_order,
  type,
  estimated_minutes,
  prerequisites,
  is_optional
) VALUES 
(
  'docker-fundamentals',
  'devops-roadmap',
  'Docker Fundamentals',
  'Containerization concepts and Docker basics',
  '# Docker Fundamentals

Docker revolutionized application deployment by providing lightweight, portable containers that package applications with their dependencies.

## What is Docker?

Docker is a containerization platform that allows you to package applications and their dependencies into lightweight, portable containers that can run consistently across different environments.

## Key Concepts

### Images
- **Definition**: Read-only templates used to create containers
- **Layers**: Images are built in layers for efficiency
- **Base Images**: Starting point (e.g., ubuntu:20.04, node:16)
- **Tags**: Version labels for images (e.g., nginx:latest, postgres:13.2)

### Containers
- **Definition**: Running instances of images
- **Isolation**: Each container has its own filesystem, network, processes
- **Stateless**: Containers should be ephemeral and stateless
- **Lifecycle**: Create, start, stop, remove

### Dockerfile
- **Definition**: Text file with instructions to build images
- **Instructions**: FROM, RUN, COPY, EXPOSE, CMD, etc.
- **Best Practices**: Minimize layers, use specific tags, clean up

## Docker Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Docker Client │────│   Docker Daemon  │────│  Container      │
│   (docker CLI)  │    │   (dockerd)      │    │  Runtime        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                       ┌───────┴────────┐
                       │  Docker Registry │
                       │  (Docker Hub)    │
                       └────────────────┘
```

## Essential Docker Commands

### Image Management
```bash
docker images                    # List local images
docker pull nginx:latest         # Download image
docker build -t myapp:1.0 .     # Build image from Dockerfile
docker tag myapp:1.0 myapp:latest # Tag image
docker push myapp:1.0           # Push to registry
docker rmi image_id             # Remove image
docker image prune              # Remove unused images
```

### Container Management
```bash
docker run nginx                # Run container
docker run -d nginx             # Run in detached mode
docker run -p 8080:80 nginx     # Port mapping
docker run -v /host:/container nginx # Volume mounting
docker run --name mycontainer nginx # Named container
docker ps                       # List running containers
docker ps -a                    # List all containers
docker stop container_id        # Stop container
docker start container_id       # Start stopped container
docker restart container_id     # Restart container
docker rm container_id          # Remove container
docker logs container_id        # View container logs
docker exec -it container_id bash # Execute command in container
```

### System Commands
```bash
docker info                     # System information
docker version                  # Docker version
docker system df               # Disk usage
docker system prune            # Clean up unused resources
```

## Dockerfile Best Practices

### Example Dockerfile
```dockerfile
# Use specific base image version
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Dockerfile Instructions

#### FROM
```dockerfile
FROM ubuntu:20.04              # Base image
FROM node:16-alpine AS builder # Multi-stage build
```

#### RUN
```dockerfile
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*  # Clean up in same layer
```

#### COPY vs ADD
```dockerfile
COPY src/ /app/src/           # Copy files/directories
ADD https://example.com/file.tar.gz /tmp/  # Copy + extract + download
```

#### ENV
```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

#### EXPOSE
```dockerfile
EXPOSE 3000                   # Document port (doesn''t publish)
```

#### CMD vs ENTRYPOINT
```dockerfile
CMD ["npm", "start"]          # Default command (can be overridden)
ENTRYPOINT ["npm"]           # Always runs (CMD becomes arguments)
```

## Docker Networking

### Network Types
```bash
docker network ls             # List networks

# Default networks:
# - bridge: Default network for containers
# - host: Use host network stack
# - none: No networking
```

### Custom Networks
```bash
docker network create mynetwork        # Create custom network
docker run --network mynetwork nginx   # Use custom network
docker network inspect mynetwork       # Network details
docker network rm mynetwork           # Remove network
```

### Container Communication
```bash
# Containers on same network can communicate by name
docker run -d --name db --network mynetwork postgres
docker run -d --name app --network mynetwork myapp
# App can connect to database using hostname "db"
```

## Docker Volumes

### Volume Types

#### Named Volumes
```bash
docker volume create myvolume          # Create volume
docker run -v myvolume:/data nginx     # Mount volume
docker volume ls                       # List volumes
docker volume inspect myvolume        # Volume details
docker volume rm myvolume             # Remove volume
```

#### Bind Mounts
```bash
docker run -v /host/path:/container/path nginx  # Bind mount
docker run -v $(pwd):/app node:16              # Current directory
```

#### tmpfs Mounts
```bash
docker run --tmpfs /tmp nginx          # Temporary filesystem
```

## Docker Compose

Docker Compose manages multi-container applications using YAML configuration.

### docker-compose.yml Example
```yaml
version: ''3.8''
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    volumes:
      - ./src:/app/src
    networks:
      - app-network

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

### Docker Compose Commands
```bash
docker-compose up                # Start services
docker-compose up -d             # Start in detached mode
docker-compose down              # Stop and remove containers
docker-compose ps                # List services
docker-compose logs              # View logs
docker-compose exec web bash     # Execute command in service
docker-compose build             # Build services
docker-compose pull              # Pull latest images
```

## Multi-Stage Builds

Optimize image size by using multiple build stages:

```dockerfile
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
CMD ["npm", "start"]
```

## Docker Security Best Practices

### Image Security
1. **Use official base images** from trusted sources
2. **Scan images** for vulnerabilities
3. **Use specific tags** instead of "latest"
4. **Keep images updated** regularly
5. **Use minimal base images** (Alpine, distroless)

### Runtime Security
1. **Run as non-root user** inside containers
2. **Use read-only filesystems** when possible
3. **Limit container resources** (CPU, memory)
4. **Use secrets management** for sensitive data
5. **Enable Docker Content Trust** for image verification

### Example Security Configuration
```bash
# Run with limited resources and non-root user
docker run \
  --user 1000:1000 \
  --read-only \
  --tmpfs /tmp \
  --memory 512m \
  --cpus 0.5 \
  --security-opt no-new-privileges \
  nginx
```

## Container Orchestration Preview

While Docker handles single containers, production environments need orchestration:

- **Docker Swarm**: Docker''s built-in orchestration
- **Kubernetes**: Industry-standard container orchestration
- **Amazon ECS**: AWS container service
- **Azure Container Instances**: Azure container service

## Monitoring and Logging

### Container Logs
```bash
docker logs container_name      # View logs
docker logs -f container_name   # Follow logs
docker logs --tail 100 container_name  # Last 100 lines
```

### Container Stats
```bash
docker stats                   # Real-time resource usage
docker stats container_name    # Specific container stats
```

### Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

## Common Docker Patterns

### Database Container
```yaml
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - db_data:/var/lib/postgresql/data
    secrets:
      - db_password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Web Application
```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
```

## Troubleshooting Common Issues

### Container Won''t Start
1. Check logs: `docker logs container_name`
2. Verify image exists: `docker images`
3. Check resource constraints
4. Verify port conflicts

### Performance Issues
1. Monitor resource usage: `docker stats`
2. Check container limits
3. Optimize Dockerfile layers
4. Use appropriate base images

### Networking Problems
1. Verify network configuration: `docker network ls`
2. Check port mappings: `docker port container_name`
3. Test connectivity between containers
4. Review firewall rules

## Next Steps

With Docker fundamentals mastered, you''re ready to:
- Build and deploy containerized applications
- Implement CI/CD pipelines with containers
- Learn container orchestration with Kubernetes
- Implement monitoring and logging solutions
- Design microservices architectures

The next step will put these Docker skills into practice with hands-on labs!',
  6,
  'reading',
  90,
  ARRAY['networking-fundamentals']::UUID[],
  false
),
(
  'docker-lab',
  'devops-roadmap',
  'Docker Hands-on Lab',
  'Build, run, and manage Docker containers',
  'Hands-on practice with Docker containerization, building custom images, working with volumes and networks, and deploying multi-container applications.',
  7,
  'lab',
  120,
  ARRAY['docker-fundamentals']::UUID[],
  false
),
(
  'ci-cd-concepts',
  'devops-roadmap',
  'CI/CD Concepts',
  'Continuous Integration and Continuous Deployment principles',
  '# CI/CD Concepts

Continuous Integration and Continuous Deployment (CI/CD) are fundamental DevOps practices that automate the software delivery process, enabling teams to deliver code changes more frequently and reliably.

## What is CI/CD?

### Continuous Integration (CI)
The practice of regularly merging code changes into a central repository, followed by automated builds and tests.

### Continuous Deployment (CD)
The practice of automatically deploying code changes to production after passing all tests and quality gates.

### Continuous Delivery
Similar to deployment, but with a manual approval step before production release.

## CI/CD Pipeline Stages

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Source    │───▶│    Build    │───▶│    Test     │───▶│   Deploy    │───▶│   Monitor   │
│   Control   │    │             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 1. Source Control
- **Version Control**: Git repositories (GitHub, GitLab, Bitbucket)
- **Branching Strategy**: Feature branches, pull requests
- **Code Review**: Peer review process
- **Webhooks**: Trigger pipelines on code changes

### 2. Build
- **Compilation**: Transform source code into executable artifacts
- **Dependency Management**: Install required packages/libraries
- **Artifact Creation**: Package applications for deployment
- **Build Tools**: Maven, Gradle, npm, Docker

### 3. Test
- **Unit Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows
- **Security Tests**: Vulnerability scanning
- **Performance Tests**: Load and stress testing

### 4. Deploy
- **Staging Deployment**: Deploy to testing environment
- **Production Deployment**: Deploy to live environment
- **Blue-Green Deployment**: Zero-downtime deployments
- **Canary Deployment**: Gradual rollout to subset of users

### 5. Monitor
- **Application Monitoring**: Performance metrics
- **Error Tracking**: Exception monitoring
- **Log Analysis**: Centralized logging
- **User Analytics**: User behavior tracking

## CI/CD Benefits

### For Development Teams
- **Faster Feedback**: Quick identification of issues
- **Reduced Integration Problems**: Regular code merging
- **Higher Code Quality**: Automated testing
- **Faster Time to Market**: Automated deployments
- **Reduced Manual Errors**: Automated processes

### For Organizations
- **Increased Deployment Frequency**: Multiple deployments per day
- **Reduced Lead Time**: Faster feature delivery
- **Lower Failure Rate**: Automated testing catches issues
- **Faster Recovery**: Quick rollback capabilities
- **Better Collaboration**: Shared responsibility

## CI/CD Tools Landscape

### Version Control
- **Git**: Distributed version control
- **GitHub**: Git hosting with CI/CD (Actions)
- **GitLab**: Complete DevOps platform
- **Bitbucket**: Atlassian''s Git solution

### Build Tools
- **Jenkins**: Open-source automation server
- **GitHub Actions**: GitHub''s CI/CD platform
- **GitLab CI**: GitLab''s built-in CI/CD
- **Azure DevOps**: Microsoft''s DevOps platform
- **CircleCI**: Cloud-based CI/CD
- **Travis CI**: CI service for GitHub projects

### Container Orchestration
- **Docker**: Containerization platform
- **Kubernetes**: Container orchestration
- **Docker Swarm**: Docker''s orchestration
- **Amazon ECS**: AWS container service

### Deployment Tools
- **Ansible**: Configuration management
- **Terraform**: Infrastructure as Code
- **Helm**: Kubernetes package manager
- **Spinnaker**: Multi-cloud deployment

### Monitoring Tools
- **Prometheus**: Metrics collection
- **Grafana**: Visualization dashboards
- **ELK Stack**: Logging (Elasticsearch, Logstash, Kibana)
- **New Relic**: Application performance monitoring

## Pipeline as Code

Define CI/CD pipelines using code for version control and reproducibility.

### Jenkins Pipeline (Jenkinsfile)
```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "myapp:${BUILD_NUMBER}"
    }
    
    stages {
        stage(''Checkout'') {
            steps {
                checkout scm
            }
        }
        
        stage(''Build'') {
            steps {
                sh ''npm install''
                sh ''npm run build''
            }
        }
        
        stage(''Test'') {
            parallel {
                stage(''Unit Tests'') {
                    steps {
                        sh ''npm test''
                    }
                    post {
                        always {
                            publishTestResults ''test-results.xml''
                        }
                    }
                }
                
                stage(''Security Scan'') {
                    steps {
                        sh ''npm audit''
                    }
                }
            }
        }
        
        stage(''Build Docker Image'') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        
        stage(''Deploy to Staging'') {
            steps {
                sh "docker run -d --name staging ${DOCKER_IMAGE}"
            }
        }
        
        stage(''Integration Tests'') {
            steps {
                sh ''npm run test:integration''
            }
        }
        
        stage(''Deploy to Production'') {
            when {
                branch ''main''
            }
            steps {
                input ''Deploy to production?''
                sh "kubectl set image deployment/myapp myapp=${DOCKER_IMAGE}"
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            mail to: ''team@company.com'',
                 subject: "Pipeline Failed: ${env.JOB_NAME}",
                 body: "Build ${env.BUILD_NUMBER} failed"
        }
    }
}
```

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ''16''
        cache: ''npm''
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run security audit
      run: npm audit --audit-level high
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: test-results.xml

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == ''refs/heads/main''
    
    steps:
    - name: Deploy to Kubernetes
      run: |
        echo "Deploying to production..."
        # kubectl commands here
```

## Testing Strategies

### Test Pyramid
```
                    ┌─────────────────┐
                    │   E2E Tests     │  ← Few, Slow, Expensive
                    │   (UI Tests)    │
                ┌───┴─────────────────┴───┐
                │   Integration Tests     │  ← Some, Medium Speed
                │   (API Tests)           │
        ┌───────┴─────────────────────────┴───────┐
        │           Unit Tests                    │  ← Many, Fast, Cheap
        │        (Component Tests)                │
        └─────────────────────────────────────────┘
```

### Test Types

#### Unit Tests
- **Scope**: Individual functions/methods
- **Speed**: Very fast (milliseconds)
- **Tools**: Jest, Mocha, JUnit, pytest
- **Coverage**: 70-80% of test suite

#### Integration Tests
- **Scope**: Component interactions
- **Speed**: Medium (seconds)
- **Tools**: Postman, REST Assured, Supertest
- **Coverage**: 20-25% of test suite

#### End-to-End Tests
- **Scope**: Complete user workflows
- **Speed**: Slow (minutes)
- **Tools**: Selenium, Cypress, Playwright
- **Coverage**: 5-10% of test suite

### Test Automation Best Practices

1. **Fast Feedback**: Run unit tests first
2. **Fail Fast**: Stop pipeline on critical test failures
3. **Parallel Execution**: Run tests in parallel
4. **Test Data Management**: Use test databases/fixtures
5. **Flaky Test Management**: Identify and fix unreliable tests
6. **Test Coverage**: Aim for meaningful coverage, not just high numbers

## Deployment Strategies

### Blue-Green Deployment
```
┌─────────────┐    ┌─────────────┐
│    Blue     │    │   Green     │
│ (Current)   │    │   (New)     │
│  Version 1  │    │  Version 2  │
└─────┬───────┘    └─────┬───────┘
      │                  │
      └────┐    ┌────────┘
           │    │
    ┌──────▼────▼──────┐
    │   Load Balancer  │
    │    (Router)      │
    └──────────────────┘
```

**Benefits**: Zero downtime, instant rollback
**Drawbacks**: Requires double infrastructure

### Canary Deployment
```
┌─────────────┐    ┌─────────────┐
│  Version 1  │    │  Version 2  │
│    (90%)    │    │    (10%)    │
└─────┬───────┘    └─────┬───────┘
      │                  │
      └────┐    ┌────────┘
           │    │
    ┌──────▼────▼──────┐
    │   Load Balancer  │
    │  (Traffic Split) │
    └──────────────────┘
```

**Benefits**: Risk mitigation, gradual rollout
**Drawbacks**: Complex traffic management

### Rolling Deployment
```
Instance 1: v1 → v2 ✓
Instance 2: v1 → v2 ✓  
Instance 3: v1 → v2 (in progress)
Instance 4: v1 (waiting)
```

**Benefits**: No additional infrastructure
**Drawbacks**: Temporary capacity reduction

## Configuration Management

### Environment-Specific Configuration
```yaml
# config/development.yml
database:
  host: localhost
  port: 5432
  name: myapp_dev

redis:
  url: redis://localhost:6379

logging:
  level: debug

# config/production.yml
database:
  host: ${DB_HOST}
  port: ${DB_PORT}
  name: ${DB_NAME}

redis:
  url: ${REDIS_URL}

logging:
  level: info
```

### Secret Management
- **Environment Variables**: Basic secret storage
- **HashiCorp Vault**: Enterprise secret management
- **AWS Secrets Manager**: AWS secret storage
- **Azure Key Vault**: Azure secret storage
- **Kubernetes Secrets**: Container orchestration secrets

## Quality Gates

Quality gates are automated checkpoints that prevent low-quality code from progressing through the pipeline.

### Code Quality Metrics
- **Code Coverage**: Percentage of code covered by tests
- **Cyclomatic Complexity**: Measure of code complexity
- **Technical Debt**: Accumulated shortcuts and suboptimal solutions
- **Code Duplication**: Repeated code patterns
- **Security Vulnerabilities**: Known security issues

### SonarQube Integration
```yaml
# .sonarqube.yml
sonar.projectKey=myapp
sonar.projectName=My Application
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=tests
sonar.test.exclusions=**/*.spec.ts

sonar.coverage.exclusions=**/*.spec.ts,**/node_modules/**
sonar.typescript.lcov.reportPaths=coverage/lcov.info

# Quality Gates
sonar.qualitygate.wait=true
```

## Monitoring and Observability

### Three Pillars of Observability

#### Metrics
- **Application Metrics**: Response time, throughput, error rate
- **Infrastructure Metrics**: CPU, memory, disk, network
- **Business Metrics**: User signups, revenue, feature usage

#### Logs
- **Structured Logging**: JSON format for parsing
- **Centralized Logging**: ELK Stack, Splunk, CloudWatch
- **Log Levels**: ERROR, WARN, INFO, DEBUG
- **Correlation IDs**: Track requests across services

#### Traces
- **Distributed Tracing**: Track requests across microservices
- **Span**: Individual operation within a trace
- **Tools**: Jaeger, Zipkin, AWS X-Ray

### Alerting Strategy
```yaml
# Prometheus Alert Rules
groups:
- name: application
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      
  - alert: HighLatency
    expr: http_request_duration_seconds{quantile="0.95"} > 0.5
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "High latency detected"
```

## CI/CD Security

### Security Best Practices

1. **Secure Code Scanning**: SAST tools (SonarQube, Checkmarx)
2. **Dependency Scanning**: Check for vulnerable dependencies
3. **Container Scanning**: Scan Docker images for vulnerabilities
4. **Secret Scanning**: Prevent secrets in code repositories
5. **Infrastructure Scanning**: IaC security analysis
6. **Runtime Security**: Monitor running applications

### DevSecOps Integration
```yaml
# Security Pipeline Stage
security:
  stage: security
  script:
    - echo "Running security scans..."
    - npm audit --audit-level high
    - docker run --rm -v $(pwd):/app clair-scanner
    - sonar-scanner
    - bandit -r . # Python security linter
  allow_failure: false
```

## Troubleshooting CI/CD Pipelines

### Common Issues

#### Build Failures
- **Dependency Issues**: Missing or incompatible packages
- **Environment Differences**: Dev vs. CI environment mismatches
- **Resource Constraints**: Insufficient CPU/memory
- **Network Issues**: External service dependencies

#### Test Failures
- **Flaky Tests**: Non-deterministic test behavior
- **Test Data Issues**: Inconsistent test data
- **Environment Issues**: Test environment problems
- **Timing Issues**: Race conditions in tests

#### Deployment Failures
- **Configuration Issues**: Wrong environment variables
- **Permission Problems**: Insufficient deployment permissions
- **Resource Constraints**: Target environment limitations
- **Network Connectivity**: Cannot reach deployment targets

### Debugging Strategies

1. **Detailed Logging**: Enable verbose logging in pipelines
2. **Artifact Preservation**: Save build artifacts for analysis
3. **Environment Replication**: Reproduce issues locally
4. **Incremental Changes**: Small, focused commits
5. **Pipeline Monitoring**: Track pipeline performance metrics

## Next Steps

Understanding CI/CD concepts prepares you for:
- Implementing automated pipelines with Jenkins
- Setting up GitHub Actions workflows
- Configuring deployment strategies
- Implementing monitoring and alerting
- Building secure DevOps practices

The next step will put these CI/CD concepts into practice with Jenkins!',
  8,
  'reading',
  60,
  ARRAY['docker-lab']::UUID[],
  false
),
(
  'jenkins-lab',
  'devops-roadmap',
  'Jenkins Pipeline Lab',
  'Build automated CI/CD pipelines with Jenkins',
  'Hands-on practice with Jenkins to create automated CI/CD pipelines, configure build jobs, implement testing stages, and deploy applications.',
  9,
  'lab',
  150,
  ARRAY['ci-cd-concepts']::UUID[],
  false
),
(
  'cloud-platforms',
  'devops-roadmap',
  'Cloud Platforms Overview',
  'AWS, Azure, and GCP comparison and basics',
  '# Cloud Platforms Overview

Cloud computing has revolutionized how we build, deploy, and scale applications. Understanding major cloud platforms is essential for modern DevOps practices.

## What is Cloud Computing?

Cloud computing delivers computing services over the internet, including:
- **Compute**: Virtual machines, containers, serverless functions
- **Storage**: Object storage, databases, file systems
- **Networking**: Virtual networks, load balancers, CDNs
- **Security**: Identity management, encryption, compliance
- **Analytics**: Data processing, machine learning, business intelligence

## Cloud Service Models

### Infrastructure as a Service (IaaS)
- **Definition**: Virtualized computing resources over the internet
- **Examples**: EC2, Azure VMs, Google Compute Engine
- **Use Cases**: Lift-and-shift migrations, custom environments
- **Responsibility**: You manage OS, runtime, applications

### Platform as a Service (PaaS)
- **Definition**: Platform for developing and deploying applications
- **Examples**: Elastic Beanstalk, Azure App Service, Google App Engine
- **Use Cases**: Web applications, API development
- **Responsibility**: You manage applications and data

### Software as a Service (SaaS)
- **Definition**: Complete software applications delivered over internet
- **Examples**: Office 365, Salesforce, Google Workspace
- **Use Cases**: Business applications, productivity tools
- **Responsibility**: Provider manages everything

### Function as a Service (FaaS) / Serverless
- **Definition**: Event-driven compute service
- **Examples**: AWS Lambda, Azure Functions, Google Cloud Functions
- **Use Cases**: Event processing, microservices, automation
- **Responsibility**: You manage code only

## Major Cloud Providers

### Amazon Web Services (AWS)
- **Market Leader**: Largest cloud provider (~32% market share)
- **Launch**: 2006
- **Strengths**: Mature services, extensive documentation, large ecosystem
- **Global Reach**: 26+ regions, 84+ availability zones

### Microsoft Azure
- **Market Position**: Second largest (~21% market share)
- **Launch**: 2010
- **Strengths**: Enterprise integration, hybrid cloud, Windows ecosystem
- **Global Reach**: 60+ regions worldwide

### Google Cloud Platform (GCP)
- **Market Position**: Third largest (~9% market share)
- **Launch**: 2008
- **Strengths**: Data analytics, AI/ML, Kubernetes, competitive pricing
- **Global Reach**: 27+ regions, 82+ zones

## AWS Core Services

### Compute Services
```
EC2 (Elastic Compute Cloud)
├── Instance Types: t3, m5, c5, r5, etc.
├── Auto Scaling Groups
├── Elastic Load Balancer (ALB, NLB, CLB)
└── Amazon Machine Images (AMI)

ECS (Elastic Container Service)
├── Fargate (Serverless containers)
├── EC2 Launch Type
└── Service Discovery

EKS (Elastic Kubernetes Service)
├── Managed Control Plane
├── Worker Nodes (EC2/Fargate)
└── Add-ons (CNI, CSI, etc.)

Lambda (Serverless Functions)
├── Event Sources (API Gateway, S3, etc.)
├── Runtime Support (Node.js, Python, Java, etc.)
└── Layers and Extensions
```

### Storage Services
```
S3 (Simple Storage Service)
├── Storage Classes: Standard, IA, Glacier
├── Versioning and Lifecycle Policies
├── Static Website Hosting
└── Cross-Region Replication

EBS (Elastic Block Store)
├── Volume Types: gp3, io2, st1, sc1
├── Snapshots and Encryption
└── Multi-Attach Support

EFS (Elastic File System)
├── NFS-compatible
├── Automatic Scaling
└── Performance Modes
```

### Database Services
```
RDS (Relational Database Service)
├── Engines: MySQL, PostgreSQL, Oracle, SQL Server
├── Multi-AZ Deployments
├── Read Replicas
└── Automated Backups

DynamoDB (NoSQL Database)
├── Serverless and On-Demand
├── Global Tables
├── Streams and Triggers
└── DAX (In-Memory Cache)

ElastiCache
├── Redis and Memcached
├── Cluster Mode
└── Backup and Restore
```

### Networking Services
```
VPC (Virtual Private Cloud)
├── Subnets (Public/Private)
├── Internet Gateway
├── NAT Gateway/Instance
├── Route Tables
├── Security Groups
├── Network ACLs
└── VPC Peering

CloudFront (CDN)
├── Edge Locations
├── Origin Shield
├── Lambda@Edge
└── Real-time Logs

Route 53 (DNS)
├── Hosted Zones
├── Health Checks
├── Traffic Policies
└── Resolver
```

## Azure Core Services

### Compute Services
```
Virtual Machines
├── VM Scale Sets
├── Availability Sets
├── Azure Spot Instances
└── Dedicated Hosts

Container Services
├── Container Instances (ACI)
├── Kubernetes Service (AKS)
├── Container Registry (ACR)
└── Container Apps

App Service
├── Web Apps
├── API Apps
├── Function Apps
└── Logic Apps

Azure Functions (Serverless)
├── Consumption Plan
├── Premium Plan
└── Dedicated Plan
```

### Storage Services
```
Storage Accounts
├── Blob Storage (Hot, Cool, Archive)
├── File Storage (SMB/NFS)
├── Queue Storage
└── Table Storage

Managed Disks
├── Standard/Premium SSD
├── Ultra Disk
└── Disk Encryption

Azure NetApp Files
├── High-performance NFS
├── Snapshots
└── Cross-region Replication
```

### Database Services
```
SQL Database
├── Single Database
├── Elastic Pool
├── Managed Instance
└── SQL Data Warehouse

Cosmos DB (NoSQL)
├── Multi-model Database
├── Global Distribution
├── Multiple APIs (SQL, MongoDB, etc.)
└── Serverless Option

Database for MySQL/PostgreSQL
├── Single Server
├── Flexible Server
└── Hyperscale (Citus)
```

## Google Cloud Platform Core Services

### Compute Services
```
Compute Engine
├── Machine Types (Standard, High-memory, etc.)
├── Preemptible Instances
├── Managed Instance Groups
└── Load Balancers

Google Kubernetes Engine (GKE)
├── Autopilot Mode
├── Standard Mode
├── Private Clusters
└── Workload Identity

Cloud Run (Serverless Containers)
├── Fully Managed
├── Cloud Run for Anthos
└── Automatic Scaling

Cloud Functions (Serverless)
├── HTTP Functions
├── Background Functions
└── Cloud Events
```

### Storage Services
```
Cloud Storage
├── Storage Classes: Standard, Nearline, Coldline, Archive
├── Uniform Bucket-level Access
├── Object Lifecycle Management
└── Transfer Service

Persistent Disk
├── Standard/SSD Persistent Disks
├── Regional Persistent Disks
└── Local SSDs

Filestore
├── High-performance NFS
├── Basic/High-scale Tiers
└── Backup Service
```

### Database Services
```
Cloud SQL
├── MySQL, PostgreSQL, SQL Server
├── High Availability
├── Read Replicas
└── Automatic Backups

Firestore (NoSQL)
├── Native Mode
├── Datastore Mode
├── Real-time Updates
└── Offline Support

BigQuery (Data Warehouse)
├── Serverless Analytics
├── ML Integration
├── Streaming Inserts
└── Federated Queries
```

## Cloud Architecture Patterns

### Multi-Tier Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Presentation   │───▶│   Application   │───▶│      Data       │
│     Tier        │    │      Tier       │    │      Tier       │
│                 │    │                 │    │                 │
│ • Web Servers   │    │ • App Servers   │    │ • Databases     │
│ • Load Balancer │    │ • Business Logic│    │ • File Storage  │
│ • CDN           │    │ • APIs          │    │ • Cache         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Microservices Architecture
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Service A  │    │   Service B  │    │   Service C  │
│              │    │              │    │              │
│ ┌──────────┐ │    │ ┌──────────┐ │    │ ┌──────────┐ │
│ │    App   │ │    │ │    App   │ │    │ │    App   │ │
│ └──────────┘ │    │ └──────────┘ │    │ └──────────┘ │
│ ┌──────────┐ │    │ ┌──────────┐ │    │ ┌──────────┐ │
│ │    DB    │ │    │ │    DB    │ │    │ │    DB    │ │
│ └──────────┘ │    │ └──────────┘ │    │ └──────────┘ │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Serverless Architecture
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│ API Gateway │───▶│  Functions  │───▶│  Services   │
│             │    │             │    │             │    │             │
│ • Web App   │    │ • Routing   │    │ • Lambda    │    │ • Database  │
│ • Mobile    │    │ • Auth      │    │ • Triggers  │    │ • Storage   │
│ • IoT       │    │ • Throttling│    │ • Scaling   │    │ • Queue     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## Cloud Cost Management

### Cost Optimization Strategies

#### Right-Sizing Resources
```bash
# AWS CLI example - analyze EC2 usage
aws ce get-cost-and-usage \
  --time-period Start=2023-01-01,End=2023-02-01 \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --group-by Type=DIMENSION,Key=SERVICE
```

#### Reserved Instances/Savings Plans
- **AWS**: Reserved Instances, Savings Plans
- **Azure**: Reserved VM Instances, Azure Hybrid Benefit
- **GCP**: Committed Use Discounts, Sustained Use Discounts

#### Auto Scaling
```yaml
# Kubernetes HPA example
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

#### Spot/Preemptible Instances
- **AWS Spot Instances**: Up to 90% savings
- **Azure Spot VMs**: Up to 90% savings  
- **GCP Preemptible VMs**: Up to 80% savings

### Cost Monitoring Tools
- **AWS**: Cost Explorer, Budgets, Cost Anomaly Detection
- **Azure**: Cost Management + Billing, Advisor
- **GCP**: Cloud Billing, Recommender, Budget Alerts

## Cloud Security

### Shared Responsibility Model
```
┌─────────────────────────────────────────────────────────────┐
│                    Customer Responsibility                   │
├─────────────────────────────────────────────────────────────┤
│ • Data Encryption                                           │
│ • Network Traffic Protection                                │
│ • Operating System Updates                                  │
│ • Identity & Access Management                              │
│ • Application Security                                      │
├─────────────────────────────────────────────────────────────┤
│                    Shared Responsibility                     │
├─────────────────────────────────────────────────────────────┤
│ • Patch Management                                          │
│ • Configuration Management                                  │
│ • Awareness & Training                                      │
├─────────────────────────────────────────────────────────────┤
│                     AWS Responsibility                       │
├─────────────────────────────────────────────────────────────┤
│ • Physical Security                                         │
│ • Infrastructure Security                                   │
│ • Network Controls                                          │
│ • Host Operating System Patching                           │
│ • Hypervisor Patching                                      │
└─────────────────────────────────────────────────────────────┘
```

### Identity and Access Management (IAM)

#### AWS IAM Example
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-bucket"
    }
  ]
}
```

#### Azure RBAC Example
```bash
# Assign role to user
az role assignment create \
  --role "Storage Blob Data Contributor" \
  --assignee user@domain.com \
  --scope "/subscriptions/{subscription-id}/resourceGroups/{resource-group}"
```

### Security Best Practices

1. **Principle of Least Privilege**: Grant minimum necessary permissions
2. **Multi-Factor Authentication**: Enable MFA for all accounts
3. **Encryption**: Encrypt data at rest and in transit
4. **Network Segmentation**: Use VPCs, subnets, and security groups
5. **Monitoring and Logging**: Enable comprehensive audit logging
6. **Regular Security Assessments**: Automated and manual security reviews
7. **Incident Response Plan**: Prepare for security incidents
8. **Compliance**: Meet regulatory requirements (GDPR, HIPAA, SOC 2)

## Cloud Migration Strategies

### The 6 R''s of Migration

#### Rehost (Lift and Shift)
- **Description**: Move applications as-is to cloud
- **Benefits**: Quick migration, minimal changes
- **Use Cases**: Legacy applications, tight timelines

#### Replatform (Lift, Tinker, and Shift)
- **Description**: Minor optimizations during migration
- **Benefits**: Some cloud benefits without major changes
- **Use Cases**: Database migrations, container adoption

#### Repurchase (Drop and Shop)
- **Description**: Replace with SaaS solutions
- **Benefits**: Reduced maintenance, modern features
- **Use Cases**: CRM, ERP, email systems

#### Refactor/Re-architect
- **Description**: Redesign applications for cloud-native
- **Benefits**: Maximum cloud benefits, scalability
- **Use Cases**: Microservices, serverless architectures

#### Retire
- **Description**: Decommission unused applications
- **Benefits**: Cost savings, reduced complexity
- **Use Cases**: Legacy systems, redundant applications

#### Retain (Revisit)
- **Description**: Keep applications on-premises
- **Benefits**: Avoid migration risks
- **Use Cases**: Compliance requirements, recent investments

## Multi-Cloud and Hybrid Cloud

### Multi-Cloud Strategy
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│     AWS     │    │    Azure    │    │     GCP     │
│             │    │             │    │             │
│ • Compute   │    │ • AI/ML     │    │ • Analytics │
│ • Storage   │    │ • Identity  │    │ • ML/AI     │
│ • Database  │    │ • Hybrid    │    │ • BigQuery  │
└─────────────┘    └─────────────┘    └─────────────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
              ┌─────────────▼─────────────┐
              │   Management Layer        │
              │ • Terraform              │
              │ • Kubernetes             │
              │ • Monitoring             │
              │ • Security               │
              └───────────────────────────┘
```

### Hybrid Cloud Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      Public Cloud                           │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│ │   Web Tier  │  │  App Tier   │  │ Cache Layer │         │
│ └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────┬───────────────────────────────────┘
                          │
              ┌───────────▼───────────┐
              │   Secure Connection   │
              │ • VPN                 │
              │ • Direct Connect      │
              │ • ExpressRoute        │
              └───────────┬───────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   On-Premises                               │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│ │  Database   │  │   Storage   │  │   Legacy    │         │
│ │   Server    │  │   Systems   │  │    Apps     │         │
│ └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Cloud Monitoring and Management

### Monitoring Services
- **AWS**: CloudWatch, X-Ray, Systems Manager
- **Azure**: Monitor, Application Insights, Log Analytics
- **GCP**: Cloud Monitoring, Cloud Logging, Cloud Trace

### Infrastructure as Code (IaC)
```hcl
# Terraform example
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              EOF
  
  tags = {
    Name = "WebServer"
    Environment = "Production"
  }
}
```

## Next Steps

Understanding cloud platforms prepares you for:
- Designing cloud-native architectures
- Implementing Infrastructure as Code
- Setting up monitoring and logging
- Configuring auto-scaling and load balancing
- Implementing security best practices
- Managing costs and optimization

The next step will explore Infrastructure as Code with Terraform!',
  10,
  'reading',
  45,
  ARRAY['jenkins-lab']::UUID[],
  false
);

-- Insert Labs
INSERT INTO labs (
  id,
  step_id,
  title,
  description,
  type,
  difficulty,
  instructions,
  initial_code,
  solution_code,
  validation_script,
  hints,
  estimated_minutes,
  environment,
  tags,
  is_public
) VALUES (
  'linux-basics-lab',
  'linux-lab',
  'Linux Command Line Essentials',
  'Master essential Linux commands including file operations, permissions, process management, and system navigation.',
  'coding',
  'beginner',
  '# Linux Command Line Essentials Lab

Welcome to the Linux Command Line Essentials lab! In this hands-on exercise, you''ll learn the fundamental commands and concepts needed to work effectively with Linux systems.

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
1. Use `pwd` to display your current directory
2. List the contents of the current directory with `ls -la`
3. Navigate to the root directory using `cd /`
4. Explore the `/etc`, `/var`, and `/home` directories

### Task 2: File Operations
1. Create a new directory called `my-lab` in your home directory
2. Create three files: `file1.txt`, `file2.txt`, and `script.sh`
3. Add some content to each file using `echo` or a text editor
4. Copy `file1.txt` to `file1-backup.txt`

### Task 3: Permissions Management
1. Check the permissions of your files using `ls -l`
2. Make `script.sh` executable using `chmod`
3. Change the permissions of `file2.txt` to read-only
4. Understand the difference between user, group, and other permissions

### Task 4: Process Management
1. List running processes with `ps aux`
2. Use `top` to monitor system resources
3. Run a background process and manage it with job control
4. Find and kill a specific process

### Task 5: Text Processing
1. Use `grep` to search for patterns in files
2. Sort file contents with `sort`
3. Count lines, words, and characters with `wc`
4. Use pipes to combine commands

## Validation

Your progress will be automatically validated as you complete each task. Look for the green checkmarks to confirm successful completion.',
  '#!/bin/bash
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
# Your commands here',
  '#!/bin/bash
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
echo "#!/bin/bash\necho ''Hello World''" > script.sh
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
cat fruits.txt | grep "a" | wc -l',
  '#!/bin/bash
# Validation script for Linux basics lab
echo "Validating lab completion..."

# Check if my-lab directory exists
if [ -d "$HOME/my-lab" ]; then
  echo "✓ Task 2: my-lab directory created"
else
  echo "✗ Task 2: my-lab directory not found"
fi

# Check if files exist
cd $HOME/my-lab 2>/dev/null
if [ -f "file1.txt" ] && [ -f "file2.txt" ] && [ -f "script.sh" ]; then
  echo "✓ Task 2: Required files created"
else
  echo "✗ Task 2: Not all required files found"
fi

# Check script permissions
if [ -x "script.sh" ]; then
  echo "✓ Task 3: script.sh is executable"
else
  echo "✗ Task 3: script.sh is not executable"
fi

echo "Validation complete!"',
  ARRAY['Use ''man command'' to get help for any Linux command', 'The ''ls -la'' command shows detailed file information including permissions', 'File permissions are represented as rwx (read, write, execute) for user, group, and others', 'Use ''chmod +x filename'' to make a file executable', 'The ''&'' symbol runs a command in the background', 'Pipes (|) allow you to connect the output of one command to the input of another'],
  90,
  '{"type": "docker", "image": "ubuntu:20.04", "ports": [22], "resources": {"cpu": "0.5", "memory": "1Gi"}}',
  ARRAY['linux', 'bash', 'command-line', 'system-admin'],
  true
),
(
  'docker-basics-lab',
  'docker-lab',
  'Docker Containerization Lab',
  'Learn to build, run, and manage Docker containers. Create Dockerfiles, work with images, and understand container networking.',
  'coding',
  'intermediate',
  '# Docker Containerization Lab

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
4. Create a multi-container application',
  '# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Your Dockerfile instructions here

EXPOSE 3000

CMD ["npm", "start"]',
  '# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]',
  '#!/bin/bash
echo "Validating Docker lab..."
# Add validation logic here
echo "Validation complete!"',
  ARRAY['Use ''docker run'' to start a container', 'The ''-d'' flag runs containers in detached mode', 'Use ''docker build -t name:tag .'' to build images', 'Volumes persist data outside containers'],
  120,
  '{"type": "docker", "image": "docker:dind", "ports": [2375, 8080], "resources": {"cpu": "1", "memory": "2Gi"}}',
  ARRAY['docker', 'containers', 'devops', 'microservices'],
  true
),
(
  'jenkins-pipeline-lab',
  'jenkins-lab',
  'Jenkins CI/CD Pipeline',
  'Build automated CI/CD pipelines with Jenkins. Learn pipeline as code, automated testing, and deployment strategies.',
  'coding',
  'intermediate',
  '# Jenkins CI/CD Pipeline Lab

Build comprehensive CI/CD pipelines using Jenkins with pipeline as code, automated testing, and deployment automation.

## Learning Objectives
- Create Jenkins pipelines using Jenkinsfile
- Implement automated testing in pipelines
- Configure deployment strategies
- Handle pipeline failures and notifications
- Integrate with version control systems

## Tasks
1. Create a basic Jenkins pipeline
2. Add automated testing stages
3. Implement deployment stages
4. Configure notifications and error handling',
  'pipeline {
    agent any
    
    stages {
        stage(''Build'') {
            steps {
                // Your build steps here
            }
        }
        
        stage(''Test'') {
            steps {
                // Your test steps here
            }
        }
        
        stage(''Deploy'') {
            steps {
                // Your deployment steps here
            }
        }
    }
}',
  'pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "myapp:${BUILD_NUMBER}"
    }
    
    stages {
        stage(''Checkout'') {
            steps {
                checkout scm
            }
        }
        
        stage(''Build'') {
            steps {
                sh ''npm install''
                sh ''npm run build''
            }
        }
        
        stage(''Test'') {
            parallel {
                stage(''Unit Tests'') {
                    steps {
                        sh ''npm test''
                    }
                }
                
                stage(''Security Scan'') {
                    steps {
                        sh ''npm audit''
                    }
                }
            }
        }
        
        stage(''Build Docker Image'') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        
        stage(''Deploy'') {
            when {
                branch ''main''
            }
            steps {
                sh "docker run -d --name app ${DOCKER_IMAGE}"
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            mail to: ''team@company.com'',
                 subject: "Pipeline Failed: ${env.JOB_NAME}",
                 body: "Build ${env.BUILD_NUMBER} failed"
        }
    }
}',
  '#!/bin/bash
echo "Validating Jenkins pipeline..."
# Add validation logic here
echo "Validation complete!"',
  ARRAY['Use ''pipeline'' block to define Jenkins pipeline as code', 'Parallel stages can run simultaneously to speed up builds', 'Use ''when'' conditions to control stage execution', 'Post actions run after pipeline completion'],
  150,
  '{"type": "kubernetes", "resources": {"cpu": "1", "memory": "2Gi"}}',
  ARRAY['jenkins', 'ci-cd', 'automation', 'pipeline'],
  true
);

-- Insert Resources
INSERT INTO resources (step_id, title, type, url, description) VALUES
('devops-intro', 'What is DevOps?', 'link', 'https://aws.amazon.com/devops/what-is-devops/', 'Comprehensive introduction to DevOps culture and practices'),
('devops-intro', 'DevOps Culture Guide', 'document', 'https://docs.google.com/document/d/devops-culture', 'Guide to building DevOps culture in organizations'),

('git-fundamentals', 'Git Basics Tutorial', 'video', 'https://www.youtube.com/watch?v=git-basics', 'Video tutorial covering Git fundamentals'),
('git-fundamentals', 'Git Branching Strategies', 'document', 'https://nvie.com/posts/a-successful-git-branching-model/', 'Popular Git branching model explanation'),
('git-fundamentals', 'Pro Git Book', 'book', 'https://git-scm.com/book', 'Complete Git reference book'),

('linux-fundamentals', 'Linux Command Line', 'link', 'https://linuxcommand.org/', 'Comprehensive Linux command line tutorial'),
('linux-fundamentals', 'System Administration Guide', 'document', 'https://docs.redhat.com/sysadmin', 'Red Hat system administration documentation'),

('networking-fundamentals', 'Networking Basics', 'video', 'https://www.youtube.com/watch?v=networking-basics', 'Video series on networking fundamentals'),
('networking-fundamentals', 'TCP/IP Protocol Guide', 'document', 'https://www.rfc-editor.org/rfc/rfc793.html', 'Official TCP specification'),

('docker-fundamentals', 'Docker Documentation', 'link', 'https://docs.docker.com/', 'Official Docker documentation'),
('docker-fundamentals', 'Docker Best Practices', 'document', 'https://docs.docker.com/develop/best-practices/', 'Docker development best practices'),

('ci-cd-concepts', 'CI/CD Pipeline Guide', 'video', 'https://www.youtube.com/watch?v=cicd-pipeline', 'Comprehensive CI/CD pipeline tutorial'),
('ci-cd-concepts', 'DevOps Best Practices', 'document', 'https://aws.amazon.com/devops/best-practices/', 'AWS DevOps best practices guide'),

('cloud-platforms', 'AWS Getting Started', 'link', 'https://aws.amazon.com/getting-started/', 'AWS getting started resources'),
('cloud-platforms', 'Azure Fundamentals', 'link', 'https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/', 'Microsoft Azure fundamentals learning path'),
('cloud-platforms', 'Google Cloud Basics', 'link', 'https://cloud.google.com/docs/get-started', 'Google Cloud getting started guide');