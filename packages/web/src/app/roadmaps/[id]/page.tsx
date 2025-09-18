import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/layout/navbar'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Circle,
  Lock,
  Code,
  FileText,
  Video,
  HelpCircle,
  Zap
} from 'lucide-react'

interface Props {
  params: { id: string }
}

export default async function RoadmapDetailPage({ params }: Props) {
  const { userId } = auth()
  
  // Mock data - in real app, this would come from API
  const roadmap = {
    id: 'devops-roadmap',
    title: 'DevOps Engineer Roadmap',
    description: 'Complete guide to becoming a DevOps Engineer with hands-on labs covering CI/CD, containerization, cloud platforms, and monitoring. This comprehensive roadmap will take you from beginner to professional DevOps engineer.',
    category: 'software-development',
    difficulty: 'intermediate',
    estimatedHours: 120,
    tags: ['devops', 'docker', 'kubernetes', 'aws', 'terraform', 'jenkins', 'monitoring'],
    isPublic: true,
    isFeatured: true,
    totalSteps: 45,
    completedSteps: userId ? 8 : 0,
    progress: userId ? 18 : 0,
    enrolledUsers: 2847,
    rating: 4.8,
    author: {
      name: 'DevOps Team',
      avatar: '/avatars/devops-team.png'
    },
    createdAt: '2024-01-15',
    steps: [
      {
        id: '1',
        title: 'Introduction to DevOps',
        description: 'Understanding DevOps culture, practices, and benefits',
        order: 1,
        type: 'reading',
        estimatedMinutes: 30,
        isCompleted: userId ? true : false,
        isLocked: false,
        resources: [
          { title: 'What is DevOps?', type: 'link', url: '#' },
          { title: 'DevOps Culture Guide', type: 'document', url: '#' }
        ]
      },
      {
        id: '2',
        title: 'Version Control with Git',
        description: 'Master Git fundamentals and collaborative workflows',
        order: 2,
        type: 'reading',
        estimatedMinutes: 45,
        isCompleted: userId ? true : false,
        isLocked: false,
        resources: [
          { title: 'Git Basics Tutorial', type: 'video', url: '#' },
          { title: 'Git Branching Strategies', type: 'document', url: '#' }
        ]
      },
      {
        id: '3',
        title: 'Linux Fundamentals',
        description: 'Essential Linux commands and system administration',
        order: 3,
        type: 'reading',
        estimatedMinutes: 60,
        isCompleted: userId ? true : false,
        isLocked: false,
        resources: [
          { title: 'Linux Command Line', type: 'link', url: '#' },
          { title: 'System Administration', type: 'document', url: '#' }
        ]
      },
      {
        id: '4',
        title: 'Linux Command Line Lab',
        description: 'Practice essential Linux commands in a real environment',
        order: 4,
        type: 'lab',
        estimatedMinutes: 90,
        isCompleted: userId ? true : false,
        isLocked: false,
        labs: [
          {
            id: 'linux-basics-lab',
            title: 'Linux Basics Lab',
            difficulty: 'beginner',
            type: 'coding'
          }
        ]
      },
      {
        id: '5',
        title: 'Networking Fundamentals',
        description: 'TCP/IP, DNS, HTTP/HTTPS, and network troubleshooting',
        order: 5,
        type: 'reading',
        estimatedMinutes: 75,
        isCompleted: userId ? false : false,
        isLocked: false,
        resources: [
          { title: 'Networking Basics', type: 'video', url: '#' },
          { title: 'Protocol Deep Dive', type: 'document', url: '#' }
        ]
      },
      {
        id: '6',
        title: 'Docker Fundamentals',
        description: 'Containerization concepts and Docker basics',
        order: 6,
        type: 'reading',
        estimatedMinutes: 90,
        isCompleted: false,
        isLocked: false,
        resources: [
          { title: 'Docker Introduction', type: 'video', url: '#' },
          { title: 'Container Best Practices', type: 'document', url: '#' }
        ]
      },
      {
        id: '7',
        title: 'Docker Hands-on Lab',
        description: 'Build, run, and manage Docker containers',
        order: 7,
        type: 'lab',
        estimatedMinutes: 120,
        isCompleted: false,
        isLocked: false,
        labs: [
          {
            id: 'docker-basics-lab',
            title: 'Docker Containerization Lab',
            difficulty: 'intermediate',
            type: 'coding'
          }
        ]
      },
      {
        id: '8',
        title: 'CI/CD Concepts',
        description: 'Continuous Integration and Continuous Deployment principles',
        order: 8,
        type: 'reading',
        estimatedMinutes: 60,
        isCompleted: false,
        isLocked: false,
        resources: [
          { title: 'CI/CD Pipeline Guide', type: 'video', url: '#' },
          { title: 'Best Practices', type: 'document', url: '#' }
        ]
      },
      {
        id: '9',
        title: 'Jenkins Pipeline Lab',
        description: 'Build automated CI/CD pipelines with Jenkins',
        order: 9,
        type: 'lab',
        estimatedMinutes: 150,
        isCompleted: false,
        isLocked: false,
        labs: [
          {
            id: 'jenkins-pipeline-lab',
            title: 'Jenkins CI/CD Pipeline',
            difficulty: 'intermediate',
            type: 'coding'
          }
        ]
      },
      {
        id: '10',
        title: 'Cloud Platforms Overview',
        description: 'AWS, Azure, and GCP comparison and basics',
        order: 10,
        type: 'reading',
        estimatedMinutes: 45,
        isCompleted: false,
        isLocked: true,
        resources: [
          { title: 'Cloud Comparison', type: 'document', url: '#' },
          { title: 'Getting Started Guide', type: 'video', url: '#' }
        ]
      }
    ]
  }

  if (params.id !== 'devops-roadmap') {
    notFound()
  }

  const getStepIcon = (type: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    }
    
    switch (type) {
      case 'reading':
        return <FileText className="w-5 h-5 text-gray-400" />
      case 'video':
        return <Video className="w-5 h-5 text-gray-400" />
      case 'lab':
        return <Code className="w-5 h-5 text-purple-600" />
      case 'quiz':
        return <HelpCircle className="w-5 h-5 text-blue-600" />
      case 'project':
        return <Zap className="w-5 h-5 text-orange-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

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
          <div className="flex items-center gap-2 mb-4">
            <Link href="/roadmaps" className="text-gray-600 hover:text-gray-900">
              Roadmaps
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{roadmap.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge 
                    variant={difficultyColors[roadmap.difficulty as keyof typeof difficultyColors] as any}
                  >
                    {roadmap.difficulty}
                  </Badge>
                  {roadmap.isFeatured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {roadmap.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  {roadmap.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{roadmap.estimatedHours} hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{roadmap.totalSteps} steps</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{roadmap.enrolledUsers.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{roadmap.rating}</span>
                  </div>
                </div>

                {userId && roadmap.progress > 0 && (
                  <div className="bg-white rounded-lg p-6 mb-6 border">
                    <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Completion</span>
                      <span className="font-medium">{roadmap.progress}%</span>
                    </div>
                    {(Progress as any)({ value: roadmap.progress, className: "h-3 mb-2" })}
                    <div className="text-sm text-gray-500">
                      {roadmap.completedSteps} of {roadmap.totalSteps} steps completed
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {roadmap.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Path</h2>
                <div className="space-y-4">
                  {roadmap.steps.map((step, index) => (
                    <Card key={step.id} className={`${step.isCompleted ? 'border-green-200 bg-green-50' : ''} ${step.isLocked ? 'opacity-60' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {step.isLocked ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : (
                              getStepIcon(step.type, step.isCompleted)
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <CardTitle className="text-lg">
                                {index + 1}. {step.title}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {step.type}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  <span>{step.estimatedMinutes}min</span>
                                </div>
                              </div>
                            </div>
                            <CardDescription>
                              {step.description}
                            </CardDescription>
                            
                            {/* Resources or Labs */}
                            {step.resources && step.resources.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
                                <div className="space-y-1">
                                  {step.resources.map((resource, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-blue-600">
                                      <FileText className="w-4 h-4" />
                                      <a href={resource.url} className="hover:underline">
                                        {resource.title}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.labs && step.labs.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Hands-on Labs:</h4>
                                <div className="space-y-2">
                                  {step.labs.map((lab, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <Code className="w-4 h-4 text-purple-600" />
                                        <span className="font-medium text-purple-900">{lab.title}</span>
                                        <Badge variant="outline" className="text-xs">
                                          {lab.difficulty}
                                        </Badge>
                                      </div>
                                      <Link href={`/labs/${lab.id}`}>
                                        <Button size="sm" variant="outline">
                                          <Play className="w-4 h-4 mr-1" />
                                          Start Lab
                                        </Button>
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {!step.isLocked && (
                              <div className="mt-4 flex gap-2">
                                {step.isCompleted ? (
                                  <Button variant="outline" size="sm">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Completed
                                  </Button>
                                ) : (
                                  <Button size="sm">
                                    {step.type === 'lab' ? 'Start Lab' : 'Start Learning'}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Enroll/Continue Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {userId && roadmap.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userId ? (
                      <>
                        {roadmap.progress > 0 ? (
                          <Button className="w-full mb-4">
                            Continue Learning
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        ) : (
                          <Button className="w-full mb-4">
                            Start Roadmap
                            <Play className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                        <div className="text-sm text-gray-600">
                          Join {roadmap.enrolledUsers.toLocaleString()} learners on this roadmap
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-600 mb-4">
                          Sign in to track your progress and access labs
                        </div>
                        <Link href="/sign-in">
                          <Button className="w-full">
                            Sign In to Start
                          </Button>
                        </Link>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Author Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Created by</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-medium">{roadmap.author.name}</div>
                        <div className="text-sm text-gray-600">DevOps Expert</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Roadmap Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Steps</span>
                      <span className="font-medium">{roadmap.totalSteps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time</span>
                      <span className="font-medium">{roadmap.estimatedHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty</span>
                      <Badge variant={difficultyColors[roadmap.difficulty as keyof typeof difficultyColors] as any}>
                        {roadmap.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{roadmap.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}