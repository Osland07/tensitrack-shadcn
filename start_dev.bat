@echo off

REM Check if .env exists, if not, run setup.bat
IF NOT EXIST .env (
    echo .env file not found. Running initial setup...
    call setup.bat
    IF ERRORLEVEL 1 (
        echo Setup failed. Exiting.
        goto :eof
    )
)

echo "Menjalankan build aset frontend..."
call npm run build
echo "Build selesai. Memulai server..."

start "Laravel Artisan Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
