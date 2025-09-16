import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { handleSupabaseError } from '@/lib/supabase/client'

export async function GET() {
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
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        user_badges(
          *,
          badges(*)
        )
      `)
      .eq('clerk_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      handleSupabaseError(error)
    }

    // Get user statistics using the database function
    const { data: stats } = await supabase
      .rpc('get_user_stats', { user_uuid: user.id })

    return NextResponse.json({ user: { ...user, stats } })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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

    const { data: user, error } = await supabase
      .from('users')
      .update({
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        bio: body.bio,
        location: body.location,
        website: body.website,
        github_username: body.github_username,
        linkedin_url: body.linkedin_url
      })
      .eq('clerk_id', userId)
      .select()
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}