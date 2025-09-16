import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const searchParams = request.nextUrl.searchParams
    
    // Parse query parameters
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('roadmaps')
      .select(`
        *,
        roadmap_steps(count)
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (category) {
      query = query.eq('category', category)
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty)
    }
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    const { data: roadmaps, error } = await query

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ roadmaps })
  } catch (error) {
    console.error('Error fetching roadmaps:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roadmaps' },
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

    const { data: roadmap, error } = await supabase
      .from('roadmaps')
      .insert({
        title: body.title,
        description: body.description,
        category: body.category,
        difficulty: body.difficulty,
        estimated_hours: body.estimated_hours || 0,
        tags: body.tags || [],
        is_public: body.is_public || false,
        image_url: body.image_url,
        created_by: user.id
      })
      .select()
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ roadmap }, { status: 201 })
  } catch (error) {
    console.error('Error creating roadmap:', error)
    return NextResponse.json(
      { error: 'Failed to create roadmap' },
      { status: 500 }
    )
  }
}