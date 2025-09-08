@echo off
echo 🚀 Namaste EXIM - Development Startup
echo =====================================

REM Check if .env file exists
if not exist .env (
    echo 📧 Creating .env file from template...
    copy environment-variables.txt .env
    echo ✅ .env file created!
) else (
    echo ✅ .env file already exists
)

echo.
echo 🧪 Testing email configuration...
npm run test:email

echo.
echo 🚀 Starting development servers...
echo    Backend: http://localhost:5000
echo    Frontend: http://localhost:3000
echo    Email: adityadevops6@gmail.com
echo.
echo Press Ctrl+C to stop servers
echo.

npm run dev:full
