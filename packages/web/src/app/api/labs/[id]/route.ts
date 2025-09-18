import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { userId } = auth()

    const { data: lab, error } = await supabase
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
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Lab not found' },
          { status: 404 }
        )
      }
      handleSupabaseError(error)
    }

    // If user is authenticated, get their progress and active session
    let userProgress = null
    let activeSession = null
    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', userId)
        .single()

      if (user) {
        // Get progress
        const { data: progress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', (user as { id: string }).id)
          .eq('lab_id', params.id)
          .single()

        userProgress = progress

        // Get active lab session
        const { data: session } = await supabase
          .from('lab_sessions')
          .select('*')
          .eq('user_id', (user as { id: string }).id)
          .eq('lab_id', params.id)
          .in('status', ['starting', 'running'])
          .single()

        activeSession = session
      }
    }

    return NextResponse.json({ lab, userProgress, activeSession })
  } catch (error) {
    console.error('Error fetching lab:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lab' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if user owns the lab
    const { data: existingLab } = await supabase
      .from('labs')
      .select('created_by')
      .eq('id', params.id)
      .single()

    if (!existingLab || (existingLab as { created_by: string }).created_by !== (user as { id: string }).id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { data: lab, error } = await (supabase as any)
      .from('labs')
      .update({
        title: body.title,
        description: body.description,
        type: body.type,
        difficulty: body.difficulty,
        instructions: body.instructions,
        initial_code: body.initial_code,
        solution_code: body.solution_code,
        validation_script: body.validation_script,
        hints: body.hints,
        estimated_minutes: body.estimated_minutes,
        environment: body.environment,
        tags: body.tags,
        is_public: body.is_public
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ lab })
  } catch (error) {
    console.error('Error updating lab:', error)
    return NextResponse.json(
      { error: 'Failed to update lab' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createClient()

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

    // Check if user owns the lab
    const { data: existingLab } = await supabase
      .from('labs')
      .select('created_by')
      .eq('id', params.id)
      .single()

    if (!existingLab || (existingLab as { created_by: string }).created_by !== (user as { id: string }).id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { error } = await supabase
      .from('labs')
      .delete()
      .eq('id', params.id)

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lab:', error)
    return NextResponse.json(
      { error: 'Failed to delete lab' },
      { status: 500 }
    )
  }
}
