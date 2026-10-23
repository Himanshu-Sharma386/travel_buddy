@echo off
REM ============================================
REM TravelBuddy Backend - Automated Test Script
REM ============================================

setlocal enabledelayedexpansion
cls

echo.
echo ============================================
echo TravelBuddy Backend - Function Test Suite
echo ============================================
echo.

set API_BASE=http://localhost:8080
set PASSED=0
set FAILED=0

REM Color codes (Windows doesn't support ANSI by default, using symbols)
set CHECK=✓
set CROSS=✗

echo Checking if server is running...
timeout /t 2 /nobreak > nul

REM Test 1: Indian Destinations API
echo.
echo [TEST 1] GET /destinations/india
echo ================================
powershell -Command "try { $resp = Invoke-WebRequest -Uri '%API_BASE%/destinations/india' -Method Get -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.count -gt 0) { Write-Host '%CHECK% PASSED: Received !$($data.count)! destinations'; exit 0 } else { Write-Host '%CROSS% FAILED: No destinations returned'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Test 2: All Destinations API
echo.
echo [TEST 2] GET /destinations
echo ===========================
powershell -Command "try { $resp = Invoke-WebRequest -Uri '%API_BASE%/destinations' -Method Get -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.count -gt 0) { Write-Host '%CHECK% PASSED: Received !$($data.count)! destinations'; exit 0 } else { Write-Host '%CROSS% FAILED: No destinations returned'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Test 3: Search Places - Taj
echo.
echo [TEST 3] GET /places?city=Taj
echo =============================
powershell -Command "try { $resp = Invoke-WebRequest -Uri '%API_BASE%/places?city=Taj' -Method Get -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.Count -gt 0) { Write-Host '%CHECK% PASSED: Found !$($data.Count)! place(s) matching Taj'; exit 0 } else { Write-Host '%CROSS% FAILED: No places found'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Test 4: Search Places - Goa
echo.
echo [TEST 4] GET /places?city=Goa
echo =============================
powershell -Command "try { $resp = Invoke-WebRequest -Uri '%API_BASE%/places?city=Goa' -Method Get -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.Count -gt 0) { Write-Host '%CHECK% PASSED: Found !$($data.Count)! place(s) matching Goa'; exit 0 } else { Write-Host '%CROSS% FAILED: No places found'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Test 5: Weather API
echo.
echo [TEST 5] GET /weather?city=Agra
echo ================================
powershell -Command "try { $resp = Invoke-WebRequest -Uri '%API_BASE%/weather?city=Agra' -Method Get -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.city -eq 'Agra') { Write-Host '%CHECK% PASSED: Weather data retrieved for Agra'; exit 0 } else { Write-Host '%CROSS% FAILED: Invalid weather data'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Test 6: Route API
echo.
echo [TEST 6] GET /route?from=Delhi^&to=Agra
echo ========================================
powershell -Command "try { $resp = Invoke-WebRequest -Uri '%API_BASE%/route?from=Delhi&to=Agra' -Method Get -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.from -eq 'Delhi' -and $data.to -eq 'Agra') { Write-Host '%CHECK% PASSED: Route data retrieved'; exit 0 } else { Write-Host '%CROSS% FAILED: Invalid route data'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Test 7: Generate Trip
echo.
echo [TEST 7] POST /generate-trip
echo ============================
powershell -Command "try { $body = @{ destination='Jaipur'; budget=50000; startDate='2024-10-15'; endDate='2024-10-20'; preferences='luxury' } | ConvertTo-Json; $resp = Invoke-WebRequest -Uri '%API_BASE%/generate-trip' -Method Post -Headers @{'Content-Type'='application/json'} -Body $body -ErrorAction Stop; $data = $resp.Content | ConvertFrom-Json; if ($data.destination -eq 'Jaipur' -and $data.saved) { Write-Host '%CHECK% PASSED: Trip generated and saved'; exit 0 } else { Write-Host '%CROSS% FAILED: Invalid trip data'; exit 1 } } catch { Write-Host '%CROSS% FAILED: $_'; exit 1 }"
if %ERRORLEVEL% equ 0 (
    set /a PASSED+=1
) else (
    set /a FAILED+=1
)

REM Summary
echo.
echo ============================================
echo TEST SUMMARY
echo ============================================
echo.
echo Passed: !PASSED!
echo Failed: !FAILED!
echo Total:  !PASSED! + !FAILED!
echo.

if !FAILED! equ 0 (
    echo ✓ ALL TESTS PASSED!
    exit /b 0
) else (
    echo ✗ SOME TESTS FAILED!
    exit /b 1
)

pause
