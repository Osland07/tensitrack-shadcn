@echo off
chcp 65001 > nul
for /f ""usebackq tokens=*" %%a in (`"prompt $E$H & for %%b in (1) do rem"`) do set "ESC=%%a"
set GREEN_TEXT=%ESC%[92m
set RED_TEXT=%ESC%[91m
set RESET_COLOR=%ESC%[0m
cd "%~dp0\.."

REM Check if .env exists, if not, run setup.bat
IF NOT EXIST .env (
    echo Memulai: Memeriksa file .env dan menjalankan penyiapan awal jika tidak ada...
    call scripts\setup.bat
    IF ERRORLEVEL 1 (
        echo ^%RED_TEXT^%ERROR: Penyiapan awal gagal! Keluar.^%RESET_COLOR^%
        goto :eof
    ) ELSE (
        echo ^%GREEN_TEXT^%Selesai: Penyiapan awal selesai.^%RESET_COLOR^%
    )
) ELSE (
    echo File .env ditemukan, melewati penyiapan.
)

echo Memulai: Membangun aset frontend...
call npm run build
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Aset frontend berhasil dibangun.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Pembangunan aset frontend gagal!^%RESET_COLOR^%
    pause
    goto :eof
)
echo Memulai server pengembangan Laravel dan bundler aset Vite...
pause

start "Laravel Artisan Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
