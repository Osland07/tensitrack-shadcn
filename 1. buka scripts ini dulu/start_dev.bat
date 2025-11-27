@echo off
cd "%~dp0\.."

REM Check if .env exists, if not, run setup.bat
IF NOT EXIST .env (
    echo Starting: Checking for .env file and running initial setup if missing...
    call scripts\setup.bat
    IF ERRORLEVEL 1 (
        echo ERROR: Initial setup failed! Exiting.
        goto :eof
    ) ELSE (
        echo Finished: Initial setup completed.
        timeout /t 2 /nobreak > NUL
    )
) ELSE (
    echo .env file found, skipping setup.
)

echo Starting: Building frontend assets...
call npm run build
if %errorlevel% equ 0 (
    echo Finished: Frontend assets built successfully.
) else (
    echo ERROR: Building frontend assets failed!
    pause
    goto :eof
)
echo Starting Laravel development server and Vite asset bundler...

start "Laravel Artisan Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
