import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createClient()
    const searchParams = request.nextUrl.searchParams
    
    // Parse query parameters
    const roadmapId = searchParams.get('roadmap_id')
    const stepId = searchParams.get('step_id')
    const labId = searchParams.get('lab_id')
    const questionId = searchParams.get('question_id')

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', (user as { id: string }).id)

    // Apply filters
    if (roadmapId) query = query.eq('roadmap_id', roadmapId)
    if (stepId) query = query.eq('step_id', stepId)
    if (labId) query = query.eq('lab_id', labId)
    if (questionId) query = query.eq('question_id', questionId)

    const { data: progress, error } = await query.order('last_accessed_at', { ascending: false })

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createClient()
    const body = await request.json()

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if progress already exists
    let existingProgress = null
    if (body.roadmap_id) {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', (user as { id: string }).id)
        .eq('roadmap_id', body.roadmap_id)
        .single()
      existingProgress = data
    } else if (body.step_id) {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', (user as { id: string }).id)
        .eq('step_id', body.step_id)
        .single()
      existingProgress = data
    } else if (body.lab_id) {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', (user as { id: string }).id)
        .eq('lab_id', body.lab_id)
        .single()
      existingProgress = data
    } else if (body.question_id) {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', (user as { id: string }).id)
        .eq('question_id', body.question_id)
        .single()
      existingProgress = data
    }

    let progress
    if (existingProgress) {
      // Update existing progress
      const { data, error } = await (supabase as any)
        .from('user_progress')
        .update({
          status: body.status,
          score: body.score,
          time_spent: ((existingProgress as any).time_spent || 0) + (body.time_spent || 0),
          attempts: ((existingProgress as any).attempts || 0) + 1,
          notes: body.notes,
          completed_at: body.status === 'completed' ? new Date().toISOString() : null
        })
        .eq('id', (existingProgress as any).id)
        .select()
        .single()

      if (error) {
        handleSupabaseError(error)
      }
      progress = data
    } else {
      // Create new progress
      const { data, error } = await (supabase as any)
        .from('user_progress')
        .insert({
          user_id: (user as { id: string }).id,
          roadmap_id: body.roadmap_id,
          step_id: body.step_id,
          lab_id: body.lab_id,
          question_id: body.question_id,
          status: body.status || 'in-progress',
          score: body.score,
          time_spent: body.time_spent || 0,
          attempts: 1,
          notes: body.notes,
          completed_at: body.status === 'completed' ? new Date().toISOString() : null
        })
        .select()
        .single()

      if (error) {
        handleSupabaseError(error)
      }
      progress = data
    }

    return NextResponse.json({ progress }, { status: existingProgress ? 200 : 201 })
  } catch (error) {
    console.error('Error creating/updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to create/update progress' },
      { status: 500 }
    )
  }
}