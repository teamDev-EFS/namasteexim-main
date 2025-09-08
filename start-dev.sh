#!/bin/bash

echo "🚀 Namaste EXIM - Development Startup"
echo "====================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📧 Creating .env file from template..."
    cp environment-variables.txt .env
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🧪 Testing email configuration..."
npm run test:email

echo ""
echo "🚀 Starting development servers..."
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo "   Email: adityadevops6@gmail.com"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""

npm run dev:full
