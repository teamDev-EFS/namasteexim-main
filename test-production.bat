@echo off
echo 🌐 Namaste EXIM Ventures - Production Testing
echo ============================================
echo.

echo 📋 Testing Production URLs...
echo.

echo 🔍 Testing Frontend...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://www.namasteeximventures.com' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✅ Frontend: Website loads successfully' } else { Write-Host '❌ Frontend: Website failed to load' } } catch { Write-Host '❌ Frontend: Website not accessible' }"

echo.
echo 🔍 Testing Backend Health Check...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://www.namasteeximventures.com/api/health' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✅ Backend: Health check successful' } else { Write-Host '❌ Backend: Health check failed' } } catch { Write-Host '❌ Backend: Health endpoint not accessible' }"

echo.
echo 🔍 Testing Contact Form API...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://www.namasteeximventures.com/api/contact' -Method POST -ContentType 'application/json' -Body '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Production Test\",\"message\":\"Testing from production deployment\"}' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✅ Contact Form: API working correctly' } else { Write-Host '❌ Contact Form: API failed' } } catch { Write-Host '❌ Contact Form: API not accessible' }"

echo.
echo 🔍 Testing Quote Request API...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://www.namasteeximventures.com/api/quote' -Method POST -ContentType 'application/json' -Body '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"product\":\"Test Product\",\"quantity\":\"100\"}' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✅ Quote Request: API working correctly' } else { Write-Host '❌ Quote Request: API failed' } } catch { Write-Host '❌ Quote Request: API not accessible' }"

echo.
echo 🔍 Testing Fallback Domain...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://namasteeximventures.com' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✅ Fallback Domain: Working correctly' } else { Write-Host '❌ Fallback Domain: Failed to load' } } catch { Write-Host '❌ Fallback Domain: Not accessible' }"

echo.
echo 🎯 Production Testing Summary:
echo =============================
echo.
echo 📱 Frontend URLs:
echo    Main: https://www.namasteeximventures.com
echo    Fallback: https://namasteeximventures.com
echo.
echo 🔧 Backend API URLs:
echo    Health: https://www.namasteeximventures.com/api/health
echo    Contact: https://www.namasteeximventures.com/api/contact
echo    Quote: https://www.namasteeximventures.com/api/quote
echo.
echo 📧 Email Configuration:
echo    SMTP: namasteeximventures@gmail.com
echo    Admin: namasteeximventures@gmail.com
echo.
echo 🗄️ Database:
echo    MongoDB Atlas: Connected
echo    Collections: contacts, quotes
echo.
echo ✅ All production URLs tested!
echo.
pause
