@echo off
echo 🚀 Building Namaste EXIM for production deployment...

REM Check if .env file exists
if not exist .env (
    echo ⚠️  Warning: .env file not found. Please create one from env.example
    echo    Copy env.example to .env and update the values
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the application
echo 🔨 Building application...
npm run build

REM Check if build was successful
if exist dist (
    echo ✅ Build successful! Files are in the 'dist' directory
    echo 📁 Ready for deployment to Hostinger
    echo.
    echo Next steps:
    echo 1. Upload all files to your Hostinger public_html directory
    echo 2. Make sure .env file is uploaded
    echo 3. Run: npm install --production
    echo 4. Start with: npm start or pm2 start server.js
) else (
    echo ❌ Build failed! Please check the errors above
    pause
    exit /b 1
)

pause
