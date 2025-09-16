import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { 
  Users, 
  MessageSquare, 
  Heart,
  Share2,
  GitFork,
  Star,
  PlusCircle,
  TrendingUp,
  Award,
  BookOpen,
  Code
} from 'lucide-react'

export default function CommunityPage() {
  // Mock community data
  const communityStats = [
    { label: 'Active Members', value: '12,547', icon: Users },
    { label: 'Contributions', value: '3,892', icon: GitFork },
    { label: 'Community Labs', value: '156', icon: Code },
    { label: 'Discussions', value: '8,234', icon: MessageSquare }
  ]

  const recentContributions = [
    {
      id: '1',
      type: 'roadmap',
      title: 'React Native Mobile Development',
      author: 'mobile_dev_pro',
      avatar: '/avatars/user1.png',
      likes: 45,
      forks: 12,
      createdAt: '2 days ago',
      difficulty: 'intermediate',
      tags: ['react-native', 'mobile', 'ios', 'android']
    },
    {
      id: '2',
      type: 'lab',
      title: 'Advanced Kubernetes Networking',
      author: 'k8s_networking_guru',
      avatar: '/avatars/user2.png',
      likes: 38,
      forks: 8,
      createdAt: '1 day ago',
      difficulty: 'advanced',
      tags: ['kubernetes', 'networking', 'service-mesh']
    },
    {
      id: '3',
      type: 'roadmap',
      title: 'Machine Learning DevOps (MLOps)',
      author: 'ml_engineer',
      avatar: '/avatars/user3.png',
      likes: 67,
      forks: 23,
      createdAt: '3 days ago',
      difficulty: 'advanced',
      tags: ['mlops', 'machine-learning', 'python', 'kubernetes']
    }
  ]

  const topContributors = [
    {
      username: 'devops_master',
      avatar: '/avatars/user1.png',
      contributions: 23,
      likes: 456,
      speciality: 'DevOps & Cloud'
    },
    {
      username: 'network_ninja',
      avatar: '/avatars/user2.png',
      contributions: 18,
      likes: 342,
      speciality: 'Networking & Security'
    },
    {
      username: 'cloud_architect',
      avatar: '/avatars/user3.png',
      contributions: 15,
      likes: 298,
      speciality: 'Cloud Architecture'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success'
      case 'intermediate': return 'warning'
      case 'advanced': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🌟 Community Hub
          </h1>
          <p className="text-gray-600">
            Collaborate, share knowledge, and learn together with the SkillPath community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Contributions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Contributions</h2>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Contribute
              </Button>
            </div>

            <div className="space-y-6">
              {recentContributions.map((contribution) => (
                <Card key={contribution.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {contribution.type}
                          </Badge>
                          <Badge variant={getDifficultyColor(contribution.difficulty) as any} className="text-xs">
                            {contribution.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{contribution.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          <span>by @{contribution.author}</span>
                          <span>•</span>
                          <span>{contribution.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{contribution.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>{contribution.forks}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4">
                      {contribution.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <GitFork className="w-4 h-4 mr-1" />
                        Fork
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.username} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        @{contributor.username}
                      </p>
                      <p className="text-xs text-gray-600">
                        {contributor.speciality}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {contributor.contributions}
                      </div>
                      <div className="text-xs text-gray-500">
                        {contributor.likes} ❤️
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contribution Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Contribution Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <strong>Quality Content:</strong> Ensure accuracy and educational value
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Code className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <strong>Working Labs:</strong> Test all code and instructions
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div>
                    <strong>Community First:</strong> Be helpful and respectful
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <strong>Original Work:</strong> Create original or properly attributed content
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Roadmap
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Submit Lab
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Discussion
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <GitFork className="w-4 h-4 mr-2" />
                  Fork & Improve
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Share your knowledge, learn from experts, and help others on their learning journey. 
                Every contribution makes the platform better for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Start Contributing
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Users className="w-5 h-5 mr-2" />
                  Browse Contributions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}