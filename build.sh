#!/bin/bash

# Namaste EXIM Build Script for Hostinger Deployment
echo "🚀 Building Namaste EXIM for production deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Please create one from env.example"
    echo "   Copy env.example to .env and update the values"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Files are in the 'dist' directory"
    echo "📁 Ready for deployment to Hostinger"
    echo ""
    echo "Next steps:"
    echo "1. Upload all files to your Hostinger public_html directory"
    echo "2. Make sure .env file is uploaded"
    echo "3. Run: npm install --production"
    echo "4. Start with: npm start or pm2 start server.js"
else
    echo "❌ Build failed! Please check the errors above"
    exit 1
fi
