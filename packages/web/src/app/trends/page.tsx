import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  BarChart3,
  ArrowRight,
  Zap,
  Target,
  Award,
  BookOpen
} from 'lucide-react'

export default function TrendsPage() {
  // Mock data - in real app, this would come from API/Edge Function
  const trendingSkills = [
    {
      skill: 'Kubernetes',
      category: 'DevOps',
      trendScore: 95,
      demandGrowth: 67.8,
      salaryImpact: 25000,
      jobPostings: 18750,
      difficulty: 'Advanced',
      timeToLearn: '6-8 months',
      certifications: ['CKA', 'CKAD', 'CKS'],
      relatedSkills: ['Docker', 'Helm', 'Istio']
    },
    {
      skill: 'AWS',
      category: 'Cloud',
      trendScore: 94,
      demandGrowth: 38.7,
      salaryImpact: 22000,
      jobPostings: 28900,
      difficulty: 'Intermediate',
      timeToLearn: '4-6 months',
      certifications: ['Solutions Architect', 'DevOps Engineer'],
      relatedSkills: ['Terraform', 'Lambda', 'EKS']
    },
    {
      skill: 'Docker',
      category: 'DevOps',
      trendScore: 92,
      demandGrowth: 45.2,
      salaryImpact: 15000,
      jobPostings: 12500,
      difficulty: 'Beginner',
      timeToLearn: '2-3 months',
      certifications: ['Docker Certified Associate'],
      relatedSkills: ['Kubernetes', 'Docker Compose', 'Podman']
    },
    {
      skill: 'Terraform',
      category: 'IaC',
      trendScore: 88,
      demandGrowth: 52.3,
      salaryImpact: 18000,
      jobPostings: 9800,
      difficulty: 'Intermediate',
      timeToLearn: '3-4 months',
      certifications: ['HashiCorp Certified: Terraform Associate'],
      relatedSkills: ['Ansible', 'Pulumi', 'CloudFormation']
    },
    {
      skill: 'Python',
      category: 'Programming',
      trendScore: 87,
      demandGrowth: 28.4,
      salaryImpact: 20000,
      jobPostings: 45600,
      difficulty: 'Beginner',
      timeToLearn: '3-6 months',
      certifications: ['PCAP', 'PCPP'],
      relatedSkills: ['Django', 'FastAPI', 'Pandas']
    },
    {
      skill: 'TypeScript',
      category: 'Programming',
      trendScore: 83,
      demandGrowth: 56.7,
      salaryImpact: 12000,
      jobPostings: 23400,
      difficulty: 'Intermediate',
      timeToLearn: '2-4 months',
      certifications: ['Microsoft TypeScript Certification'],
      relatedSkills: ['React', 'Node.js', 'Angular']
    }
  ]

  const marketInsights = [
    {
      title: 'DevOps Skills Dominate',
      description: 'DevOps-related skills show the highest growth rates and salary impacts',
      trend: 'up',
      percentage: 67.8
    },
    {
      title: 'Cloud Computing Expansion',
      description: 'Cloud platforms continue to drive demand for specialized skills',
      trend: 'up',
      percentage: 45.3
    },
    {
      title: 'Container Orchestration',
      description: 'Kubernetes leads container orchestration with massive growth',
      trend: 'up',
      percentage: 89.2
    },
    {
      title: 'Infrastructure as Code',
      description: 'IaC tools see increased adoption across all company sizes',
      trend: 'up',
      percentage: 52.3
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success'
      case 'Intermediate': return 'warning'
      case 'Advanced': return 'destructive'
      default: return 'outline'
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tech Skills Trends & Market Analysis
          </h1>
          <p className="text-gray-600">
            AI-driven insights into the most in-demand skills and career opportunities
          </p>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketInsights.map((insight, index) => {
            const TrendIcon = getTrendIcon(insight.trend)
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <TrendIcon className={`w-5 h-5 ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      +{insight.percentage}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trending Skills */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trending Skills</h2>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Full Report
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trendingSkills.map((skill, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl mb-1">{skill.skill}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline">{skill.category}</Badge>
                        <Badge variant={getDifficultyColor(skill.difficulty) as any}>
                          {skill.difficulty}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{skill.trendScore}</div>
                      <div className="text-xs text-gray-500">Trend Score</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Demand Growth */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Demand Growth</span>
                        <span className="font-medium text-green-600">+{skill.demandGrowth}%</span>
                      </div>
                      <Progress value={skill.demandGrowth} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="font-medium text-gray-900">+${skill.salaryImpact.toLocaleString()}</div>
                        <div className="text-gray-500">Salary Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="font-medium text-gray-900">{skill.jobPostings.toLocaleString()}</div>
                        <div className="text-gray-500">Job Postings</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Target className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="font-medium text-gray-900">{skill.timeToLearn}</div>
                        <div className="text-gray-500">Time to Learn</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Certifications */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Certifications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.certifications.map((cert, certIndex) => (
                        <Badge key={certIndex} variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Related Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Related Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.relatedSkills.map((relatedSkill, relatedIndex) => (
                        <Badge key={relatedIndex} variant="secondary" className="text-xs">
                          {relatedSkill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Start Learning
                    </Button>
                    <Button variant="outline" size="sm">
                      <Zap className="w-4 h-4 mr-1" />
                      Quick Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Personalized Learning Recommendations
            </CardTitle>
            <CardDescription>
              Based on current market trends and your learning history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Start with Docker</h3>
                <p className="text-sm text-gray-600 mb-3">
                  High demand, beginner-friendly, and foundational for DevOps
                </p>
                <Button size="sm" className="w-full">
                  Begin Docker Roadmap
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Level up with AWS</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Massive job market and excellent salary growth potential
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore AWS Path
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Master Kubernetes</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Highest growth rate and premium salary opportunities
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Advanced K8s Track
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Analysis CTA */}
        <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Get Detailed Market Analysis</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Access comprehensive reports on salary trends, job market analysis, 
                and personalized career recommendations powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Full Report
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Target className="w-5 h-5 mr-2" />
                  Get Personal Analysis
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