'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Code, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield, 
  Globe, 
  Award,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

interface Feature {
  icon: any;
  title: string;
  description: string;
}

interface Stat {
  label: string;
  value: string;
}

export function HomePageClient() {
  const features: Feature[] = [
    {
      icon: BookOpen,
      title: 'Structured Roadmaps',
      description: 'Follow expertly crafted learning paths for software development and IP networking'
    },
    {
      icon: Code,
      title: 'Hands-on Labs',
      description: 'Practice with real coding environments and networking simulations'
    },
    {
      icon: Users,
      title: 'Interview Prep',
      description: 'Master technical interviews with our comprehensive question library'
    },
    {
      icon: TrendingUp,
      title: 'AI-Driven Insights',
      description: 'Stay ahead with trend analysis and personalized recommendations'
    },
    {
      icon: Zap,
      title: 'Live Environments',
      description: 'Spin up Docker containers and Kubernetes clusters on-demand'
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn badges, climb leaderboards, and track your progress'
    }
  ]

  const stats: Stat[] = [
    { label: 'Learning Paths', value: '50+' },
    { label: 'Hands-on Labs', value: '200+' },
    { label: 'Interview Questions', value: '1000+' },
    { label: 'Active Learners', value: '10K+' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Master{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Software Development
              </span>{' '}
              & IP Networking
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Interactive learning platform with structured roadmaps, hands-on labs, 
              and AI-driven insights to accelerate your tech career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From beginner to expert, our platform provides all the tools and resources 
              to master modern technology skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Learning Paths
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from expertly crafted roadmaps designed to take you from beginner to professional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="success">Most Popular</Badge>
                  <div className="text-sm text-gray-500">40+ hours</div>
                </div>
                <CardTitle className="text-2xl">Full-Stack Web Development</CardTitle>
                <CardDescription className="text-base">
                  Master modern web development with React, Node.js, and cloud deployment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    JavaScript & TypeScript Fundamentals
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    React & Next.js Development
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Backend APIs & Databases
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Cloud Deployment & DevOps
                  </div>
                </div>
                <Link href="/roadmaps/full-stack-web-development">
                  <Button className="w-full">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="info">Networking</Badge>
                  <div className="text-sm text-gray-500">30+ hours</div>
                </div>
                <CardTitle className="text-2xl">IP Networking Fundamentals</CardTitle>
                <CardDescription className="text-base">
                  Build a solid foundation in networking concepts, protocols, and security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    TCP/IP Protocol Suite
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Subnetting & VLSM
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Routing & Switching
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Network Security Basics
                  </div>
                </div>
                <Link href="/roadmaps/ip-networking-fundamentals">
                  <Button className="w-full" variant="outline">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to accelerate your tech career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are mastering in-demand skills with SkillPath.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/roadmaps">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600">
                Explore Roadmaps
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}