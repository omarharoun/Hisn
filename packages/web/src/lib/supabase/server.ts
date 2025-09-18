import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './types'
import config from '@/lib/config'

export function createClient() {
  const cookieStore = cookies()

  // Validate required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // For testing without backend or when using mock data, return a mock client
  if (!supabaseUrl || !supabaseAnonKey || config.useMockData) {
    if (!config.useMockData) {
      console.warn('Missing Supabase environment variables - using mock client')
    }
    // Return a mock client that won't throw errors
    return {
      from: (table: string) => ({
        select: (query?: string) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          eq: (column: string, value: any) => ({
            single: () => Promise.resolve({ data: null, error: null }),
            select: (query?: string) => Promise.resolve({ data: [], error: null })
          }),
          order: (column: string, options?: any) => ({
            range: (from: number, to: number) => Promise.resolve({ data: [], error: null })
          })
        }),
        insert: (data: any) => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        }),
        update: (data: any) => ({
          eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
        }),
        upsert: (data: any) => Promise.resolve({ data: null, error: null })
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      }
    } as any
  }

  try {
    return createServerClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw new Error('Database connection error')
  }
}

// Admin client with service role key for server-side operations
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Return mock client if environment variables are missing
  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('Missing Supabase admin credentials - using mock client')
    return {
      from: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      }
    } as any
  }

  return createServerClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // No-op for admin client
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}