# 🚀 Complete Deployment Guide for SkillPath Platform

This guide provides multiple deployment options for the SkillPath platform, from simple Vercel deployment to full Kubernetes infrastructure.

## 🎯 Deployment Options

### Option 1: Vercel + Supabase (Recommended for MVP)
**Best for**: Quick deployment, MVP, small to medium scale
**Cost**: $0-$20/month for starter projects
**Complexity**: Low
**Setup Time**: 30 minutes

### Option 2: AWS EKS + Terraform (Production Scale)
**Best for**: Large scale, enterprise, full control
**Cost**: $200-$2000+/month depending on usage
**Complexity**: High
**Setup Time**: 2-4 hours

### Option 3: Hybrid Approach
**Best for**: Growing projects, gradual scaling
**Cost**: $50-$500/month
**Complexity**: Medium
**Setup Time**: 1-2 hours

---

## 🌟 Option 1: Vercel + Supabase Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Supabase account (free tier available)
- Clerk account (free tier available)

### Step 1: Set Up Supabase

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Click "New Project"
   # Choose organization and project name
   # Select region (choose closest to your users)
   # Wait for project creation (2-3 minutes)
   ```

2. **Configure Database**
   ```sql
   -- In Supabase SQL Editor, run these files in order:
   -- 1. database/migrations/001_initial_schema.sql
   -- 2. database/migrations/002_rls_policies.sql  
   -- 3. database/migrations/003_functions.sql
   -- 4. database/seed/001_badges.sql
   -- 5. database/seed/002_ai_prompts.sql
   -- 6. database/seed/003_devops_roadmap.sql
   ```

3. **Get Supabase Credentials**
   ```bash
   # Go to Project Settings → API
   # Copy these values:
   # - Project URL
   # - anon public key
   # - service_role secret key
   ```

### Step 2: Set Up Clerk Authentication

1. **Create Clerk Application**
   ```bash
   # Go to https://clerk.com
   # Click "Add Application"
   # Choose authentication methods (email, Google, GitHub, etc.)
   # Configure sign-in/sign-up flows
   ```

2. **Configure Webhooks** (Optional but recommended)
   ```bash
   # In Clerk Dashboard → Webhooks
   # Add endpoint: https://your-app.vercel.app/api/webhooks/clerk
   # Select events: user.created, user.updated, user.deleted
   # Copy webhook secret
   ```

3. **Get Clerk Credentials**
   ```bash
   # In Clerk Dashboard → API Keys
   # Copy:
   # - Publishable Key
   # - Secret Key
   # - Webhook Secret (if configured)
   ```

### Step 3: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial SkillPath platform"
   git branch -M main
   git remote add origin https://github.com/yourusername/skillpath-platform.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   ```bash
   # Go to https://vercel.com
   # Click "New Project"
   # Import your GitHub repository
   # Configure build settings:
   # - Framework Preset: Next.js
   # - Root Directory: packages/web
   # - Build Command: npm run build
   # - Output Directory: .next
   ```

3. **Configure Environment Variables**
   ```bash
   # In Vercel Dashboard → Settings → Environment Variables
   # Add these variables for all environments (Production, Preview, Development):
   ```

   | Variable | Value | Description |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Clerk publishable key |
   | `CLERK_SECRET_KEY` | `sk_test_...` | Clerk secret key |
   | `CLERK_WEBHOOK_SECRET` | `whsec_...` | Clerk webhook secret |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase service role key |
   | `OPENAI_API_KEY` | `sk-...` | OpenAI API key (optional) |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your app URL |

4. **Deploy**
   ```bash
   # Vercel will automatically deploy on git push
   # First deployment might take 2-3 minutes
   # Check deployment logs for any issues
   ```

### Step 4: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   ```bash
   # In Vercel Dashboard → Settings → Domains
   # Add your custom domain
   # Configure DNS records as instructed
   ```

2. **Update Environment Variables**
   ```bash
   # Update NEXT_PUBLIC_APP_URL to your custom domain
   # Update Clerk allowed origins to include your domain
   ```

### Step 5: Set Up Lab Environments (Optional)

For lab environments, you have several options:

#### Option A: Docker Hub + Fly.io
```bash
# Build and push lab images
docker build -f docker/lab-environments/linux-basics.Dockerfile -t skillpath/linux-lab .
docker push skillpath/linux-lab

# Deploy to Fly.io for on-demand lab sessions
fly launch --image skillpath/linux-lab
```

#### Option B: Railway
```bash
# Deploy lab environments to Railway
railway login
railway new skillpath-labs
railway deploy
```

#### Option C: Digital Ocean App Platform
```bash
# Use Digital Ocean for lab container hosting
# Configure auto-scaling based on demand
```

---

## 🏗️ Option 2: AWS EKS + Terraform (Production Scale)

### Prerequisites
- AWS account with appropriate permissions
- Terraform Cloud account (or local state management)
- kubectl installed
- AWS CLI configured

### Step 1: Prepare AWS Account

1. **Create IAM User for Terraform**
   ```bash
   # Create IAM user with these policies:
   # - AmazonEKSClusterPolicy
   # - AmazonEKSWorkerNodePolicy
   # - AmazonEKS_CNI_Policy
   # - AmazonEC2ContainerRegistryReadOnly
   # - EC2FullAccess
   # - IAMFullAccess
   # - VPCFullAccess
   ```

2. **Configure AWS CLI**
   ```bash
   aws configure
   # Enter Access Key ID and Secret Access Key
   # Set default region (e.g., us-west-2)
   ```

3. **Create S3 Bucket for Terraform State**
   ```bash
   aws s3 mb s3://skillpath-terraform-state-dev --region us-west-2
   aws s3 mb s3://skillpath-terraform-state-staging --region us-west-2
   aws s3 mb s3://skillpath-terraform-state-prod --region us-west-2
   
   # Create DynamoDB table for state locking
   aws dynamodb create-table \
     --table-name skillpath-terraform-locks \
     --attribute-definitions AttributeName=LockID,AttributeType=S \
     --key-schema AttributeName=LockID,KeyType=HASH \
     --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
     --region us-west-2
   ```

### Step 2: Deploy Infrastructure

1. **Initialize Terraform**
   ```bash
   cd terraform/environments/dev
   terraform init
   ```

2. **Configure Variables**
   ```bash
   # Create terraform.tfvars
   cat > terraform.tfvars << EOF
   supabase_url = "https://your-project.supabase.co"
   supabase_anon_key = "your-anon-key"
   clerk_publishable_key = "your-clerk-key"
   openai_api_key = "your-openai-key"
   EOF
   ```

3. **Deploy Development Environment**
   ```bash
   terraform plan
   terraform apply
   
   # Get kubectl config
   aws eks update-kubeconfig --region us-west-2 --name skillpath-dev
   ```

4. **Deploy Application to Kubernetes**
   ```bash
   # Update image in k8s/base/deployment.yaml
   # Apply Kubernetes manifests
   kubectl apply -f k8s/base/
   
   # Check deployment status
   kubectl get pods
   kubectl get services
   kubectl get ingress
   ```

### Step 3: Set Up CI/CD

1. **Configure GitHub Secrets**
   ```bash
   # In GitHub Repository → Settings → Secrets and Variables → Actions
   # Add these secrets:
   ```

   | Secret | Value | Description |
   |--------|-------|-------------|
   | `AWS_ACCESS_KEY_ID` | `AKIA...` | AWS access key |
   | `AWS_SECRET_ACCESS_KEY` | `xxx...` | AWS secret key |
   | `TF_API_TOKEN` | `xxx...` | Terraform Cloud token |
   | `DEV_SUPABASE_URL` | `https://...` | Dev Supabase URL |
   | `STAGING_SUPABASE_URL` | `https://...` | Staging Supabase URL |
   | `PROD_SUPABASE_URL` | `https://...` | Production Supabase URL |
   | `SLACK_WEBHOOK_URL` | `https://...` | Slack notifications |

2. **Test CI/CD Pipeline**
   ```bash
   # Push changes to trigger pipeline
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   
   # Check GitHub Actions tab for pipeline status
   ```

---

## 🔄 Option 3: Hybrid Approach

### Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Vercel      │    │    Supabase     │    │   Docker Hub    │
│   (Frontend)    │───▶│   (Database)    │    │ (Lab Images)    │
│                 │    │                 │    │                 │
│ • Next.js App   │    │ • PostgreSQL    │    │ • Linux Labs    │
│ • Static Assets │    │ • Edge Functions│    │ • Docker Labs   │
│ • API Routes    │    │ • Real-time     │    │ • Jenkins Labs  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Railway/Fly   │
                       │  (Lab Runtime)  │
                       │                 │
                       │ • On-demand     │
                       │ • Auto-scaling  │
                       │ • Cost-effective│
                       └─────────────────┘
```

### Implementation
1. **Frontend**: Deploy to Vercel (same as Option 1)
2. **Database**: Use Supabase (same as Option 1)
3. **Lab Environments**: Deploy to Railway or Fly.io
4. **Monitoring**: Use Vercel Analytics + Supabase logs

---

## 📊 Cost Comparison

### Vercel + Supabase (Option 1)
```
Vercel Pro: $20/month
Supabase Pro: $25/month
Clerk Pro: $25/month
Total: ~$70/month for production-ready setup
```

### AWS EKS (Option 2)
```
EKS Cluster: $73/month
EC2 Instances (3x t3.medium): ~$95/month
Load Balancer: $18/month
Storage (EBS): $20/month
Data Transfer: $10/month
Total: ~$216/month minimum
```

### Hybrid (Option 3)
```
Vercel Pro: $20/month
Supabase Pro: $25/month
Railway/Fly.io: $15/month
Total: ~$60/month
```

## 🔧 Environment Configuration

### Development
```bash
# Local development
npm run dev

# Environment variables in .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Staging
```bash
# Vercel preview deployments
# Automatic deployment on PR creation
# Separate Supabase project for staging
# Clerk development instance
```

### Production
```bash
# Vercel production deployment
# Production Supabase project
# Clerk production instance
# Custom domain with SSL
```

## 🔍 Monitoring & Analytics

### Vercel Analytics
```bash
# Enable in Vercel dashboard
# Provides:
# - Page views and unique visitors
# - Core Web Vitals
# - Function execution metrics
# - Error tracking
```

### Supabase Monitoring
```bash
# Built-in monitoring provides:
# - Database performance
# - API usage statistics
# - Real-time connections
# - Storage usage
```

### Custom Metrics
```bash
# Application metrics endpoint
GET /api/metrics
# Returns Prometheus-format metrics for:
# - User registrations
# - Lab sessions
# - Roadmap completions
# - System health
```

## 🚀 Quick Start Deployment

### 1-Click Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/skillpath-platform&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&envDescription=Required%20environment%20variables%20for%20SkillPath%20platform&envLink=https://github.com/yourusername/skillpath-platform/blob/main/DEPLOYMENT_GUIDE.md)

### Manual Deployment Steps

1. **Fork the Repository**
   ```bash
   # Fork https://github.com/yourusername/skillpath-platform
   # Clone your fork locally
   git clone https://github.com/yourusername/skillpath-platform.git
   cd skillpath-platform
   ```

2. **Set Up Services**
   ```bash
   # 1. Create Supabase project and run migrations
   # 2. Create Clerk application
   # 3. Get API keys from both services
   ```

3. **Deploy to Vercel**
   ```bash
   # Connect repository to Vercel
   # Configure environment variables
   # Deploy automatically on push
   ```

4. **Test Deployment**
   ```bash
   # Visit your Vercel URL
   # Test sign-up/sign-in flow
   # Browse roadmaps and labs
   # Check dashboard functionality
   ```

## 🔧 Post-Deployment Configuration

### Custom Domain Setup
```bash
# 1. Add domain in Vercel dashboard
# 2. Configure DNS records:
#    - A record: @ → Vercel IP
#    - CNAME: www → your-app.vercel.app
# 3. Update Clerk allowed origins
# 4. Update CORS settings in Supabase
```

### SSL Certificate
```bash
# Vercel automatically provides SSL certificates
# For custom domains, certificates are auto-generated
# Forced HTTPS redirect is enabled by default
```

### Performance Optimization
```bash
# Enable Vercel Analytics
# Configure Supabase connection pooling
# Set up CDN for static assets
# Enable compression and caching
```

## 📈 Scaling Considerations

### When to Scale Up

**Vercel → AWS EKS Migration Triggers:**
- More than 10,000 active users
- Complex lab environments requiring Kubernetes
- Advanced monitoring and observability needs
- Enterprise security requirements
- Multi-region deployment needs

### Migration Path
```bash
# 1. Set up AWS infrastructure with Terraform
# 2. Deploy application to EKS
# 3. Migrate database (or keep Supabase)
# 4. Update DNS to point to new infrastructure
# 5. Monitor and optimize
```

## 🛡️ Security Checklist

### Pre-Deployment
- [ ] Environment variables configured securely
- [ ] Database RLS policies enabled
- [ ] Authentication properly configured
- [ ] HTTPS enforced
- [ ] CORS configured correctly

### Post-Deployment
- [ ] Security headers enabled
- [ ] Webhook signatures verified
- [ ] Database backups configured
- [ ] Monitoring and alerting set up
- [ ] Incident response plan documented

## 🆘 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Check Node.js version compatibility
# Verify all dependencies are installed
# Check for TypeScript errors
# Review build logs in Vercel dashboard
```

**Authentication Issues**
```bash
# Verify Clerk keys are correct
# Check allowed origins in Clerk dashboard
# Ensure webhook endpoints are accessible
# Test authentication flow manually
```

**Database Connection Issues**
```bash
# Verify Supabase URL and keys
# Check RLS policies
# Test database connection in Supabase dashboard
# Review API logs for detailed errors
```

**Lab Environment Issues**
```bash
# Check Docker image availability
# Verify container registry access
# Monitor resource usage and limits
# Review container logs
```

## 📞 Support Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Supabase Discord](https://supabase.com/discord)
- [Next.js Discussions](https://github.com/vercel/next.js/discussions)

### Monitoring
- Vercel Dashboard for deployment metrics
- Supabase Dashboard for database metrics
- GitHub Actions for CI/CD pipeline status
- Application `/api/health` endpoint for health checks

---

## 🎉 Success!

Once deployed, your SkillPath platform will be live with:

✅ **Professional Learning Platform** with DevOps roadmap  
✅ **Interactive Lab Environments** (with additional setup)  
✅ **Secure Authentication** and user management  
✅ **Real-time Database** with progress tracking  
✅ **Scalable Architecture** ready for growth  
✅ **Monitoring and Analytics** for insights  

**Your platform is ready to help thousands of learners master DevOps and networking skills!** 🚀

### Next Steps After Deployment
1. **Content Creation**: Add more roadmaps and labs
2. **User Testing**: Gather feedback from beta users
3. **Performance Optimization**: Monitor and optimize based on usage
4. **Feature Enhancement**: Add community features and advanced gamification
5. **Marketing**: Launch and promote your platform

**Estimated Total Setup Time: 30 minutes to 2 hours depending on chosen option** ⏰