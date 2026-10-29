@echo off
title CampusWatt — Campus Energy Audit ^& Solar Planner
cd /d "%~dp0"

echo ======================================================================
echo           ⚡ CampusWatt - Pakistan Campus Energy Audit Tool ⚡
echo          Built by Soban, COMSATS University Islamabad
echo               Supporting UN SDG 7 and UN SDG 13
echo ======================================================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in your PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: Check if node_modules exists, if not run npm install
if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Running npm install...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo [INFO] Dependencies installed successfully.
    echo.
)

echo [INFO] Starting CampusWatt local development server...
echo [INFO] The application will open in your default browser at http://localhost:5173/
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo.

:: Start Vite dev server and automatically open browser
call npm run dev -- --open

pause
