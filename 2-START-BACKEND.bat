@echo off
color 0A
echo.
echo ========================================
echo STARTING BACKEND SERVER
echo ========================================
echo.
echo Backend will start on: http://localhost:8080
echo.
echo DO NOT CLOSE THIS WINDOW!
echo Keep it open while using the app.
echo.
echo ========================================
echo.

cd /d "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"
call mvnw.cmd spring-boot:run

pause
