# SkillPath Lab Environments

This directory contains Docker configurations for hands-on lab environments used in the SkillPath learning platform.

## Available Lab Environments

### 1. Linux Basics Lab
- **Image**: Ubuntu 20.04 with essential tools
- **Purpose**: Practice Linux command line operations
- **Tools**: vim, git, htop, curl, networking tools
- **User**: `labuser` with sudo access

### 2. Docker Lab
- **Image**: Docker-in-Docker (DinD) with development tools
- **Purpose**: Learn Docker containerization
- **Tools**: Docker CLI, Node.js, Python, sample applications
- **Features**: Build and run containers within the lab

### 3. Jenkins Lab
- **Image**: Jenkins LTS with CI/CD plugins
- **Purpose**: Build automated CI/CD pipelines
- **Tools**: Jenkins, Docker CLI, Node.js, Git
- **Features**: Pre-configured pipelines and sample projects

## Quick Start

### Run Individual Labs

```bash
# Linux Basics Lab
docker-compose -f docker-compose.labs.yml --profile linux up -d linux-lab
docker exec -it skillpath-linux-lab bash

# Docker Lab
docker-compose -f docker-compose.labs.yml --profile docker up -d docker-lab
docker exec -it skillpath-docker-lab bash

# Jenkins Lab
docker-compose -f docker-compose.labs.yml --profile jenkins up -d jenkins-lab
# Access Jenkins at http://localhost:8080 (admin/admin123)
```

### Run All Labs

```bash
# Start all lab environments
docker-compose -f docker-compose.labs.yml --profile all up -d

# Check running labs
docker-compose -f docker-compose.labs.yml ps
```

## Lab Environment Details

### Linux Basics Lab Environment

**Access**: `docker exec -it skillpath-linux-lab bash`

**Pre-installed Tools**:
- Text editors: vim, nano
- Network tools: curl, wget, ping, traceroute
- System tools: htop, tree, git
- Development: git, jq

**Sample Files**:
- `~/README.txt` - Welcome message
- `~/fruits.txt` - Sample data for text processing
- `~/employees.csv` - CSV data for practice

**Lab Tasks**:
1. File system navigation and operations
2. File permissions and ownership
3. Process management
4. Text processing with grep, sort, awk
5. Basic shell scripting

### Docker Lab Environment

**Access**: `docker exec -it skillpath-docker-lab bash`

**Features**:
- Docker-in-Docker capability
- Sample Node.js application
- Docker Compose configuration
- Multi-container examples

**Sample Projects**:
- `~/docker-lab/sample-app/` - Node.js web application
- `~/docker-lab/docker-compose.yml` - Multi-service setup

**Lab Tasks**:
1. Basic Docker commands
2. Building custom images
3. Container networking
4. Volume management
5. Multi-container applications with Compose

### Jenkins Lab Environment

**Access**: http://localhost:8080 (admin/admin123)

**Pre-configured**:
- Essential CI/CD plugins
- Sample pipeline projects
- Docker integration
- Blue Ocean UI

**Sample Projects**:
- `/var/jenkins_home/workspace/sample-projects/node-app/`
- Pre-written Jenkinsfiles for different scenarios
- Docker-based pipeline examples

**Lab Tasks**:
1. Creating basic pipelines
2. Pipeline as Code with Jenkinsfile
3. Parallel execution
4. Docker integration
5. Multi-branch pipelines

## Managing Lab Sessions

### Start a Lab Session
```bash
# Start specific lab
docker-compose -f docker-compose.labs.yml --profile <lab-name> up -d

# Examples:
docker-compose -f docker-compose.labs.yml --profile linux up -d
docker-compose -f docker-compose.labs.yml --profile docker up -d
docker-compose -f docker-compose.labs.yml --profile jenkins up -d
```

### Stop a Lab Session
```bash
# Stop specific lab
docker-compose -f docker-compose.labs.yml --profile <lab-name> down

# Stop all labs
docker-compose -f docker-compose.labs.yml down
```

### Reset Lab Environment
```bash
# Remove containers and volumes (resets all progress)
docker-compose -f docker-compose.labs.yml down -v

# Remove specific lab volume
docker volume rm skillpath-<lab-name>-lab-home
```

## Troubleshooting

### Common Issues

**Docker-in-Docker not working**:
- Ensure Docker daemon is running
- Check if `/var/run/docker.sock` is properly mounted
- Verify privileged mode is enabled

**Permission denied errors**:
- Check if user has proper permissions
- Ensure volumes are properly mounted
- Restart container if needed

**Port conflicts**:
- Check if ports are already in use
- Modify port mappings in docker-compose.labs.yml
- Use `docker ps` to see running containers

### Useful Commands

```bash
# Check lab container status
docker-compose -f docker-compose.labs.yml ps

# View lab logs
docker-compose -f docker-compose.labs.yml logs <service-name>

# Execute commands in lab
docker exec -it skillpath-<lab-name>-lab <command>

# Clean up all lab resources
docker-compose -f docker-compose.labs.yml down -v
docker system prune -f
```

## Integration with Platform

These lab environments are designed to integrate with the SkillPath web platform:

1. **Lab Sessions**: Platform manages lab lifecycle via Docker API
2. **Progress Tracking**: Lab completion status synced with user progress
3. **Resource Management**: Automatic cleanup of idle sessions
4. **Scalability**: Kubernetes deployment for production use

## Security Considerations

- Labs run in isolated containers
- Limited resource allocation per session
- Automatic session timeouts
- No persistent network access to host system
- Regular security updates for base images

## Extending Lab Environments

To add new lab environments:

1. Create new Dockerfile in `lab-environments/`
2. Add service definition to `docker-compose.labs.yml`
3. Create lab instructions and sample projects
4. Update this README with lab details

## Production Deployment

For production use with Kubernetes:

1. Build and push images to container registry
2. Create Kubernetes manifests with resource limits
3. Implement pod lifecycle management
4. Configure network policies for isolation
5. Set up monitoring and logging

---

🧪 **Happy Learning!** These lab environments provide hands-on experience with real DevOps tools and practices.