#!/bin/bash

echo "Testing Vercel build process..."

# Clean up any existing builds
rm -rf packages/web/.next
rm -rf packages/web/node_modules

# Run the build command as Vercel would
cd packages/web && npm install && npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed!"
    exit 1
fi