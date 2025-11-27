@echo off
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
        echo Selesai: File .env berhasil disalin.
        timeout /t 2 /nobreak > NUL
    ) else (
        echo ERROR: Gagal menyalin .env.example ke .env!
        pause
        exit /b %errorlevel%
    )
) ELSE (
    echo File .env sudah ada, melewati penyalinan.
    timeout /t 2 /nobreak > NUL
)

echo =========================================
echo Tugas 2/9: Memasang dependensi Composer
echo =========================================
echo Memulai: Memasang dependensi Composer...
composer install
if %errorlevel% equ 0 (
    echo Selesai: Dependensi Composer berhasil dipasang.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Pemasangan dependensi Composer gagal!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 3/9: Membuat kunci aplikasi
echo =========================================
echo Memulai: Membuat kunci aplikasi...
php artisan key:generate
if %errorlevel% equ 0 (
    echo Selesai: Kunci aplikasi berhasil dibuat.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Pembuatan kunci aplikasi gagal!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 4/9: Menjalankan migrasi database
echo =========================================
echo Memulai: Menjalankan migrasi database...
php artisan migrate --force
if %errorlevel% equ 0 (
    echo Selesai: Migrasi database berhasil dijalankan.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Migrasi database gagal!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 5/9: Menjalankan seeder database
echo =========================================
echo Memulai: Menjalankan seeder database...
php artisan db:seed
if %errorlevel% equ 0 (
    echo Selesai: Seeder database berhasil dijalankan.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Seeder database gagal dijalankan!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 6/9: Membuat tautan penyimpanan (storage link)
echo =========================================
echo Memulai: Membuat tautan penyimpanan (storage link)...
php artisan storage:link
if %errorlevel% equ 0 (
    echo Selesai: Tautan penyimpanan berhasil dibuat.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Pembuatan tautan penyimpanan gagal!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 7/9: Memasang dependensi Node.js (NPM)
echo =========================================
echo Memulai: Memasang dependensi Node.js (NPM)...
npm install
if %errorlevel% equ 0 (
    echo Selesai: Dependensi Node.js berhasil dipasang.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Pemasangan dependensi Node.js gagal!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 8/9: Membuat rute Wayfinder
echo =========================================
echo Memulai: Membuat rute Wayfinder...
php artisan wayfinder:generate
if %errorlevel% equ 0 (
    echo Selesai: Rute Wayfinder berhasil dibuat.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Pembuatan rute Wayfinder gagal!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Tugas 9/9: Menjalankan Laravel Pint untuk pemformatan kode
echo =========================================
echo Memulai: Menjalankan Laravel Pint untuk pemformatan kode...
vendor\bin\pint --dirty
if %errorlevel% equ 0 (
    echo Selesai: Laravel Pint berhasil dijalankan.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Laravel Pint gagal dijalankan!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Penyiapan selesai!
echo Semua tugas telah diproses.
echo =========================================
pause