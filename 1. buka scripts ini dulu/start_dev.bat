@echo off
cd "%~dp0\.."

echo Starting Laravel development servers...

start "Laravel Artisan Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
