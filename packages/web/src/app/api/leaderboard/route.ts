import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'global'
    const limit = parseInt(searchParams.get('limit') || '50')

    const supabase = createClient()

    // Get leaderboard data based on type
    let leaderboardData
    switch (type) {
      case 'global':
        leaderboardData = await getGlobalLeaderboard(supabase, limit)
        break
      case 'monthly':
        leaderboardData = await getMonthlyLeaderboard(supabase, limit)
        break
      case 'weekly':
        leaderboardData = await getWeeklyLeaderboard(supabase, limit)
        break
      case 'roadmap':
        const roadmapId = searchParams.get('roadmap_id')
        if (!roadmapId) {
          return NextResponse.json(
            { error: 'roadmap_id required for roadmap leaderboard' },
            { status: 400 }
          )
        }
        leaderboardData = await getRoadmapLeaderboard(supabase, roadmapId, limit)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid leaderboard type' },
          { status: 400 }
        )
    }

    return NextResponse.json({ 
      leaderboard: {
        type,
        entries: leaderboardData,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

async function getGlobalLeaderboard(supabase: any, limit: number) {
  const { data: users, error } = await supabase
    .from('users')
    .select(`
      id,
      username,
      first_name,
      last_name,
      image_url,
      total_points,
      streak_days,
      user_badges(count),
      created_at
    `)
    .order('total_points', { ascending: false })
    .limit(limit)

  if (error) {
    handleSupabaseError(error)
  }

  // Get additional stats for each user
  const enrichedUsers = await Promise.all(
    users.map(async (user: any, index: number) => {
      // Get completed roadmaps count
      const { count: completedRoadmaps } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .not('roadmap_id', 'is', null)

      // Get completed labs count
      const { count: completedLabs } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .not('lab_id', 'is', null)

      return {
        rank: index + 1,
        userId: user.id,
        username: user.username || `${user.first_name} ${user.last_name}`.trim() || 'Anonymous',
        avatar: user.image_url,
        score: user.total_points || 0,
        badges: user.user_badges?.[0]?.count || 0,
        completedRoadmaps: completedRoadmaps || 0,
        completedLabs: completedLabs || 0,
        streak: user.streak_days || 0
      }
    })
  )

  return enrichedUsers
}

async function getMonthlyLeaderboard(supabase: any, limit: number) {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Get users with progress this month
  const { data: monthlyProgress, error } = await supabase
    .from('user_progress')
    .select(`
      user_id,
      users(
        id,
        username,
        first_name,
        last_name,
        image_url,
        total_points,
        streak_days
      )
    `)
    .eq('status', 'completed')
    .gte('completed_at', startOfMonth.toISOString())

  if (error) {
    handleSupabaseError(error)
  }

  // Calculate monthly points for each user
  const userMonthlyStats = monthlyProgress.reduce((acc: any, progress: any) => {
    const userId = progress.user_id
    if (!acc[userId]) {
      acc[userId] = {
        user: progress.users,
        monthlyPoints: 0,
        completedActivities: 0
      }
    }
    acc[userId].monthlyPoints += 50 // Points per completed activity
    acc[userId].completedActivities += 1
    return acc
  }, {})

  // Convert to array and sort
  const sortedUsers = Object.values(userMonthlyStats)
    .sort((a: any, b: any) => b.monthlyPoints - a.monthlyPoints)
    .slice(0, limit)

  return sortedUsers.map((userStat: any, index: number) => ({
    rank: index + 1,
    userId: userStat.user.id,
    username: userStat.user.username || `${userStat.user.first_name} ${userStat.user.last_name}`.trim() || 'Anonymous',
    avatar: userStat.user.image_url,
    score: userStat.monthlyPoints,
    badges: 0, // Would need separate query
    completedRoadmaps: 0, // Would need separate query
    completedLabs: userStat.completedActivities,
    streak: userStat.user.streak_days || 0
  }))
}

async function getWeeklyLeaderboard(supabase: any, limit: number) {
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  // Similar logic to monthly but for this week
  const { data: weeklyProgress, error } = await supabase
    .from('user_progress')
    .select(`
      user_id,
      users(
        id,
        username,
        first_name,
        last_name,
        image_url,
        total_points,
        streak_days
      )
    `)
    .eq('status', 'completed')
    .gte('completed_at', startOfWeek.toISOString())

  if (error) {
    handleSupabaseError(error)
  }

  // Process similar to monthly leaderboard
  const userWeeklyStats = weeklyProgress.reduce((acc: any, progress: any) => {
    const userId = progress.user_id
    if (!acc[userId]) {
      acc[userId] = {
        user: progress.users,
        weeklyPoints: 0,
        completedActivities: 0
      }
    }
    acc[userId].weeklyPoints += 25 // Points per completed activity
    acc[userId].completedActivities += 1
    return acc
  }, {})

  const sortedUsers = Object.values(userWeeklyStats)
    .sort((a: any, b: any) => b.weeklyPoints - a.weeklyPoints)
    .slice(0, limit)

  return sortedUsers.map((userStat: any, index: number) => ({
    rank: index + 1,
    userId: userStat.user.id,
    username: userStat.user.username || `${userStat.user.first_name} ${userStat.user.last_name}`.trim() || 'Anonymous',
    avatar: userStat.user.image_url,
    score: userStat.weeklyPoints,
    badges: 0,
    completedRoadmaps: 0,
    completedLabs: userStat.completedActivities,
    streak: userStat.user.streak_days || 0
  }))
}

async function getRoadmapLeaderboard(supabase: any, roadmapId: string, limit: number) {
  // Get users who completed steps in this roadmap
  const { data: roadmapProgress, error } = await supabase
    .from('user_progress')
    .select(`
      user_id,
      score,
      time_spent,
      users(
        id,
        username,
        first_name,
        last_name,
        image_url,
        total_points,
        streak_days
      ),
      roadmap_steps!inner(roadmap_id)
    `)
    .eq('roadmap_steps.roadmap_id', roadmapId)
    .eq('status', 'completed')

  if (error) {
    handleSupabaseError(error)
  }

  // Calculate roadmap-specific stats
  const userRoadmapStats = roadmapProgress.reduce((acc: any, progress: any) => {
    const userId = progress.user_id
    if (!acc[userId]) {
      acc[userId] = {
        user: progress.users,
        completedSteps: 0,
        totalScore: 0,
        totalTime: 0
      }
    }
    acc[userId].completedSteps += 1
    acc[userId].totalScore += progress.score || 0
    acc[userId].totalTime += progress.time_spent || 0
    return acc
  }, {})

  const sortedUsers = Object.values(userRoadmapStats)
    .sort((a: any, b: any) => {
      // Sort by completed steps, then by average score, then by time (less is better)
      if (a.completedSteps !== b.completedSteps) {
        return b.completedSteps - a.completedSteps
      }
      const avgScoreA = a.totalScore / a.completedSteps
      const avgScoreB = b.totalScore / b.completedSteps
      if (avgScoreA !== avgScoreB) {
        return avgScoreB - avgScoreA
      }
      return a.totalTime - b.totalTime
    })
    .slice(0, limit)

  return sortedUsers.map((userStat: any, index: number) => ({
    rank: index + 1,
    userId: userStat.user.id,
    username: userStat.user.username || `${userStat.user.first_name} ${userStat.user.last_name}`.trim() || 'Anonymous',
    avatar: userStat.user.image_url,
    score: userStat.totalScore,
    badges: 0,
    completedRoadmaps: 0,
    completedLabs: userStat.completedSteps,
    streak: userStat.user.streak_days || 0,
    averageScore: Math.round(userStat.totalScore / userStat.completedSteps),
    totalTime: userStat.totalTime
  }))
}
