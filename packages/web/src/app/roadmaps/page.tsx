import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react'

export default function RoadmapsPage() {
  // Mock data - in real app, this would come from API
  const roadmaps = [
    {
      id: 'devops-roadmap',
      title: 'DevOps Engineer Roadmap',
      description: 'Complete guide to becoming a DevOps Engineer with hands-on labs covering CI/CD, containerization, cloud platforms, and monitoring.',
      category: 'software-development',
      difficulty: 'intermediate',
      estimatedHours: 120,
      tags: ['devops', 'docker', 'kubernetes', 'aws', 'terraform'],
      isPublic: true,
      isFeatured: true,
      imageUrl: '/roadmaps/devops.png',
      totalSteps: 45,
      completedSteps: 0,
      progress: 0,
      enrolledUsers: 2847,
      rating: 4.8,
      author: {
        name: 'DevOps Team',
        avatar: '/avatars/devops-team.png'
      },
      createdAt: '2024-01-15'
    },
    {
      id: 'full-stack-web-development',
      title: 'Full-Stack Web Development',
      description: 'Master modern web development with React, Node.js, databases, and deployment strategies.',
      category: 'software-development',
      difficulty: 'beginner',
      estimatedHours: 80,
      tags: ['react', 'nodejs', 'javascript', 'mongodb', 'api'],
      isPublic: true,
      isFeatured: true,
      imageUrl: '/roadmaps/fullstack.png',
      totalSteps: 35,
      completedSteps: 12,
      progress: 34,
      enrolledUsers: 5234,
      rating: 4.9,
      author: {
        name: 'Frontend Masters',
        avatar: '/avatars/frontend-masters.png'
      },
      createdAt: '2024-01-10'
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Architecture & Design',
      description: 'Learn to design scalable, reliable, and cost-effective cloud solutions on AWS, Azure, and GCP.',
      category: 'software-development',
      difficulty: 'advanced',
      estimatedHours: 100,
      tags: ['aws', 'azure', 'gcp', 'architecture', 'microservices'],
      isPublic: true,
      isFeatured: false,
      imageUrl: '/roadmaps/cloud.png',
      totalSteps: 40,
      completedSteps: 0,
      progress: 0,
      enrolledUsers: 1892,
      rating: 4.7,
      author: {
        name: 'Cloud Experts',
        avatar: '/avatars/cloud-experts.png'
      },
      createdAt: '2024-01-20'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Categories', count: roadmaps.length },
    { id: 'software-development', label: 'Software Development', count: 3 },
    { id: 'ip-networking', label: 'IP Networking', count: 0 },
    { id: 'other', label: 'Other', count: 0 }
  ]

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning', 
    advanced: 'destructive'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Roadmaps
          </h1>
          <p className="text-gray-600">
            Structured learning paths to master new skills and advance your career
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search roadmaps..."
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
          </div>

          {/* Roadmaps Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((roadmap) => (
                <Card key={roadmap.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={difficultyColors[roadmap.difficulty as keyof typeof difficultyColors] as any}
                            className="text-xs"
                          >
                            {roadmap.difficulty}
                          </Badge>
                          {roadmap.isFeatured && (
                            <Badge variant="default" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">{roadmap.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {roadmap.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{roadmap.estimatedHours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{roadmap.totalSteps} steps</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{roadmap.enrolledUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{roadmap.rating}</span>
                      </div>
                    </div>

                    {roadmap.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{roadmap.progress}%</span>
                        </div>
                        {(Progress as any)({ value: roadmap.progress, className: "h-2" })}
                        <div className="text-xs text-gray-500 mt-1">
                          {roadmap.completedSteps} of {roadmap.totalSteps} steps completed
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-4">
                      {roadmap.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {roadmap.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{roadmap.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">{roadmap.author.name}</span>
                      </div>
                      <Link href={`/roadmaps/${roadmap.id}`}>
                        <Button size="sm">
                          {roadmap.progress > 0 ? 'Continue' : 'Start Learning'}
                          <ArrowRight className="w-4 h-4 ml-1" />
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
                Load More Roadmaps
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}