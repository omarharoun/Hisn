import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Prometheus metrics format
export async function GET() {
  try {
    const supabase = createClient()
    
    // Get basic metrics from database
    const [
      { count: totalUsers },
      { count: totalRoadmaps },
      { count: totalLabs },
      { count: activeLabSessions },
      { count: totalProgress }
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('roadmaps').select('*', { count: 'exact', head: true }),
      supabase.from('labs').select('*', { count: 'exact', head: true }),
      supabase.from('lab_sessions').select('*', { count: 'exact', head: true }).in('status', ['starting', 'running']),
      supabase.from('user_progress').select('*', { count: 'exact', head: true })
    ])

    // Get completion metrics
    const { data: completionStats } = await supabase
      .from('user_progress')
      .select('status')
      .eq('status', 'completed')

    const completedActivities = completionStats?.length || 0

    // Memory usage
    const memoryUsage = process.memoryUsage()

    // Generate Prometheus metrics
    const metrics = `
# HELP skillpath_users_total Total number of registered users
# TYPE skillpath_users_total counter
skillpath_users_total ${totalUsers || 0}

# HELP skillpath_roadmaps_total Total number of roadmaps
# TYPE skillpath_roadmaps_total counter
skillpath_roadmaps_total ${totalRoadmaps || 0}

# HELP skillpath_labs_total Total number of labs
# TYPE skillpath_labs_total counter
skillpath_labs_total ${totalLabs || 0}

# HELP skillpath_active_lab_sessions Active lab sessions
# TYPE skillpath_active_lab_sessions gauge
skillpath_active_lab_sessions ${activeLabSessions || 0}

# HELP skillpath_completed_activities_total Total completed learning activities
# TYPE skillpath_completed_activities_total counter
skillpath_completed_activities_total ${completedActivities}

# HELP skillpath_total_progress_entries Total progress tracking entries
# TYPE skillpath_total_progress_entries counter
skillpath_total_progress_entries ${totalProgress || 0}

# HELP nodejs_memory_heap_used_bytes Node.js heap memory used
# TYPE nodejs_memory_heap_used_bytes gauge
nodejs_memory_heap_used_bytes ${memoryUsage.heapUsed}

# HELP nodejs_memory_heap_total_bytes Node.js heap memory total
# TYPE nodejs_memory_heap_total_bytes gauge
nodejs_memory_heap_total_bytes ${memoryUsage.heapTotal}

# HELP nodejs_memory_external_bytes Node.js external memory
# TYPE nodejs_memory_external_bytes gauge
nodejs_memory_external_bytes ${memoryUsage.external}

# HELP nodejs_memory_rss_bytes Node.js resident set size
# TYPE nodejs_memory_rss_bytes gauge
nodejs_memory_rss_bytes ${memoryUsage.rss}

# HELP process_uptime_seconds Process uptime in seconds
# TYPE process_uptime_seconds counter
process_uptime_seconds ${process.uptime()}
`.trim()

    return new Response(metrics, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error generating metrics:', error)
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    )
  }
}