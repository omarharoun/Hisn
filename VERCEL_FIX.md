# Fix for Vercel "unmatched-function-pattern" Error

## Problem
Vercel is showing the error: "The pattern 'packages/web/src/app/api/**/*.ts' defined in `functions` doesn't match any Serverless Functions."

## Root Cause
This error occurs because:
1. Vercel is trying to match API routes as traditional serverless functions
2. Next.js API routes are handled by the Next.js framework, not as separate serverless functions
3. The monorepo structure is confusing Vercel's detection

## Solution

### Option 1: Deploy from Web Package Directory (Recommended)
Instead of deploying from the root, deploy directly from the web package:

```bash
cd packages/web
npx vercel --prod
```

### Option 2: Configure Vercel Project Settings
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > General
4. Set the following:
   - **Root Directory**: `packages/web`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Option 3: Use Vercel CLI with Root Directory
```bash
npx vercel --prod --cwd packages/web
```

### Option 4: Create a .vercelignore file
Create a `.vercelignore` file in the root directory:

```
node_modules
.git
.env.local
.env.development.local
.env.test.local
.env.production.local
packages/web/node_modules
packages/web/.next
packages/web/.vercel
database/
docker/
k8s/
terraform/
supabase/
scripts/
*.md
```

## Why This Happens
- Next.js API routes are not traditional serverless functions
- They are handled by the Next.js framework during runtime
- Vercel's function pattern matching is designed for traditional serverless functions
- The monorepo structure confuses Vercel's auto-detection

## Verification
After applying the fix, you should see:
- No "unmatched-function-pattern" errors
- API routes working correctly
- Proper Next.js deployment

## Environment Variables Required
Make sure to set these in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`