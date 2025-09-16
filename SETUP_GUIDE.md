# SkillPath Platform Setup Guide

This guide will help you set up the SkillPath learning platform with the DevOps roadmap and hands-on labs.

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ and npm 9+
- Git
- A Supabase account
- A Clerk account

### 2. Clone and Install

```bash
git clone <your-repository-url>
cd skillpath-platform
npm install
```

### 3. Set Up Supabase Database

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database setup script** in your Supabase SQL editor:
   - Copy the contents of each migration file and run them in order:
   - `database/migrations/001_initial_schema.sql`
   - `database/migrations/002_rls_policies.sql`
   - `database/migrations/003_functions.sql`
   - `database/seed/001_badges.sql`
   - `database/seed/002_ai_prompts.sql`
   - `database/seed/003_devops_roadmap.sql`

3. **Get your Supabase credentials**:
   - Project URL: Found in Project Settings → API
   - Anon Key: Found in Project Settings → API
   - Service Role Key: Found in Project Settings → API

### 4. Set Up Clerk Authentication

1. **Create a Clerk application** at [clerk.com](https://clerk.com)

2. **Configure authentication methods** (email, social logins, etc.)

3. **Get your Clerk credentials**:
   - Publishable Key: Found in API Keys
   - Secret Key: Found in API Keys

4. **Set up webhooks** (optional but recommended):
   - Endpoint URL: `https://your-domain.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
   - Get the webhook secret from Clerk dashboard

### 5. Configure Environment Variables

Create `.env.local` in `packages/web/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 6. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your platform!

## 📚 What's Included

### DevOps Roadmap
A comprehensive learning path covering:

1. **Introduction to DevOps** - Culture and practices
2. **Version Control with Git** - Collaboration workflows
3. **Linux Fundamentals** - Essential system administration
4. **Linux Command Line Lab** - Hands-on practice
5. **Networking Fundamentals** - TCP/IP, DNS, HTTP/HTTPS
6. **Docker Fundamentals** - Containerization concepts
7. **Docker Hands-on Lab** - Container practice
8. **CI/CD Concepts** - Automation principles
9. **Jenkins Pipeline Lab** - Build automation
10. **Cloud Platforms Overview** - AWS, Azure, GCP basics

### Interactive Labs
- **Linux Command Line Lab**: Practice essential Linux commands
- **Docker Containerization Lab**: Build and manage containers
- **Jenkins Pipeline Lab**: Create CI/CD pipelines

### Platform Features
- 🔐 **Secure Authentication** with Clerk
- 📊 **Progress Tracking** with detailed analytics
- 🏆 **Gamification** with badges and points
- 💻 **Interactive Labs** with real environments
- 📱 **Responsive Design** for all devices
- 🎯 **Structured Learning** with prerequisites

## 🎯 Using the Platform

### For Learners

1. **Sign Up**: Create an account using email or social login
2. **Browse Roadmaps**: Explore available learning paths
3. **Start Learning**: Begin with the DevOps roadmap
4. **Complete Steps**: Read content, watch videos, complete labs
5. **Track Progress**: Monitor your advancement and earn badges
6. **Practice Labs**: Use hands-on environments to build skills

### For Content Creators

1. **Create Roadmaps**: Design structured learning paths
2. **Add Steps**: Include reading, videos, labs, and quizzes
3. **Build Labs**: Create interactive coding environments
4. **Share Content**: Make roadmaps public for the community

## 🔧 Development

### Project Structure

```
packages/web/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── roadmaps/       # Roadmap pages
│   │   ├── labs/           # Lab pages
│   │   ├── dashboard/      # User dashboard
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Layout components
│   │   ├── roadmap/       # Roadmap-specific components
│   │   └── lab/           # Lab-specific components
│   ├── lib/               # Utility libraries
│   │   ├── supabase/      # Database client
│   │   └── clerk/         # Auth client
│   └── types/             # TypeScript definitions
database/
├── migrations/            # Database schema
└── seed/                 # Initial data
```

### Key Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: Tailwind CSS with custom design system

### API Routes

- `GET/POST /api/roadmaps` - Roadmap management
- `GET/PUT/DELETE /api/roadmaps/[id]` - Individual roadmaps
- `GET/POST /api/labs` - Lab management  
- `GET/PUT/DELETE /api/labs/[id]` - Individual labs
- `GET/POST /api/progress` - Progress tracking
- `GET/PUT /api/users/me` - User profile
- `POST /api/webhooks/clerk` - User synchronization

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker

```bash
# Build the application
npm run build

# Create Docker image
docker build -t skillpath-platform .

# Run container
docker run -p 3000:3000 skillpath-platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions

---

🎉 **Congratulations!** You now have a fully functional learning platform with the DevOps roadmap and interactive labs. Start learning and building your DevOps skills!