import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/layout/navbar'
import { 
  User, 
  Trophy, 
  Calendar,
  Clock,
  Target,
  Award,
  BookOpen,
  Code,
  TrendingUp,
  Settings,
  Edit,
  Github,
  Linkedin,
  Globe
} from 'lucide-react'

export default async function ProfilePage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Mock user data - in real app, this would come from API
  const userProfile = {
    id: userId,
    username: 'devops_learner',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Passionate DevOps engineer learning cloud technologies and automation. Love building scalable systems and sharing knowledge with the community.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    githubUsername: 'alexjohnson',
    linkedinUrl: 'https://linkedin.com/in/alexjohnson',
    imageUrl: '/avatars/user-profile.png',
    joinedAt: '2024-01-10',
    lastActive: '2024-01-25T10:30:00Z',
    
    stats: {
      totalPoints: 3450,
      streakDays: 7,
      completedRoadmaps: 1,
      completedSteps: 12,
      completedLabs: 8,
      answeredQuestions: 45,
      badgesEarned: 5,
      timeSpent: 32, // hours
      contributions: 2
    },
    
    recentActivity: [
      {
        type: 'lab_completed',
        title: 'Docker Containerization Lab',
        timestamp: '2 hours ago',
        score: 95
      },
      {
        type: 'step_completed',
        title: 'CI/CD Concepts',
        timestamp: '1 day ago',
        score: null
      },
      {
        type: 'badge_earned',
        title: 'Week Warrior',
        timestamp: '2 days ago',
        score: null
      }
    ],
    
    currentRoadmaps: [
      {
        id: 'devops-roadmap',
        title: 'DevOps Engineer Roadmap',
        progress: 65,
        totalSteps: 45,
        completedSteps: 29
      }
    ],
    
    badges: [
      { name: 'First Steps', icon: Trophy, rarity: 'common', earnedAt: '2024-01-15' },
      { name: 'Week Warrior', icon: Calendar, rarity: 'common', earnedAt: '2024-01-20' },
      { name: 'Quick Learner', icon: TrendingUp, rarity: 'uncommon', earnedAt: '2024-01-22' },
      { name: 'Perfect Score', icon: Target, rarity: 'common', earnedAt: '2024-01-23' },
      { name: 'Lab Master', icon: Code, rarity: 'uncommon', earnedAt: '2024-01-24' }
    ]
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lab_completed': return Code
      case 'step_completed': return BookOpen
      case 'badge_earned': return Award
      case 'roadmap_completed': return Trophy
      default: return Target
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lab_completed': return 'text-purple-600'
      case 'step_completed': return 'text-blue-600'
      case 'badge_earned': return 'text-yellow-600'
      case 'roadmap_completed': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {userProfile.firstName} {userProfile.lastName}
                      </h1>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-1">@{userProfile.username}</p>
                    <p className="text-gray-600 mb-4">{userProfile.bio}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(userProfile.joinedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {userProfile.website && (
                        <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          <Globe className="w-4 h-4 inline mr-1" />
                          Website
                        </a>
                      )}
                      {userProfile.githubUsername && (
                        <a href={`https://github.com/${userProfile.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                          <Github className="w-4 h-4 inline mr-1" />
                          GitHub
                        </a>
                      )}
                      {userProfile.linkedinUrl && (
                        <a href={userProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                          <Linkedin className="w-4 h-4 inline mr-1" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {userProfile.stats.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {userProfile.stats.streakDays}
                    </div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {userProfile.stats.timeSpent}h
                    </div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {userProfile.stats.badgesEarned}
                    </div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {userProfile.stats.completedRoadmaps}
                    </div>
                    <div className="text-sm text-gray-600">Roadmaps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {userProfile.stats.completedLabs}
                    </div>
                    <div className="text-sm text-gray-600">Labs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {userProfile.stats.completedSteps}
                    </div>
                    <div className="text-sm text-gray-600">Steps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {userProfile.stats.contributions}
                    </div>
                    <div className="text-sm text-gray-600">Contributions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Roadmaps */}
            <Card>
              <CardHeader>
                <CardTitle>Current Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile.currentRoadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{roadmap.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {roadmap.completedSteps} of {roadmap.totalSteps} steps completed
                        </p>
                      </div>
                      <Badge variant="outline">{roadmap.progress}%</Badge>
                    </div>
                    
                    {(Progress as any)({ value: roadmap.progress, className: "h-2 mb-3" })}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Keep going! You're doing great 🎯
                      </span>
                      <Link href={`/roadmaps/${roadmap.id}`}>
                        <Button size="sm">
                          Continue Learning
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.recentActivity.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type)
                    const iconColor = getActivityColor(activity.type)
                    
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100`}>
                          <ActivityIcon className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.timestamp}</p>
                        </div>
                        {activity.score && (
                          <Badge variant="success" className="text-xs">
                            {activity.score}%
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.badges.slice(0, 3).map((badge, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <badge.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{badge.name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/badges">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Badges
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Learned</span>
                  <span className="font-medium">8.5h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Labs Completed</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points Earned</span>
                  <span className="font-medium">450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-medium">7 days 🔥</span>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  Learning Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}