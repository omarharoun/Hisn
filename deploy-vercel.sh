#!/bin/bash

# Deploy to Vercel from the web package directory
echo "Deploying to Vercel..."

# Navigate to the web package directory
cd packages/web

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"