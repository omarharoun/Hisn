import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

// Provide fallback values during build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error)
  
  if (error?.code === 'PGRST301') {
    throw new Error('Unauthorized access')
  }
  
  if (error?.code === 'PGRST116') {
    throw new Error('Resource not found')
  }
  
  if (error?.message) {
    throw new Error(error.message)
  }
  
  throw new Error('An unexpected error occurred')
}