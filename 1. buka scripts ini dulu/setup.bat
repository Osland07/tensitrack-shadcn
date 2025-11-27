@echo off
cd "%~dp0\.."

echo =========================================
echo Initializing Laravel Application Setup
echo =========================================
echo This script will perform the following tasks:
echo 1. Check for and copy .env file if missing.
echo 2. Install Composer (PHP) dependencies.
echo 3. Generate application key.
echo 4. Run database migrations.
echo 5. Run database seeders.
echo 6. Create storage link.
echo 7. Install Node.js (NPM) dependencies.
echo 8. Generate Wayfinder routes.
echo 9. Run Laravel Pint for code formatting.
echo =========================================
echo Press any key to start the setup...
pause
cls

echo =========================================
echo Task 1/9: Checking for .env file
echo =========================================
IF NOT EXIST .env (
    echo Starting: Checking for .env file and copying if missing...
    copy .env.example .env > NUL
    if %errorlevel% equ 0 (
        echo Finished: .env file copied successfully.
        timeout /t 2 /nobreak > NUL
    ) else (
        echo ERROR: Copying .env.example to .env failed!
        pause
        exit /b %errorlevel%
    )
) ELSE (
    echo .env file already exists, skipping copy.
    timeout /t 2 /nobreak > NUL
)

echo =========================================
echo Task 2/9: Installing Composer dependencies
echo =========================================
echo Starting: Installing Composer dependencies in a new window...
start /wait "Composer Install" cmd /c "cd "%~dp0\.." && composer install && exit"
if %errorlevel% equ 0 (
    echo Finished: Installing Composer dependencies.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Installing Composer dependencies failed! Check the Composer Install window for details.
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 3/9: Generating application key
echo =========================================
echo Starting: Generating application key...
php artisan key:generate
if %errorlevel% equ 0 (
    echo Finished: Generating application key.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Generating application key failed!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 4/9: Running database migrations
echo =========================================
echo Starting: Running database migrations...
php artisan migrate --force
if %errorlevel% equ 0 (
    echo Finished: Running database migrations.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Running database migrations failed!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 5/9: Running database seeders
echo =========================================
echo Starting: Running database seeders...
php artisan db:seed
if %errorlevel% equ 0 (
    echo Finished: Running database seeders.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Running database seeders failed!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 6/9: Creating storage link
echo =========================================
echo Starting: Creating storage link...
php artisan storage:link
if %errorlevel% equ 0 (
    echo Finished: Creating storage link.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Creating storage link failed!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 7/9: Installing Node.js dependencies
echo =========================================
echo Starting: Installing Node.js dependencies in a new window...
start /wait "NPM Install" cmd /c "cd "%~dp0\.." && npm install && exit"
if %errorlevel% equ 0 (
    echo Finished: Installing Node.js dependencies.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Installing Node.js dependencies failed! Check the NPM Install window for details.
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 8/9: Generating Wayfinder routes
echo =========================================
echo Starting: Generating Wayfinder routes...
php artisan wayfinder:generate
if %errorlevel% equ 0 (
    echo Finished: Generating Wayfinder routes.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Generating Wayfinder routes failed!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Task 9/9: Running Laravel Pint for code formatting
echo =========================================
echo Starting: Running Laravel Pint for code formatting...
vendor\bin\pint --dirty
if %errorlevel% equ 0 (
    echo Finished: Running Laravel Pint for code formatting.
    timeout /t 2 /nobreak > NUL
) else (
    echo ERROR: Running Laravel Pint for code formatting failed!
    pause
    exit /b %errorlevel%
)

echo =========================================
echo Setup complete!
echo All tasks have been processed.
echo =========================================
pause