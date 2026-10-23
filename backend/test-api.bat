@echo off
REM Test all TravelBuddy API endpoints

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Testing TravelBuddy Backend API
echo ========================================
echo.

set API_BASE=http://localhost:8080

echo Waiting for server to start...
timeout /t 3 /nobreak

echo.
echo [1/4] Testing GET /destinations/india
echo.
echo Endpoint: %API_BASE%/destinations/india
curl -X GET "%API_BASE%/destinations/india" -H "Content-Type: application/json" -v
echo.
echo.

echo [2/4] Testing GET /destinations
echo.
echo Endpoint: %API_BASE%/destinations
curl -X GET "%API_BASE%/destinations" -H "Content-Type: application/json" -v
echo.
echo.

echo [3/4] Testing GET /places?city=Taj
echo.
echo Endpoint: %API_BASE%/places?city=Taj
curl -X GET "%API_BASE%/places?city=Taj" -H "Content-Type: application/json" -v
echo.
echo.

echo [4/4] Testing GET /weather?city=Agra
echo.
echo Endpoint: %API_BASE%/weather?city=Agra
curl -X GET "%API_BASE%/weather?city=Agra" -H "Content-Type: application/json" -v
echo.
echo.

echo ========================================
echo All tests completed!
echo ========================================
echo.

pause
