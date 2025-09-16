# SkillPath Platform

A comprehensive learning platform for software development and IP networking with interactive roadmaps, hands-on labs, and AI-driven insights.

## 🚀 Features

- **Structured Roadmaps**: Follow expertly crafted learning paths for software development and IP networking
- **Hands-on Labs**: Practice with real coding environments and networking simulations
- **Interview Prep**: Master technical interviews with comprehensive question library
- **AI-Driven Insights**: Stay ahead with trend analysis and personalized recommendations
- **Live Environments**: Spin up Docker containers and Kubernetes clusters on-demand
- **Gamification**: Earn badges, climb leaderboards, and track progress

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Authentication**: Clerk for secure user management
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Infrastructure**: Docker-in-Docker on Kubernetes for lab environments
- **AI**: OpenAI integration for trend analysis and content generation
- **Monitoring**: Prometheus and Grafana for system health

## 📦 Monorepo Structure

```
├── packages/
│   └── web/                 # Next.js frontend application
├── database/
│   ├── migrations/          # Database schema migrations
│   └── seed/               # Initial data seeds
├── docs/                   # Documentation
└── scripts/                # Build and deployment scripts
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- Kubernetes cluster (for lab environments)

### 1. Clone and Install

```bash
git clone <repository-url>
cd skillpath-platform
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
cd packages/web
cp .env.local.example .env.local
```

Configure the following environment variables:

#### Clerk Authentication
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Add your keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

#### Supabase Database
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### OpenAI (Optional)
```env
OPENAI_API_KEY=your_openai_api_key
```

### 3. Database Setup

1. Run the migrations in your Supabase SQL editor:
   - Execute `database/migrations/001_initial_schema.sql`
   - Execute `database/migrations/002_rls_policies.sql`
   - Execute `database/migrations/003_functions.sql`

2. Seed initial data:
   - Execute `database/seed/001_badges.sql`
   - Execute `database/seed/002_ai_prompts.sql`

### 4. Configure Clerk Webhooks

1. In your Clerk dashboard, go to Webhooks
2. Add a webhook endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`
4. Add the webhook secret to your environment variables

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Deployment

### Vercel (Recommended for Frontend)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Docker

```bash
# Build the application
npm run build

# Build Docker image
docker build -t skillpath-platform .

# Run container
docker run -p 3000:3000 skillpath-platform
```

### Kubernetes Lab Environment

For hands-on labs, you'll need a Kubernetes cluster:

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Configure Docker-in-Docker for labs
kubectl apply -f k8s/lab-runner/
```

## 📊 Monitoring

Set up monitoring with Prometheus and Grafana:

```bash
# Deploy monitoring stack
kubectl apply -f monitoring/prometheus/
kubectl apply -f monitoring/grafana/
```

Access dashboards:
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📝 API Documentation

The API is built with Next.js API routes and follows RESTful conventions:

- `GET /api/roadmaps` - List roadmaps
- `POST /api/roadmaps` - Create roadmap
- `GET /api/roadmaps/[id]` - Get roadmap details
- `PUT /api/roadmaps/[id]` - Update roadmap
- `DELETE /api/roadmaps/[id]` - Delete roadmap

Similar patterns for `/api/labs`, `/api/questions`, `/api/progress`, etc.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Documentation: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/your-org/skillpath-platform/issues)
- Discord: [Join our community](https://discord.gg/skillpath)

## 🗺️ Roadmap

- [x] Core platform with authentication
- [x] Roadmap and lab management
- [x] Progress tracking and gamification
- [ ] Docker-in-Docker lab environments
- [ ] AI-powered content generation
- [ ] Community features and contributions
- [ ] Mobile application
- [ ] Enterprise SSO integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

Built with ❤️ by the SkillPath team