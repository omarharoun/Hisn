// Application configuration
export const config = {
  // Feature flags
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  enableRealDocker: process.env.NEXT_PUBLIC_ENABLE_REAL_DOCKER === 'true',
  
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  // Clerk
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  },
  
  // Check if we have valid Supabase config
  hasSupabase: () => {
    return !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  },
  
  // Check if we have valid Clerk config
  hasClerk: () => {
    return !!(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY
    )
  },
  
  // Determine if we should use real backend
  useRealBackend: () => {
    return !config.useMockData && config.hasSupabase()
  }
}

export default config