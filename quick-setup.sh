#!/bin/bash

echo "🚀 Namaste EXIM - Quick Setup Script"
echo "====================================="

echo ""
echo "📧 Setting up email configuration..."

# Copy environment template to .env
cp environment-variables.txt .env

if [ -f .env ]; then
    echo "✅ .env file created successfully!"
    echo ""
    echo "📧 Email Configuration:"
    echo "   SMTP Host: smtp.gmail.com"
    echo "   SMTP Port: 587"
    echo "   Email: adityadevops6@gmail.com"
    echo "   App Password: sarc cgtc gkmt chso"
    echo ""
    echo "🧪 Testing email configuration..."
    echo ""
    npm run test:email
else
    echo "❌ Failed to create .env file"
    echo "Please manually copy environment-variables.txt to .env"
fi

echo ""
echo "🎉 Setup complete! You can now:"
echo "   1. Run: npm run build"
echo "   2. Run: npm start"
echo "   3. Deploy to Hostinger"
echo ""
