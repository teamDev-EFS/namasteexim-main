@echo off
echo 🚀 Starting Namaste EXIM Deployment...
echo.

echo 📦 Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

echo.
echo 📥 Installing production dependencies...
call npm install --production
if %errorlevel% neq 0 (
    echo ❌ Frontend dependencies installation failed!
    pause
    exit /b 1
)

echo.
echo 📥 Installing backend dependencies...
cd backend
call npm install --production
if %errorlevel% neq 0 (
    echo ❌ Backend dependencies installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ Deployment preparation complete!
echo.
echo 📋 Next Steps:
echo 1. 📁 Upload the entire project to your Hostinger public_html directory
echo 2. 🔧 Configure Node.js settings in Hostinger control panel
echo 3. 🌐 Set environment variables in Hostinger
echo 4. ▶️ Start your Node.js application
echo.
echo 📖 For detailed instructions, see HOSTINGER_DEPLOYMENT_GUIDE.md
echo.
pause
