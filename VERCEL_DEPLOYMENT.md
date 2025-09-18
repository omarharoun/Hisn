# Vercel Deployment Guide

## Issue
The error "The pattern 'packages/web/src/app/api/**/*.ts' defined in `functions` doesn't match any Serverless Functions" occurs because Vercel is not properly recognizing the monorepo structure.

## Solutions

### Option 1: Deploy from Web Package Directory (Recommended)
Deploy directly from the `packages/web` directory instead of the root:

```bash
cd packages/web
npx vercel --prod
```

This approach uses the `vercel.json` configuration in the web package directory.

### Option 2: Use the Deployment Script
Run the provided deployment script from the root directory:

```bash
./deploy-vercel.sh
```

### Option 3: Configure Vercel Project Settings
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > General
4. Set the following:
   - **Root Directory**: `packages/web`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Option 4: Remove Functions Configuration
For Next.js apps, Vercel should automatically detect API routes. Try removing the `functions` configuration from `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "cd packages/web && npm install && npm run build",
  "outputDirectory": "packages/web/.next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"]
  // Remove the functions section
}
```

## Environment Variables
Make sure to set the following environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

## Troubleshooting
1. Ensure the Next.js app builds successfully locally
2. Check that all API routes are properly structured with `route.ts` files
3. Verify that the `output: 'standalone'` is commented out in `next.config.js` for Vercel deployment
4. Make sure the build command includes both install and build steps