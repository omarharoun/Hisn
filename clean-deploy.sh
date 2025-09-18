#!/bin/bash

echo "Cleaning Vercel cache and redeploying..."

# Remove Vercel cache directories
echo "Removing Vercel cache..."
rm -rf .vercel
rm -rf packages/web/.vercel

# Navigate to web package
cd packages/web

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy with force flag to clear cache
echo "Deploying to Vercel with force flag..."
vercel --prod --force

echo "Clean deployment complete!"