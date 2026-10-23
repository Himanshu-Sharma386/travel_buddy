@echo off
color 0A
echo.
echo ========================================
echo INSTALLING DEPENDENCIES...
echo ========================================
echo.

cd /d "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy"

echo Removing old node_modules...
rmdir /s /q node_modules 2>nul

echo Removing package-lock.json...
del package-lock.json 2>nul

echo Installing npm packages (This may take 2-3 minutes)...
call npm install

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo INSTALLATION COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Run: 2-START-BACKEND.bat
echo 2. Wait 60 seconds for backend to start
echo 3. Run: 3-START-FRONTEND.bat
echo 4. Open: http://localhost:5173
echo.
pause
