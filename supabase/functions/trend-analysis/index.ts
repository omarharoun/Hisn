import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { skill, category, location = 'global' } = await req.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Simulate trend analysis (in production, this would call real APIs)
    const trendData = await analyzeTrend(skill, category, location)

    // Store/update trend analysis
    const { data: existingTrend } = await supabaseClient
      .from('trend_analysis')
      .select('*')
      .eq('skill', skill)
      .eq('category', category)
      .single()

    if (existingTrend) {
      // Update existing trend
      await supabaseClient
        .from('trend_analysis')
        .update({
          trend_score: trendData.trendScore,
          demand_growth: trendData.demandGrowth,
          salary_impact: trendData.salaryImpact,
          job_postings: trendData.jobPostings,
          sources: trendData.sources,
          recommendations: trendData.recommendations,
          last_updated: new Date().toISOString()
        })
        .eq('id', existingTrend.id)
    } else {
      // Create new trend analysis
      await supabaseClient
        .from('trend_analysis')
        .insert({
          skill,
          category,
          trend_score: trendData.trendScore,
          demand_growth: trendData.demandGrowth,
          salary_impact: trendData.salaryImpact,
          job_postings: trendData.jobPostings,
          sources: trendData.sources,
          recommendations: trendData.recommendations,
          last_updated: new Date().toISOString()
        })
    }

    return new Response(
      JSON.stringify(trendData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function analyzeTrend(skill: string, category: string, location: string) {
  // Mock trend analysis - in production, integrate with:
  // - LinkedIn API for job postings
  // - GitHub API for repository trends
  // - Stack Overflow API for question trends
  // - Indeed/Glassdoor APIs for salary data
  
  const skillTrends: Record<string, any> = {
    'docker': {
      trendScore: 0.92,
      demandGrowth: 45.2,
      salaryImpact: 15000,
      jobPostings: 12500,
      sources: ['LinkedIn', 'Indeed', 'GitHub'],
      recommendations: [
        'Learn Kubernetes for container orchestration',
        'Master Docker Compose for multi-container applications',
        'Study container security best practices',
        'Explore Docker Swarm for clustering'
      ]
    },
    'kubernetes': {
      trendScore: 0.95,
      demandGrowth: 67.8,
      salaryImpact: 25000,
      jobPostings: 18750,
      sources: ['LinkedIn', 'Indeed', 'Stack Overflow'],
      recommendations: [
        'Get certified with CKA (Certified Kubernetes Administrator)',
        'Learn Helm for package management',
        'Study service mesh technologies like Istio',
        'Master monitoring with Prometheus and Grafana'
      ]
    },
    'terraform': {
      trendScore: 0.88,
      demandGrowth: 52.3,
      salaryImpact: 18000,
      jobPostings: 9800,
      sources: ['LinkedIn', 'GitHub', 'HashiCorp'],
      recommendations: [
        'Learn Terraform Cloud for team collaboration',
        'Master state management and remote backends',
        'Study multi-cloud deployments',
        'Explore Terraform modules and best practices'
      ]
    },
    'jenkins': {
      trendScore: 0.75,
      demandGrowth: 23.1,
      salaryImpact: 12000,
      jobPostings: 15600,
      sources: ['LinkedIn', 'Indeed', 'Jenkins.io'],
      recommendations: [
        'Learn Jenkins Pipeline as Code',
        'Master Blue Ocean for modern UI',
        'Study Jenkins X for cloud-native CI/CD',
        'Explore alternatives like GitHub Actions'
      ]
    },
    'aws': {
      trendScore: 0.94,
      demandGrowth: 38.7,
      salaryImpact: 22000,
      jobPostings: 28900,
      sources: ['LinkedIn', 'AWS', 'Indeed'],
      recommendations: [
        'Get AWS certifications (Solutions Architect, DevOps)',
        'Learn serverless with Lambda and API Gateway',
        'Master EKS for Kubernetes on AWS',
        'Study cost optimization strategies'
      ]
    }
  }

  // Default trend data if skill not found
  const defaultTrend = {
    trendScore: 0.65,
    demandGrowth: 15.0,
    salaryImpact: 8000,
    jobPostings: 2500,
    sources: ['General Market Research'],
    recommendations: [
      'Build practical projects to demonstrate skills',
      'Contribute to open-source projects',
      'Get relevant certifications',
      'Network with professionals in the field'
    ]
  }

  return skillTrends[skill.toLowerCase()] || defaultTrend
}

// Additional function to get trending skills
export async function getTrendingSkills(category?: string) {
  const trendingSkills = [
    { skill: 'kubernetes', category: 'devops', trendScore: 0.95, growth: 67.8 },
    { skill: 'aws', category: 'cloud', trendScore: 0.94, growth: 38.7 },
    { skill: 'docker', category: 'devops', trendScore: 0.92, growth: 45.2 },
    { skill: 'terraform', category: 'iac', trendScore: 0.88, growth: 52.3 },
    { skill: 'python', category: 'programming', trendScore: 0.87, growth: 28.4 },
    { skill: 'react', category: 'frontend', trendScore: 0.85, growth: 31.2 },
    { skill: 'typescript', category: 'programming', trendScore: 0.83, growth: 56.7 },
    { skill: 'ansible', category: 'devops', trendScore: 0.81, growth: 34.5 },
    { skill: 'jenkins', category: 'ci-cd', trendScore: 0.75, growth: 23.1 },
    { skill: 'prometheus', category: 'monitoring', trendScore: 0.79, growth: 41.3 }
  ]

  if (category) {
    return trendingSkills.filter(skill => skill.category === category)
  }

  return trendingSkills.sort((a, b) => b.trendScore - a.trendScore)
}