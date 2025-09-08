@echo off
echo 🔄 Updating .env file with new Gmail App Password...

REM Copy updated environment template to .env
copy environment-variables.txt .env

if exist .env (
    echo ✅ .env file updated successfully!
    echo.
    echo 📧 New Gmail Configuration:
    echo    Email: adityadevops6@gmail.com
    echo    App Password: buqx lanq jljk kpvk
    echo.
    echo 🧪 Testing email configuration...
    echo.
    npm run test:gmail
) else (
    echo ❌ Failed to update .env file
    echo Please manually copy environment-variables.txt to .env
)

echo.
pause
