@echo off
cd "%~dp0\.."

REM Check if .env exists, if not, run setup.bat
IF NOT EXIST .env (
    echo Memulai: Memeriksa file .env dan menjalankan penyiapan awal jika tidak ada...
    call scripts\setup.bat
    IF ERRORLEVEL 1 (
        echo ERROR: Penyiapan awal gagal! Keluar.
        goto :eof
    ) ELSE (
        echo Selesai: Penyiapan awal selesai.
        timeout /t 2 /nobreak > NUL
    )
) ELSE (
    echo File .env ditemukan, melewati penyiapan.
)

echo Memulai: Membangun aset frontend...
call npm run build
if %errorlevel% equ 0 (
    echo Selesai: Aset frontend berhasil dibangun.
) else (
    echo ERROR: Pembangunan aset frontend gagal!
    pause
    goto :eof
)
echo Memulai server pengembangan Laravel dan bundler aset Vite...

start "Laravel Artisan Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
