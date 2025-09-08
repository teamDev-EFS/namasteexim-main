@echo off
echo 🚀 Building Frontend for Production with Render Backend
echo =====================================================
echo.

echo 📋 Configuration:
echo    Frontend: Will be deployed to Hostinger
echo    Backend: https://namasteexim-main.onrender.com
echo    Environment: Production
echo.

echo 🔧 Setting up production environment...
if not exist ".env.production" (
    echo ❌ .env.production file not found!
    echo Please create .env.production with VITE_API_URL=https://namasteexim-main.onrender.com
    pause
    exit /b 1
)

echo ✅ .env.production file found

echo.
echo 📦 Building frontend for production...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Frontend build completed successfully!

echo.
echo 🎯 Production Build Summary:
echo ============================
echo.
echo 📁 Build Output: dist/ folder
echo 🌐 Frontend URL: https://www.namasteeximventures.com (after deployment)
echo 🔧 Backend URL: https://namasteexim-main.onrender.com
echo.
echo 📱 API Endpoints (from frontend):
echo    Health: https://namasteexim-main.onrender.com/api/health
echo    Contact: https://namasteexim-main.onrender.com/api/contact
echo    Quote: https://namasteexim-main.onrender.com/api/quote
echo.
echo 🚀 Ready for Hostinger deployment!
echo.
echo Next Steps:
echo 1. Upload dist/ folder contents to Hostinger public_html
echo 2. Configure domain settings in Hostinger
echo 3. Test the deployed frontend
echo.
pause
