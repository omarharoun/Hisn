import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'


export async function GET() {
  try {
    // Check database connectivity
    const supabase = createClient()
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
      .single()

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: error ? 'unhealthy' : 'healthy',
        memory: {
          used: process.memoryUsage().heapUsed / 1024 / 1024,
          total: process.memoryUsage().heapTotal / 1024 / 1024,
        },
        uptime: process.uptime(),
      }
    }

    // If database is unhealthy, return 503
    if (error) {
      return NextResponse.json(
        { ...healthStatus, status: 'unhealthy' },
        { status: 503 }
      )
    }

    return NextResponse.json(healthStatus)
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    )
  }
}
