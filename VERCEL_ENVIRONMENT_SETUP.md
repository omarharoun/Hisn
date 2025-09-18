# Vercel Environment Variables Setup

## Required Environment Variables

To deploy this Next.js application to Vercel, you need to set the following environment variables in your Vercel project settings:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Application Configuration
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with its corresponding value
5. Make sure to set them for all environments (Production, Preview, Development)

## Getting Your Keys

### Supabase
1. Go to your Supabase project dashboard
2. Go to Settings → API
3. Copy the Project URL and anon/public key
4. For the service role key, copy the service_role key (keep this secret!)

### Clerk
1. Go to your Clerk dashboard
2. Select your application
3. Go to API Keys
4. Copy the Publishable Key and Secret Key

## Important Notes

- Never commit actual environment variables to your repository
- The `.env.local` file is gitignored for security
- Use the `.env.example` file as a template
- Make sure all environment variables are set in Vercel before deploying