@echo off
color 0A
echo.
echo ========================================
echo STARTING FRONTEND SERVER
echo ========================================
echo.
echo Frontend will start on: http://localhost:5173
echo.
echo DO NOT CLOSE THIS WINDOW!
echo Keep it open while using the app.
echo.
echo After server starts, open browser and go to:
echo http://localhost:5173
echo.
echo ========================================
echo.

cd /d "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy"
call npm run dev

pause
