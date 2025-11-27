@echo off
chcp 65001 > nul
for /f ""usebackq tokens=*" %%a in (`"prompt $E$H & for %%b in (1) do rem"`) do set "ESC=%%a"
set GREEN_TEXT=%ESC%[92m
set RED_TEXT=%ESC%[91m
set RESET_COLOR=%ESC%[0m
cd "%~dp0\.."

echo =========================================
echo Inisialisasi Penyiapan Aplikasi Laravel
echo =========================================
echo Skrip ini akan melakukan tugas-tugas berikut:
echo 1. Memeriksa dan menyalin file .env jika tidak ada.
echo 2. Memasang dependensi Composer (PHP).
echo 3. Membuat kunci aplikasi.
echo 4. Menjalankan migrasi database.
echo 5. Menjalankan seeder database.
echo 6. Membuat tautan penyimpanan (storage link).
echo 7. Memasang dependensi Node.js (NPM).
echo 8. Membuat rute Wayfinder.
echo 9. Menjalankan Laravel Pint untuk pemformatan kode.
echo =========================================
echo Tekan sembarang tombol untuk memulai penyiapan...
pause
cls

echo =========================================
echo Tugas 1/9: Memeriksa file .env
echo =========================================
IF NOT EXIST .env (
    echo Memulai: Memeriksa file .env dan menyalin jika tidak ada...
    copy .env.example .env > NUL
    if %errorlevel% equ 0 (
        echo ^%GREEN_TEXT^%Selesai: File .env berhasil disalin.^%RESET_COLOR^%
    ) else (
        echo ^%RED_TEXT^%ERROR: Gagal menyalin .env.example ke .env!^%RESET_COLOR^%
        pause
        exit /b %errorlevel%
    )
) ELSE (
    echo File .env sudah ada, melewati penyalinan.
)

echo =========================================
echo Tugas 2/9: Memasang dependensi Composer
echo =========================================
echo Memulai: Memasang dependensi Composer...
composer install
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Dependensi Composer berhasil dipasang.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Pemasangan dependensi Composer gagal!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 3/9: Membuat kunci aplikasi
echo =========================================
echo Memulai: Membuat kunci aplikasi...
php artisan key:generate
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Kunci aplikasi berhasil dibuat.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Pembuatan kunci aplikasi gagal!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 4/9: Menjalankan migrasi database
echo =========================================
echo Memulai: Menjalankan migrasi database...
php artisan migrate --force
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Migrasi database berhasil dijalankan.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Migrasi database gagal!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 5/9: Menjalankan seeder database
echo =========================================
echo Memulai: Menjalankan seeder database...
php artisan db:seed
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Seeder database berhasil dijalankan.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Seeder database gagal dijalankan!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 6/9: Membuat tautan penyimpanan (storage link)
echo =========================================
echo Memulai: Membuat tautan penyimpanan (storage link)...
php artisan storage:link
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Tautan penyimpanan berhasil dibuat.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Pembuatan tautan penyimpanan gagal!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 7/9: Memasang dependensi Node.js (NPM)
echo =========================================
echo Memulai: Memasang dependensi Node.js (NPM)...
npm install
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Dependensi Node.js berhasil dipasang.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Pemasangan dependensi Node.js gagal!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 8/9: Membuat rute Wayfinder
echo =========================================
echo Memulai: Membuat rute Wayfinder...
php artisan wayfinder:generate
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Rute Wayfinder berhasil dibuat.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Pembuatan rute Wayfinder gagal!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 9/9: Menjalankan Laravel Pint untuk pemformatan kode
echo =========================================
echo Memulai: Menjalankan Laravel Pint untuk pemformatan kode...
vendor\bin\pint --dirty
if %errorlevel% equ 0 (
    echo ^%GREEN_TEXT^%Selesai: Laravel Pint berhasil dijalankan.^%RESET_COLOR^%
) else (
    echo ^%RED_TEXT^%ERROR: Laravel Pint gagal dijalankan!^%RESET_COLOR^%
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Penyiapan selesai!
echo Semua tugas telah diproses.
echo =========================================
pause