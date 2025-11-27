@echo off
setlocal enabledelayedexpansion
cd "%~dp0\.."

echo =========================================
echo Inisialisasi Penyiapan Aplikasi Laravel
echo =========================================
echo Tekan sembarang tombol untuk memulai penyiapan...
pause
cls

:CHECK_ENV
echo =========================================
echo Tugas 1/9: Memeriksa file .env
echo =========================================
IF NOT EXIST .env (
    echo File .env tidak ditemukan, menyalin .env.example...
    copy .env.example .env > NUL
    if !errorlevel! neq 0 (
        echo ERROR: Gagal menyalin file .env!
        echo ERRORLEVEL: !errorlevel!
        pause
        goto END
    )
    echo Selesai: .env berhasil dibuat.
) ELSE (
    echo File .env sudah ada, melewati.
)
timeout /t 1 >nul


echo =========================================
echo Tugas 2/9: Composer Install
echo =========================================
cmd /c composer install
if !errorlevel! neq 0 (
    echo ERROR: Composer gagal dijalankan!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
echo Selesai composer install.
timeout /t 1 >nul


echo =========================================
echo Tugas 3/9: php artisan key:generate
echo =========================================
cmd /c php artisan key:generate
if !errorlevel! neq 0 (
    echo ERROR: key:generate gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
timeout /t 1 >nul


echo =========================================
echo Tugas 4/9: php artisan migrate --force
echo =========================================
cmd /c php artisan migrate --force
if !errorlevel! neq 0 (
    echo ERROR: migrate gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
timeout /t 1 >nul


echo =========================================
echo Tugas 5/9: php artisan db:seed
echo =========================================
cmd /c php artisan db:seed
if !errorlevel! neq 0 (
    echo ERROR: seed gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
timeout /t 1 >nul


echo =========================================
echo Tugas 6/9: php artisan storage:link
echo =========================================
cmd /c php artisan storage:link
if !errorlevel! neq 0 (
    echo ERROR: storage:link gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
timeout /t 1 >nul


echo =========================================
echo Tugas 7/9: npm install
echo =========================================
cmd /c npm install
if !errorlevel! neq 0 (
    echo ERROR: npm gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
timeout /t 1 >nul


echo =========================================
echo Tugas 8/9: php artisan wayfinder:generate
echo =========================================
cmd /c php artisan wayfinder:generate
if !errorlevel! neq 0 (
    echo ERROR: Wayfinder gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)
timeout /t 1 >nul


echo =========================================
echo Tugas 9/9: Laravel Pint
echo =========================================
cmd /c vendor\bin\pint --dirty
if !errorlevel! neq 0 (
    echo ERROR: Pint gagal!
    echo ERRORLEVEL: !errorlevel!
    pause
    goto END
)

echo =========================================
echo Semua tugas selesai!
echo =========================================
pause
goto :EOF

:END
echo -----------------------------------------
echo Proses dihentikan karena terjadi error.
echo -----------------------------------------
pause
