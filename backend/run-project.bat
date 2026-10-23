@echo off
REM Build and run the TravelBuddy backend

cd /d "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"

echo.
echo ========================================
echo Building TravelBuddy Backend...
echo ========================================
echo.

call mvnw.cmd clean package -DskipTests

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build Successful!
echo ========================================
echo.
echo Starting TravelBuddy Backend Server...
echo API will be available at: http://localhost:8080
echo.
echo Test Endpoints:
echo   - http://localhost:8080/destinations/india
echo   - http://localhost:8080/destinations
echo.

call mvnw.cmd spring-boot:run

pause
