import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow in development mode for security
  if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_DIAGNOSTICS) {
    return NextResponse.json({ error: 'Diagnostics disabled in production' }, { status: 403 });
  }

  const envCheck = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {
      // Supabase
      supabase: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      // Clerk
      clerk: {
        publishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: !!process.env.CLERK_SECRET_KEY,
        signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'not set',
        signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || 'not set',
        afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || 'not set',
        afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || 'not set',
        webhookSecret: !!process.env.CLERK_WEBHOOK_SECRET,
      },
      // Optional AI
      ai: {
        openai: !!process.env.OPENAI_API_KEY,
        anthropic: !!process.env.ANTHROPIC_API_KEY,
      }
    },
    // Test connections
    connectionTests: {}
  };

  // Test Supabase connection
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = createClient();
      const { error } = await supabase.from('badges').select('count(*)').single();
      envCheck.connectionTests.supabase = error ? `Failed: ${error.message}` : 'Connected';
    } else {
      envCheck.connectionTests.supabase = 'Missing credentials';
    }
  } catch (error: any) {
    envCheck.connectionTests.supabase = `Error: ${error.message}`;
  }

  // Test Clerk
  try {
    if (process.env.CLERK_SECRET_KEY) {
      envCheck.connectionTests.clerk = 'Credentials present';
    } else {
      envCheck.connectionTests.clerk = 'Missing credentials';
    }
  } catch (error: any) {
    envCheck.connectionTests.clerk = `Error: ${error.message}`;
  }

  return NextResponse.json(envCheck, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}