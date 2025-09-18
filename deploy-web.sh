#!/bin/bash

# Deploy the web package to Vercel
echo "Deploying web package to Vercel..."

# Navigate to the web package directory
cd packages/web

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"