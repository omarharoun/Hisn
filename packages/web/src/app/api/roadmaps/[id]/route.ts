import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { userId } = auth()

    const { data: roadmap, error } = await supabase
      .from('roadmaps')
      .select(`
        *,
        roadmap_steps(
          *,
          resources(*),
          labs(*)
        ),
        users!roadmaps_created_by_fkey(
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
          { error: 'Roadmap not found' },
          { status: 404 }
        )
      }
      handleSupabaseError(error)
    }

    // If user is authenticated, get their progress
    let userProgress = null
    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', userId)
        .single()

      if (user) {
        const { data: progress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', (user as { id: string }).id)
          .eq('roadmap_id', params.id)

        userProgress = progress
      }
    }

    return NextResponse.json({ roadmap, userProgress })
  } catch (error) {
    console.error('Error fetching roadmap:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roadmap' },
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

    // Check if user owns the roadmap
    const { data: existingRoadmap } = await supabase
      .from('roadmaps')
      .select('created_by')
      .eq('id', params.id)
      .single()

    if (!existingRoadmap || (existingRoadmap as any).created_by !== (user as { id: string }).id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { data: roadmap, error } = await (supabase as any)
      .from('roadmaps')
      .update({
        title: body.title,
        description: body.description,
        category: body.category,
        difficulty: body.difficulty,
        estimated_hours: body.estimated_hours,
        tags: body.tags,
        is_public: body.is_public,
        image_url: body.image_url
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ roadmap })
  } catch (error) {
    console.error('Error updating roadmap:', error)
    return NextResponse.json(
      { error: 'Failed to update roadmap' },
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

    // Check if user owns the roadmap
    const { data: existingRoadmap } = await supabase
      .from('roadmaps')
      .select('created_by')
      .eq('id', params.id)
      .single()

    if (!existingRoadmap || (existingRoadmap as any).created_by !== (user as { id: string }).id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { error } = await supabase
      .from('roadmaps')
      .delete()
      .eq('id', params.id)

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting roadmap:', error)
    return NextResponse.json(
      { error: 'Failed to delete roadmap' },
      { status: 500 }
    )
  }
}