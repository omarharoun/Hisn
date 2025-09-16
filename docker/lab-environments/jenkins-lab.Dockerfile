# Jenkins Lab Environment
FROM jenkins/jenkins:lts

# Switch to root to install additional tools
USER root

# Install Docker CLI and other tools
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm for JavaScript projects
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install additional tools
RUN apt-get update && apt-get install -y \
    git \
    vim \
    nano \
    jq \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Add jenkins user to docker group
RUN usermod -aG docker jenkins

# Switch back to jenkins user
USER jenkins

# Set up Jenkins with pre-installed plugins
COPY --chown=jenkins:jenkins docker/lab-environments/jenkins-plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Create sample project structure
RUN mkdir -p /var/jenkins_home/workspace/sample-projects/node-app

# Create sample Node.js application for CI/CD practice
RUN cat > /var/jenkins_home/workspace/sample-projects/node-app/package.json << 'EOF'
{
  "name": "jenkins-lab-app",
  "version": "1.0.0",
  "description": "Sample app for Jenkins CI/CD lab",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "npm run test:unit",
    "test:unit": "echo 'Running unit tests...' && exit 0",
    "test:integration": "echo 'Running integration tests...' && exit 0",
    "lint": "echo 'Running linter...' && exit 0",
    "build": "echo 'Building application...' && mkdir -p dist && cp *.js dist/"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
EOF

RUN cat > /var/jenkins_home/workspace/sample-projects/node-app/app.js << 'EOF'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Jenkins Lab!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
EOF

# Create sample Jenkinsfile
RUN cat > /var/jenkins_home/workspace/sample-projects/node-app/Jenkinsfile << 'EOF'
pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        APP_NAME = 'jenkins-lab-app'
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                // In real scenario: checkout scm
                sh 'echo "Source code checked out successfully"'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'cd /var/jenkins_home/workspace/sample-projects/node-app && npm install'
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Running code linting...'
                sh 'cd /var/jenkins_home/workspace/sample-projects/node-app && npm run lint'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        echo 'Running unit tests...'
                        sh 'cd /var/jenkins_home/workspace/sample-projects/node-app && npm run test:unit'
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        echo 'Running integration tests...'
                        sh 'cd /var/jenkins_home/workspace/sample-projects/node-app && npm run test:integration'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'cd /var/jenkins_home/workspace/sample-projects/node-app && npm run build'
            }
        }
        
        stage('Security Scan') {
            steps {
                echo 'Running security scan...'
                sh 'cd /var/jenkins_home/workspace/sample-projects/node-app && npm audit --audit-level high'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                sh '''
                    echo "Starting deployment to staging..."
                    echo "Application deployed successfully to staging"
                    echo "Staging URL: http://staging.example.com"
                '''
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                echo 'Deploying to production environment...'
                sh '''
                    echo "Starting deployment to production..."
                    echo "Application deployed successfully to production"
                    echo "Production URL: http://example.com"
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
EOF

# Create sample Docker-based pipeline
RUN cat > /var/jenkins_home/workspace/sample-projects/node-app/Jenkinsfile.docker << 'EOF'
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'localhost:5000'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    sh '''
                        cd /var/jenkins_home/workspace/sample-projects/node-app
                        docker build -t ${DOCKER_IMAGE} .
                    '''
                }
            }
        }
        
        stage('Test Docker Image') {
            steps {
                script {
                    echo 'Testing Docker image...'
                    sh '''
                        docker run --rm ${DOCKER_IMAGE} npm test
                    '''
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    echo 'Pushing image to registry...'
                    sh '''
                        docker tag ${DOCKER_IMAGE} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}
                        # docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}
                        echo "Image pushed successfully"
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying containerized application...'
                    sh '''
                        docker run -d --name ${APP_NAME}-${BUILD_NUMBER} -p 3000:3000 ${DOCKER_IMAGE}
                        echo "Container deployed successfully"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
EOF

# Create Dockerfile for the sample app
RUN cat > /var/jenkins_home/workspace/sample-projects/node-app/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
EOF

# Create lab instructions
RUN cat > /var/jenkins_home/workspace/LAB_INSTRUCTIONS.md << 'EOF'
# Jenkins CI/CD Pipeline Lab

Welcome to the Jenkins hands-on lab! This environment includes a pre-configured Jenkins instance with sample projects.

## Getting Started

1. **Access Jenkins**
   - Open http://localhost:8080 in your browser
   - Use the initial admin password shown in the logs
   - Complete the setup wizard

2. **Sample Projects**
   - Navigate to `/var/jenkins_home/workspace/sample-projects/`
   - Explore the `node-app/` directory
   - Review the `Jenkinsfile` for pipeline configuration

## Lab Tasks

### Task 1: Create Your First Pipeline
1. Create a new Pipeline job in Jenkins
2. Use the sample Jenkinsfile from the node-app project
3. Run the pipeline and observe the stages

### Task 2: Parallel Execution
1. Modify the pipeline to run tests in parallel
2. Add additional test stages
3. Observe the execution time improvements

### Task 3: Docker Integration
1. Use the `Jenkinsfile.docker` for containerized builds
2. Build and test Docker images in the pipeline
3. Implement container deployment

### Task 4: Pipeline as Code
1. Create a multi-branch pipeline
2. Configure webhooks for automatic triggers
3. Implement different deployment strategies for different branches

## Available Tools
- Jenkins with common plugins pre-installed
- Docker CLI for container operations
- Node.js and npm for JavaScript projects
- Git for version control
- Various build and testing tools

## Tips
- Use the Blue Ocean plugin for better pipeline visualization
- Check the Jenkins logs for troubleshooting
- Use pipeline syntax generator for complex pipeline steps
- Implement proper error handling and notifications

Happy building! 🚀
EOF

# Expose Jenkins port
EXPOSE 8080 50000

# Set Jenkins home
ENV JENKINS_HOME=/var/jenkins_home

# Start Jenkins
ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]