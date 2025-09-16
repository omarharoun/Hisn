import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')

    const supabase = createClient()

    let query = supabase
      .from('trend_analysis')
      .select('*')
      .order('trend_score', { ascending: false })
      .limit(limit)

    if (category) {
      query = query.eq('category', category)
    }

    const { data: trends, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ trends })
  } catch (error) {
    console.error('Error fetching trends:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const { skill, category, location = 'global' } = body

    // Call Supabase Edge Function for trend analysis
    const { data, error } = await supabase.functions.invoke('trend-analysis', {
      body: { skill, category, location }
    })

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error analyzing trend:', error)
    return NextResponse.json(
      { error: 'Failed to analyze trend' },
      { status: 500 }
    )
  }
}