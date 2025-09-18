# Vercel Environment Variables Checklist

## Required Environment Variables

Make sure all these environment variables are set in your Vercel project settings:

### Supabase Configuration
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side operations)

### Clerk Authentication
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
- [ ] `CLERK_SECRET_KEY` - Your Clerk secret key
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Set to `/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Set to `/sign-up`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - Set to `/dashboard`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - Set to `/dashboard`
- [ ] `CLERK_WEBHOOK_SECRET` - Your Clerk webhook secret (if using webhooks)

### Optional AI Services (if using AI features)
- [ ] `OPENAI_API_KEY` - Your OpenAI API key
- [ ] `ANTHROPIC_API_KEY` - Your Anthropic API key

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the appropriate value
4. Make sure to select the correct environments (Production, Preview, Development)
5. Redeploy your application after adding all variables

## Debugging Tips

1. Check Vercel Function Logs:
   - Go to Functions tab in Vercel dashboard
   - Look for error logs related to missing environment variables

2. Use Vercel CLI for local development:
   ```bash
   vercel env pull .env.local
   ```

3. Test environment variables locally:
   ```bash
   npm run dev
   ```

4. Verify all variables are loaded:
   - Check browser console for any missing NEXT_PUBLIC_* variables
   - Check server logs for missing server-side variables