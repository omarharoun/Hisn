#!/bin/bash

echo "Deploying monorepo to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: Not in the root directory. Please run from the workspace root."
    exit 1
fi

# Check if packages/web exists
if [ ! -d "packages/web" ]; then
    echo "Error: packages/web directory not found."
    exit 1
fi

# Check if Next.js is installed in packages/web
if [ ! -f "packages/web/package.json" ]; then
    echo "Error: packages/web/package.json not found."
    exit 1
fi

# Install dependencies in root
echo "Installing root dependencies..."
npm install

# Install dependencies in web package
echo "Installing web package dependencies..."
cd packages/web
npm install

# Build the web package
echo "Building web package..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed. Please check the build output."
    exit 1
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"