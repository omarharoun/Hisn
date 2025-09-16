import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown,
  TrendingUp,
  Calendar,
  Users,
  Target,
  Star,
  Zap
} from 'lucide-react'

export default function LeaderboardPage() {
  // Mock data - in real app, this would come from API
  const leaderboards = [
    {
      id: 'global',
      name: 'Global Leaderboard',
      type: 'global',
      description: 'Top learners across all roadmaps and activities',
      entries: [
        {
          rank: 1,
          userId: '1',
          username: 'devops_master',
          avatar: '/avatars/user1.png',
          score: 12450,
          badges: 18,
          completedRoadmaps: 3,
          completedLabs: 25,
          streak: 45
        },
        {
          rank: 2,
          userId: '2',
          username: 'cloud_ninja',
          avatar: '/avatars/user2.png',
          score: 11280,
          badges: 15,
          completedRoadmaps: 2,
          completedLabs: 22,
          streak: 32
        },
        {
          rank: 3,
          userId: '3',
          username: 'k8s_expert',
          avatar: '/avatars/user3.png',
          score: 10890,
          badges: 16,
          completedRoadmaps: 2,
          completedLabs: 21,
          streak: 28
        },
        {
          rank: 4,
          userId: '4',
          username: 'docker_pro',
          avatar: '/avatars/user4.png',
          score: 9750,
          badges: 12,
          completedRoadmaps: 2,
          completedLabs: 18,
          streak: 21
        },
        {
          rank: 5,
          userId: '5',
          username: 'ci_cd_guru',
          avatar: '/avatars/user5.png',
          score: 8920,
          badges: 11,
          completedRoadmaps: 1,
          completedLabs: 16,
          streak: 19
        }
      ]
    },
    {
      id: 'monthly',
      name: 'This Month',
      type: 'monthly',
      description: 'Top performers this month',
      entries: [
        {
          rank: 1,
          userId: '6',
          username: 'fast_learner',
          avatar: '/avatars/user6.png',
          score: 3420,
          badges: 8,
          completedRoadmaps: 1,
          completedLabs: 12,
          streak: 15
        },
        {
          rank: 2,
          userId: '7',
          username: 'network_ace',
          avatar: '/avatars/user7.png',
          score: 2890,
          badges: 6,
          completedRoadmaps: 1,
          completedLabs: 9,
          streak: 12
        },
        {
          rank: 3,
          userId: '8',
          username: 'lab_crusher',
          avatar: '/avatars/user8.png',
          score: 2650,
          badges: 5,
          completedRoadmaps: 0,
          completedLabs: 11,
          streak: 8
        }
      ]
    }
  ]

  const achievements = [
    {
      title: 'Most Completed Labs',
      winner: 'devops_master',
      count: 25,
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      title: 'Longest Streak',
      winner: 'devops_master',
      count: 45,
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Most Badges Earned',
      winner: 'devops_master',
      count: 18,
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Fastest Learner',
      winner: 'fast_learner',
      count: 12,
      icon: Zap,
      color: 'text-blue-600'
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏆 Leaderboards & Achievements
          </h1>
          <p className="text-gray-600">
            Compete with learners worldwide and celebrate achievements
          </p>
        </div>

        {/* Top Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.count}</div>
                <div className="text-sm text-gray-600">by @{achievement.winner}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaderboards.map((leaderboard) => (
            <Card key={leaderboard.id} className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                  {leaderboard.name}
                </CardTitle>
                <CardDescription>
                  {leaderboard.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.entries.map((entry) => (
                    <div key={entry.userId} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            @{entry.username}
                          </p>
                          <Badge className={getRankBadgeColor(entry.rank)}>
                            #{entry.rank}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {entry.score.toLocaleString()} pts
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {entry.badges} badges
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {entry.completedLabs} labs
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {entry.streak}d streak
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {entry.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">
                    View Full Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-purple-600" />
              Your Performance
            </CardTitle>
            <CardDescription>
              See how you rank against other learners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">#47</div>
                <div className="text-sm text-gray-600">Global Rank</div>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+12 this week</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">3,450</div>
                <div className="text-sm text-gray-600">Total Points</div>
                <div className="text-sm text-purple-600 mt-2">+250 this week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
                <div className="text-sm text-blue-600 mt-2">2 away from next</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">7</div>
                <div className="text-sm text-gray-600">Day Streak</div>
                <div className="text-sm text-orange-600 mt-2">🔥 Keep it up!</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Next Milestone</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress to next badge</span>
                <span className="text-sm font-medium">7/10 labs completed</span>
              </div>
              <Progress value={70} className="h-2 mb-2" />
              <p className="text-sm text-gray-600">
                Complete 3 more labs to earn the <strong>"Lab Master"</strong> badge! 🎯
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}