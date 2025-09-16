import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Target,
  Calendar,
  Award,
  ArrowRight,
  Play
} from 'lucide-react'

export default async function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Mock data - in real app, this would come from Supabase
  const userStats = {
    totalPoints: 1250,
    streakDays: 7,
    completedRoadmaps: 2,
    completedLabs: 15,
    timeSpent: 45, // hours
    badgesEarned: 8
  }

  const currentRoadmaps = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      progress: 65,
      nextStep: 'Building REST APIs with Node.js',
      estimatedTime: '2 hours'
    },
    {
      id: '2',
      title: 'IP Networking Fundamentals',
      progress: 30,
      nextStep: 'Understanding TCP/IP Protocol Suite',
      estimatedTime: '1.5 hours'
    }
  ]

  const recentBadges = [
    { name: 'First Steps', icon: '🏆', earnedAt: '2 days ago' },
    { name: 'Week Warrior', icon: '⚡', earnedAt: '1 day ago' },
    { name: 'Lab Master', icon: '🔬', earnedAt: '3 hours ago' }
  ]

  const upcomingLabs = [
    {
      title: 'Build a React Todo App',
      difficulty: 'Beginner',
      estimatedTime: '45 min'
    },
    {
      title: 'Configure VLAN on Cisco Switch',
      difficulty: 'Intermediate',
      estimatedTime: '30 min'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and track your progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalPoints}</div>
              <p className="text-xs text-muted-foreground">
                +125 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.timeSpent}h</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.badgesEarned}</div>
              <p className="text-xs text-muted-foreground">
                +3 this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Roadmaps */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Current Roadmaps
                </CardTitle>
                <CardDescription>
                  Continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentRoadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{roadmap.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Next: {roadmap.nextStep}
                        </p>
                      </div>
                      <Badge variant="outline">{roadmap.progress}%</Badge>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                        style={{ width: `${roadmap.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Est. {roadmap.estimatedTime}
                      </span>
                      <Button size="sm">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Labs */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Upcoming Labs
                </CardTitle>
                <CardDescription>
                  Hands-on practice to reinforce your learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingLabs.map((lab, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{lab.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">
                            {lab.difficulty}
                          </Badge>
                          <span>{lab.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.earnedAt}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Roadmaps
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Practice Labs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Trends
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Interview Prep
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}