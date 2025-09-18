# Monorepo Deployment Guide for Vercel

## Problem
Vercel is showing: "No Next.js version detected. Make sure your package.json has 'next' in either 'dependencies' or 'devDependencies'. Also check your Root Directory setting matches the directory of your package.json file."

## Root Cause
Vercel is looking for Next.js in the root directory, but the Next.js app is in `packages/web/`.

## Solutions

### Option 1: Configure Root Directory in Vercel Dashboard (Recommended)
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > General
4. Set **Root Directory** to: `packages/web`
5. Set **Build Command** to: `npm install && npm run build`
6. Set **Output Directory** to: `.next`
7. Set **Install Command** to: `npm install`
8. Set **Framework** to: Next.js

### Option 2: Deploy from Web Package Directory
```bash
cd packages/web
npx vercel --prod
```

### Option 3: Use Vercel CLI with Root Directory
```bash
npx vercel --prod --cwd packages/web
```

### Option 4: Update vercel.json (Already Done)
The `vercel.json` file has been updated with:
```json
{
  "rootDirectory": "packages/web"
}
```

## Verification Steps

1. **Check package.json location**: Next.js should be in `packages/web/package.json`
2. **Verify build command**: Should run from `packages/web` directory
3. **Check output directory**: Should be `packages/web/.next`

## Environment Variables
Set these in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

## File Structure
```
workspace/
├── vercel.json (with rootDirectory: "packages/web")
├── packages/
│   └── web/
│       ├── package.json (contains Next.js)
│       ├── vercel.json
│       ├── next.config.js
│       └── src/
│           └── app/
│               └── api/
```

## Troubleshooting
- If still not working, try deleting and recreating the Vercel project
- Make sure the GitHub repository is connected correctly
- Verify that the build command works locally: `cd packages/web && npm run build`