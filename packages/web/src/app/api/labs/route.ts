import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const searchParams = request.nextUrl.searchParams
    
    // Parse query parameters
    const type = searchParams.get('type')
    const difficulty = searchParams.get('difficulty')
    const stepId = searchParams.get('step_id')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('labs')
      .select(`
        *,
        users!labs_created_by_fkey(
          id,
          first_name,
          last_name,
          username,
          image_url
        )
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (type) {
      query = query.eq('type', type)
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty)
    }
    if (stepId) {
      query = query.eq('step_id', stepId)
    }

    const { data: labs, error } = await query

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ labs })
  } catch (error) {
    console.error('Error fetching labs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch labs' },
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

    const { data: lab, error } = await supabase
      .from('labs')
      .insert({
        step_id: body.step_id,
        title: body.title,
        description: body.description,
        type: body.type,
        difficulty: body.difficulty,
        instructions: body.instructions,
        initial_code: body.initial_code,
        solution_code: body.solution_code,
        validation_script: body.validation_script,
        hints: body.hints || [],
        estimated_minutes: body.estimated_minutes || 30,
        environment: body.environment || {},
        tags: body.tags || [],
        is_public: body.is_public || false,
        created_by: user.id
      })
      .select()
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ lab }, { status: 201 })
  } catch (error) {
    console.error('Error creating lab:', error)
    return NextResponse.json(
      { error: 'Failed to create lab' },
      { status: 500 }
    )
  }
}