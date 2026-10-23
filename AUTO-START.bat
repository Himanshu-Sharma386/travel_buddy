@echo off
color 0A
setlocal enabledelayedexpansion

echo.
echo ========================================
echo     BHARAT YATRA - AUTO START
echo ========================================
echo.

cd /d "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy"

REM Step 1: Install dependencies
echo STEP 1: Installing dependencies...
echo.
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
call npm install

if %ERRORLEVEL% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo STEP 1 COMPLETE - Dependencies installed
echo ========================================
echo.
echo STEP 2: Starting Backend Server...
echo.
echo Starting in 5 seconds...
timeout /t 5

REM Step 2: Start backend in new window
start "BACKEND SERVER" cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo Backend started in new window
echo.
echo Waiting 60 seconds for backend to initialize...
timeout /t 60

echo.
echo ========================================
echo STEP 2 COMPLETE - Backend is running
echo ========================================
echo.
echo STEP 3: Starting Frontend Server...
echo.

REM Step 3: Start frontend in new window
start "FRONTEND SERVER" cmd /k "npm run dev"

echo Frontend started in new window
echo.
echo Waiting 15 seconds for frontend to start...
timeout /t 15

echo.
echo ========================================
echo ALL SERVERS ARE RUNNING!
echo ========================================
echo.
echo 🚀 OPEN YOUR BROWSER AND GO TO:
echo.
echo     http://localhost:5173
echo.
echo ========================================
echo.
echo Keep the Command Prompt windows open!
echo.
pause
