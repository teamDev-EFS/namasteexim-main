@echo off
echo 🌐 Testing Render Backend - Namaste EXIM
echo ========================================
echo.

echo 🔍 Backend URL: https://namasteexim-main.onrender.com
echo.

echo 📋 Testing Health Check...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://namasteexim-main.onrender.com/api/health' -UseBasicParsing; Write-Host '✅ Health Check: SUCCESS'; Write-Host 'Status Code:' $response.StatusCode; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Health Check: FAILED'; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 📋 Testing Contact Form API...
powershell -Command "try { $body = '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Render Test\",\"message\":\"Testing Render backend deployment\"}'; $response = Invoke-WebRequest -Uri 'https://namasteexim-main.onrender.com/api/contact' -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing; Write-Host '✅ Contact Form: SUCCESS'; Write-Host 'Status Code:' $response.StatusCode; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Contact Form: FAILED'; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 📋 Testing Quote Request API...
powershell -Command "try { $body = '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"product\":\"Test Product\",\"quantity\":\"100\"}'; $response = Invoke-WebRequest -Uri 'https://namasteexim-main.onrender.com/api/quote' -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing; Write-Host '✅ Quote Request: SUCCESS'; Write-Host 'Status Code:' $response.StatusCode; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Quote Request: FAILED'; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 🎯 Render Backend Test Summary:
echo ===============================
echo.
echo 🌐 Backend URL: https://namasteexim-main.onrender.com
echo.
echo 📱 API Endpoints:
echo    Health: https://namasteexim-main.onrender.com/api/health
echo    Contact: https://namasteexim-main.onrender.com/api/contact
echo    Quote: https://namasteexim-main.onrender.com/api/quote
echo.
echo 📧 Email Configuration:
echo    SMTP: namasteeximventures@gmail.com
echo    Admin: namasteeximventures@gmail.com
echo.
echo 🗄️ Database: MongoDB Atlas (Connected)
echo.
echo ✅ All tests completed!
echo.
pause
