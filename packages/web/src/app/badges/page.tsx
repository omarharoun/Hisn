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
  Star,
  Zap,
  Target,
  Calendar,
  Users,
  Code,
  BookOpen,
  Crown,
  Timer,
  TrendingUp,
  Shield,
  Compass,
  Clock,
  Bug,
  GraduationCap
} from 'lucide-react'

export default function BadgesPage() {
  // Mock data - in real app, this would come from API
  const userBadges = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first roadmap',
      icon: 'trophy',
      rarity: 'common',
      points: 100,
      earnedAt: '2024-01-15T10:30:00Z',
      isEarned: true
    },
    {
      id: 'week-warrior',
      name: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: 'calendar',
      rarity: 'common',
      points: 100,
      earnedAt: '2024-01-20T15:45:00Z',
      isEarned: true
    },
    {
      id: 'lab-master',
      name: 'Lab Master',
      description: 'Complete 10 hands-on labs',
      icon: 'code',
      rarity: 'uncommon',
      points: 250,
      earnedAt: null,
      isEarned: false,
      progress: 7,
      target: 10
    }
  ]

  const allBadges = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first roadmap',
      icon: Trophy,
      rarity: 'common',
      points: 100,
      criteria: 'Complete any roadmap',
      isEarned: true
    },
    {
      id: 'quick-learner',
      name: 'Quick Learner',
      description: 'Complete a roadmap in under 10 hours',
      icon: Zap,
      rarity: 'uncommon',
      points: 150,
      criteria: 'Complete a roadmap with estimated time under 10 hours',
      isEarned: false
    },
    {
      id: 'lab-master',
      name: 'Lab Master',
      description: 'Complete 10 hands-on labs',
      icon: Code,
      rarity: 'uncommon',
      points: 250,
      criteria: 'Complete 10 different labs',
      isEarned: false
    },
    {
      id: 'code-warrior',
      name: 'Code Warrior',
      description: 'Complete 5 coding labs with perfect score',
      icon: Shield,
      rarity: 'rare',
      points: 300,
      criteria: 'Complete 5 coding labs with 100% score',
      isEarned: false
    },
    {
      id: 'week-warrior',
      name: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: Calendar,
      rarity: 'common',
      points: 100,
      criteria: 'Learn for 7 consecutive days',
      isEarned: true
    },
    {
      id: 'month-master',
      name: 'Month Master',
      description: 'Maintain a 30-day learning streak',
      icon: Calendar,
      rarity: 'rare',
      points: 500,
      criteria: 'Learn for 30 consecutive days',
      isEarned: false
    },
    {
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Get 100% on any lab or quiz',
      icon: Star,
      rarity: 'common',
      points: 50,
      criteria: 'Achieve a perfect score on any assessment',
      isEarned: false
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'One of the first 100 users',
      icon: Crown,
      rarity: 'legendary',
      points: 1000,
      criteria: 'Join the platform as one of the first 100 users',
      isEarned: false
    },
    {
      id: 'community-helper',
      name: 'Community Helper',
      description: 'Help others by contributing content',
      icon: Users,
      rarity: 'rare',
      points: 300,
      criteria: 'Create a public roadmap or lab',
      isEarned: false
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete a lab in record time',
      icon: Timer,
      rarity: 'uncommon',
      points: 150,
      criteria: 'Complete a lab 50% faster than estimated time',
      isEarned: false
    },
    {
      id: 'explorer',
      name: 'Explorer',
      description: 'Try labs in 5 different technologies',
      icon: Compass,
      rarity: 'uncommon',
      points: 200,
      criteria: 'Complete labs covering 5 different technology stacks',
      isEarned: false
    },
    {
      id: 'dedicated',
      name: 'Dedicated',
      description: 'Spend 100+ hours learning',
      icon: Clock,
      rarity: 'rare',
      points: 500,
      criteria: 'Accumulate 100+ hours of learning time',
      isEarned: false
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      description: 'Successfully debug 25 coding challenges',
      icon: Bug,
      rarity: 'rare',
      points: 300,
      criteria: 'Fix bugs or solve coding problems in 25 different labs',
      isEarned: false
    },
    {
      id: 'mentor',
      name: 'Mentor',
      description: 'Receive 10 helpful ratings on your comments',
      icon: GraduationCap,
      rarity: 'uncommon',
      points: 250,
      criteria: 'Receive 10+ helpful votes on community contributions',
      isEarned: false
    },
    {
      id: 'legend',
      name: 'Legend',
      description: 'Achieve top 10 on global leaderboard',
      icon: Crown,
      rarity: 'legendary',
      points: 1500,
      criteria: 'Reach top 10 position on the global points leaderboard',
      isEarned: false
    }
  ]

  const rarityColors = {
    common: 'bg-gray-100 text-gray-800 border-gray-300',
    uncommon: 'bg-green-100 text-green-800 border-green-300',
    rare: 'bg-blue-100 text-blue-800 border-blue-300',
    epic: 'bg-purple-100 text-purple-800 border-purple-300',
    legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-500'
  }

  const rarityGlow = {
    common: '',
    uncommon: 'shadow-green-200',
    rare: 'shadow-blue-200',
    epic: 'shadow-purple-200',
    legendary: 'shadow-yellow-300 shadow-lg'
  }

  const earnedBadges = allBadges.filter(badge => badge.isEarned)
  const availableBadges = allBadges.filter(badge => !badge.isEarned)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏆 Badges & Achievements
          </h1>
          <p className="text-gray-600">
            Earn badges by completing roadmaps, labs, and challenges
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{earnedBadges.length}</div>
              <p className="text-xs text-muted-foreground">
                of {allBadges.length} total badges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {earnedBadges.reduce((sum, badge) => sum + badge.points, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                from badges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Rarest Badge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                {earnedBadges.length > 0 ? 'Common' : 'None'}
              </div>
              <p className="text-xs text-muted-foreground">
                rarity level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                {Math.round((earnedBadges.length / allBadges.length) * 100)}%
              </div>
              {(Progress as any)({ value: (earnedBadges.length / allBadges.length) * 100, className: "h-2 mt-2" })}
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Badges ({earnedBadges.length})</h2>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className={`hover:shadow-lg transition-all ${rarityGlow[badge.rarity as keyof typeof rarityGlow]}`}>
                  <CardHeader className="text-center pb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <badge.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <div className="flex justify-center gap-2">
                      <Badge className={rarityColors[badge.rarity as keyof typeof rarityColors]}>
                        {badge.rarity}
                      </Badge>
                      <Badge variant="outline">
                        {badge.points} pts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-3">
                      {badge.description}
                    </CardDescription>
                    <div className="text-xs text-green-600 font-medium">
                      ✓ Earned on {new Date('2024-01-15').toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No badges yet</h3>
                <p className="text-gray-600 mb-6">
                  Start learning to earn your first badge!
                </p>
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Roadmaps
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Available Badges */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Badges ({availableBadges.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableBadges.map((badge) => (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow opacity-75 hover:opacity-100">
                <CardHeader className="text-center pb-3">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <badge.icon className="w-8 h-8 text-gray-500" />
                  </div>
                  <CardTitle className="text-lg text-gray-700">{badge.name}</CardTitle>
                  <div className="flex justify-center gap-2">
                    <Badge className={rarityColors[badge.rarity as keyof typeof rarityColors]}>
                      {badge.rarity}
                    </Badge>
                    <Badge variant="outline">
                      {badge.points} pts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-3">
                    {badge.description}
                  </CardDescription>
                  <div className="text-xs text-gray-500 mb-3">
                    <strong>How to earn:</strong> {badge.criteria}
                  </div>
                  
                  {/* Progress for Lab Master badge */}
                  {badge.id === 'lab-master' && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">7/10 labs</span>
                      </div>
                      {(Progress as any)({ value: 70, className: "h-2" })}
                      <div className="text-xs text-gray-500 mt-1">
                        3 more labs to unlock!
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Badge Categories */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Badge Categories</CardTitle>
            <CardDescription>
              Different ways to earn badges and recognition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Learning</h3>
                <p className="text-sm text-gray-600">
                  Complete roadmaps, steps, and courses
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Code className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Labs</h3>
                <p className="text-sm text-gray-600">
                  Master hands-on coding and networking labs
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Consistency</h3>
                <p className="text-sm text-gray-600">
                  Maintain learning streaks and habits
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-gray-600">
                  Help others and contribute content
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}