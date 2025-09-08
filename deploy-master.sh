#!/bin/bash

echo "🚀 Namaste EXIM Ventures - Master Branch Deployment"
echo "=================================================="
echo ""

# Check if we're on master branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "master" ]; then
    echo "⚠️  Warning: You're not on the master branch (current: $current_branch)"
    echo "   This script is designed for master branch deployment"
    echo ""
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

echo "📋 Deployment Configuration:"
echo "   Primary Domain: www.namasteeximventures.com"
echo "   Email: namasteeximventures@gmail.com"
echo "   Environment: Production"
echo ""

# Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend build completed"

# Install production dependencies
echo "📥 Installing production dependencies..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Frontend dependencies installation failed!"
    exit 1
fi

cd backend
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Backend dependencies installation failed!"
    exit 1
fi

cd ..

echo "✅ Dependencies installed successfully"

# Verify .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found!"
    echo "   Please ensure environment variables are configured in Hostinger"
fi

echo ""
echo "🎯 Deployment Ready!"
echo "==================="
echo ""
echo "📁 Next Steps:"
echo "   1. Upload the entire project to Hostinger public_html directory"
echo "   2. Configure Node.js settings in Hostinger control panel:"
echo "      - Node.js version: 18.x or higher"
echo "      - Application root: your domain folder"
echo "      - Application startup file: server.js"
echo "      - Application URL: https://www.namasteeximventures.com"
echo ""
echo "   3. Set environment variables in Hostinger:"
echo "      - PORT=5000"
echo "      - NODE_ENV=production"
echo "      - MONGODB_URI=your_mongodb_connection_string"
echo "      - SMTP_USER=namasteeximventures@gmail.com"
echo "      - SMTP_PASS=zqpu zoes ccmd wfnp"
echo "      - ADMIN_EMAIL=namasteeximventures@gmail.com"
echo "      - FRONTEND_EMAIL=namasteeximventures@gmail.com"
echo "      - PRIMARY_DOMAIN=www.namasteeximventures.com"
echo "      - FALLBACK_DOMAIN=namasteeximventures.com"
echo "      - FRONTEND_URL=https://www.namasteeximventures.com"
echo ""
echo "   4. Start your Node.js application in Hostinger"
echo ""
echo "   5. Test your deployment:"
echo "      - https://www.namasteeximventures.com"
echo "      - https://www.namasteeximventures.com/api/health"
echo "      - Contact form functionality"
echo "      - Quote request functionality"
echo ""
echo "🔗 Domain Configuration:"
echo "   Primary: www.namasteeximventures.com"
echo "   Fallback: namasteeximventures.com"
echo "   Aliases: namasteexim.com, www.namasteexim.com"
echo ""
echo "📧 Email Configuration:"
echo "   SMTP: namasteeximventures@gmail.com"
echo "   App Password: zqpu zoes ccmd wfnp"
echo ""
echo "✅ Ready for Hostinger deployment!"
