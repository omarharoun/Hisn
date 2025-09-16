# Docker Lab Environment with Docker-in-Docker
FROM docker:24-dind

# Install additional tools
RUN apk add --no-cache \
    bash \
    curl \
    git \
    vim \
    nano \
    jq \
    nodejs \
    npm \
    python3 \
    py3-pip

# Create lab user
RUN addgroup -g 1000 labuser && \
    adduser -D -s /bin/bash -u 1000 -G labuser labuser && \
    addgroup labuser docker

# Switch to lab user
USER labuser
WORKDIR /home/labuser

# Create sample application for Docker practice
RUN mkdir -p ~/docker-lab/sample-app

# Create a simple Node.js application
RUN cat > ~/docker-lab/sample-app/package.json << 'EOF'
{
  "name": "sample-app",
  "version": "1.0.0",
  "description": "Sample Node.js app for Docker lab",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
EOF

RUN cat > ~/docker-lab/sample-app/server.js << 'EOF'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker Lab!',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Create sample Dockerfile for practice
RUN cat > ~/docker-lab/sample-app/Dockerfile << 'EOF'
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
EOF

# Create docker-compose file for multi-container practice
RUN cat > ~/docker-lab/docker-compose.yml << 'EOF'
version: '3.8'
services:
  web:
    build: ./sample-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - redis
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
EOF

# Create lab instructions
RUN cat > ~/docker-lab/README.md << 'EOF'
# Docker Lab Environment

Welcome to the Docker hands-on lab! This environment includes:

## Available Tools
- Docker CLI and Docker Daemon
- Node.js and npm
- Sample application in `sample-app/`
- Docker Compose configuration

## Lab Tasks
1. **Basic Container Operations**
   - Run your first container: `docker run hello-world`
   - Explore running containers: `docker ps`
   - Check available images: `docker images`

2. **Build Custom Images**
   - Navigate to `sample-app/`
   - Build the image: `docker build -t sample-app .`
   - Run your custom container: `docker run -p 3000:3000 sample-app`

3. **Multi-Container Applications**
   - Use Docker Compose: `docker-compose up -d`
   - Check running services: `docker-compose ps`
   - View logs: `docker-compose logs`

4. **Container Management**
   - Stop containers: `docker-compose down`
   - Clean up: `docker system prune`

## Tips
- Use `docker --help` for command help
- Check container logs: `docker logs <container-name>`
- Execute commands in containers: `docker exec -it <container-name> sh`

Happy containerizing! 🐳
EOF

# Set up bash aliases
RUN echo 'alias d="docker"' >> ~/.bashrc && \
    echo 'alias dc="docker-compose"' >> ~/.bashrc && \
    echo 'alias dps="docker ps"' >> ~/.bashrc && \
    echo 'alias di="docker images"' >> ~/.bashrc

# Add welcome message
RUN echo 'echo "🐳 Welcome to the Docker Lab Environment!"' >> ~/.bashrc && \
    echo 'echo "📁 Check out ~/docker-lab/ for sample applications"' >> ~/.bashrc && \
    echo 'echo "📚 Read ~/docker-lab/README.md for lab instructions"' >> ~/.bashrc

# Switch back to root for Docker daemon
USER root

# Expose Docker daemon port
EXPOSE 2375 2376

# Start Docker daemon
CMD ["dockerd-entrypoint.sh"]