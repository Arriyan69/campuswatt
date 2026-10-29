@echo off
title Push CampusWatt to GitHub (Arriyan69)
cd /d "%~dp0"

echo ======================================================================
echo             Pushing CampusWatt to GitHub (Arriyan69)
echo ======================================================================
echo.

:: Clear previous GitHub credential if signed in as a different user (e.g. Khawar-Khattak)
echo [1/3] Removing old saved Git credentials for github.com...
cmdkey /delete:LegacyGeneric:target=git:https://github.com 2>nul
echo Done.
echo.

:: Ensure origin is set
echo [2/3] Setting remote origin to https://github.com/Arriyan69/campuswatt.git...
git remote set-url origin https://github.com/Arriyan69/campuswatt.git 2>nul
if %errorlevel% neq 0 (
    git remote add origin https://github.com/Arriyan69/campuswatt.git
)
echo Done.
echo.

:: Push to GitHub
echo [3/3] Pushing all files (including src/ and public/) to GitHub main branch...
echo A browser window or login prompt may open asking you to sign in as Arriyan69.
echo.
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ======================================================================
    echo [SUCCESS] Code pushed successfully to GitHub!
    echo Vercel will now automatically rebuild and deploy your app.
    echo ======================================================================
) else (
    echo.
    echo [NOTE] If you encounter any authentication error, you can also:
    echo 1. Open https://github.com/Arriyan69/campuswatt in your browser
    echo 2. Click "Add file" - "Upload files"
    echo 3. Drag and drop the "src" and "public" folders from D:\SobyWeb
    echo 4. Click "Commit changes".
)

echo.
pause
