#!/bin/bash

echo "🚀 Starting Namaste EXIM Deployment..."
echo

echo "📦 Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo
echo "📥 Installing production dependencies..."
npm install --production
if [ $? -ne 0 ]; then
    echo "❌ Frontend dependencies installation failed!"
    exit 1
fi

echo
echo "📥 Installing backend dependencies..."
cd backend
npm install --production
if [ $? -ne 0 ]; then
    echo "❌ Backend dependencies installation failed!"
    exit 1
fi
cd ..

echo
echo "✅ Deployment preparation complete!"
echo
echo "📋 Next Steps:"
echo "1. 📁 Upload the entire project to your Hostinger public_html directory"
echo "2. 🔧 Configure Node.js settings in Hostinger control panel"
echo "3. 🌐 Set environment variables in Hostinger"
echo "4. ▶️ Start your Node.js application"
echo
echo "📖 For detailed instructions, see HOSTINGER_DEPLOYMENT_GUIDE.md"
echo
