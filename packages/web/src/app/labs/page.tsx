import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { 
  Code, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Filter,
  Search,
  Play,
  Terminal,
  Globe,
  Cpu
} from 'lucide-react'

export default function LabsPage() {
  // Mock data - in real app, this would come from API
  const labs = [
    {
      id: 'linux-basics-lab',
      title: 'Linux Command Line Essentials',
      description: 'Master essential Linux commands including file operations, permissions, process management, and system navigation.',
      type: 'coding',
      difficulty: 'beginner',
      estimatedMinutes: 90,
      tags: ['linux', 'bash', 'command-line', 'system-admin'],
      isPublic: true,
      completedBy: 1247,
      rating: 4.7,
      environment: {
        type: 'docker',
        image: 'ubuntu:20.04'
      },
      author: {
        name: 'System Admin Team',
        avatar: '/avatars/sysadmin-team.png'
      },
      createdAt: '2024-01-15'
    },
    {
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
        image: 'docker:dind'
      },
      author: {
        name: 'DevOps Team',
        avatar: '/avatars/devops-team.png'
      },
      createdAt: '2024-01-18'
    },
    {
      id: 'jenkins-pipeline-lab',
      title: 'Jenkins CI/CD Pipeline',
      description: 'Build automated CI/CD pipelines with Jenkins. Learn pipeline as code, automated testing, and deployment strategies.',
      type: 'coding',
      difficulty: 'intermediate',
      estimatedMinutes: 150,
      tags: ['jenkins', 'ci-cd', 'automation', 'pipeline'],
      isPublic: true,
      completedBy: 634,
      rating: 4.6,
      environment: {
        type: 'kubernetes',
        resources: {
          cpu: '1',
          memory: '2Gi'
        }
      },
      author: {
        name: 'CI/CD Experts',
        avatar: '/avatars/cicd-experts.png'
      },
      createdAt: '2024-01-20'
    },
    {
      id: 'kubernetes-basics-lab',
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
      createdAt: '2024-01-22'
    },
    {
      id: 'terraform-infrastructure-lab',
      title: 'Infrastructure as Code with Terraform',
      description: 'Provision and manage cloud infrastructure using Terraform. Learn HCL syntax, state management, and best practices.',
      type: 'coding',
      difficulty: 'intermediate',
      estimatedMinutes: 135,
      tags: ['terraform', 'iac', 'aws', 'infrastructure'],
      isPublic: true,
      completedBy: 567,
      rating: 4.5,
      environment: {
        type: 'docker',
        image: 'hashicorp/terraform:latest'
      },
      author: {
        name: 'Infrastructure Team',
        avatar: '/avatars/infra-team.png'
      },
      createdAt: '2024-01-25'
    },
    {
      id: 'monitoring-prometheus-lab',
      title: 'Application Monitoring with Prometheus',
      description: 'Set up monitoring and alerting with Prometheus and Grafana. Learn metrics collection, querying, and dashboard creation.',
      type: 'coding',
      difficulty: 'advanced',
      estimatedMinutes: 160,
      tags: ['prometheus', 'grafana', 'monitoring', 'observability'],
      isPublic: true,
      completedBy: 298,
      rating: 4.7,
      environment: {
        type: 'kubernetes',
        resources: {
          cpu: '1',
          memory: '3Gi'
        }
      },
      author: {
        name: 'Monitoring Team',
        avatar: '/avatars/monitoring-team.png'
      },
      createdAt: '2024-01-28'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Labs', count: labs.length },
    { id: 'coding', label: 'Coding', count: 6 },
    { id: 'networking', label: 'Networking', count: 0 },
    { id: 'simulation', label: 'Simulation', count: 0 }
  ]

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning', 
    advanced: 'destructive'
  }

  const getEnvironmentIcon = (type: string) => {
    switch (type) {
      case 'docker':
        return <Terminal className="w-4 h-4" />
      case 'kubernetes':
        return <Cpu className="w-4 h-4" />
      case 'browser':
        return <Globe className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hands-on Labs
          </h1>
          <p className="text-gray-600">
            Practice with real environments and build practical skills
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search labs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Difficulties</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Types</option>
              <option>Coding</option>
              <option>Networking</option>
              <option>Simulation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium">{category.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Environment Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Lab Environments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>Docker Containers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-green-600" />
                  <span>Kubernetes Clusters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-600" />
                  <span>Browser-based IDEs</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Labs Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {labs.map((lab) => (
                <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={difficultyColors[lab.difficulty as keyof typeof difficultyColors] as any}
                            className="text-xs"
                          >
                            {lab.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {lab.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            {getEnvironmentIcon(lab.environment.type)}
                            <span>{lab.environment.type}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{lab.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {lab.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{lab.estimatedMinutes}min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{lab.completedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{lab.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {lab.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {lab.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lab.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">{lab.author.name}</span>
                      </div>
                      <Link href={`/labs/${lab.id}?interactive=true`}>
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Start Lab
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Labs
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}