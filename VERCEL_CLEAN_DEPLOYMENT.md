# Clean Vercel Deployment - Fix for Functions Pattern Error

## Problem
Vercel is still showing: "The pattern 'packages/web/src/app/api/**/*.ts' defined in `functions` doesn't match any Serverless Functions."

This error persists even after removing functions configuration because Vercel may be using cached settings.

## Solution: Clean Deployment

### Step 1: Clear Vercel Cache
```bash
# Remove local Vercel cache
rm -rf .vercel
rm -rf packages/web/.vercel

# Clear Vercel CLI cache
npx vercel logout
npx vercel login
```

### Step 2: Deploy from Web Package Directory
```bash
cd packages/web
npx vercel --prod
```

### Step 3: Alternative - Force Clean Deploy
If the above doesn't work, try:

```bash
cd packages/web
npx vercel --prod --force
```

### Step 4: Check Vercel Dashboard Settings
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > General
4. Verify these settings:
   - **Root Directory**: `packages/web` (or leave empty if deploying from web directory)
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Framework**: Next.js

### Step 5: Remove Functions Configuration from Dashboard
1. In Vercel dashboard, go to Settings > Functions
2. Remove any function patterns or configurations
3. Save the settings

## Why This Happens
- Vercel caches project configuration
- Previous deployments may have set functions patterns
- The monorepo structure confuses Vercel's auto-detection
- Next.js API routes don't need functions configuration

## Verification
After following these steps:
- No "unmatched-function-pattern" errors
- API routes work correctly
- Clean deployment without cached issues

## Environment Variables
Make sure these are set in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

## If Still Not Working
Try creating a new Vercel project:
1. Delete the current project in Vercel dashboard
2. Create a new project
3. Connect to the same GitHub repository
4. Deploy from the web package directory