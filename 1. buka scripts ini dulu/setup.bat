@echo off
cd "%~dp0\.."
echo Starting Laravel Application Setup...
echo.

echo Checking .env file...
IF NOT EXIST .env (
    echo .env file not found, copying .env.example...
    copy .env.example .env > NUL
    if %errorlevel% neq 0 (
        echo ERROR: Failed to copy .env.example to .env!
        exit /b %errorlevel%
    )
    echo .env file copied successfully.
) ELSE (
    echo .env file already exists, skipping.
)

echo Installing Composer dependencies...
composer install
if %errorlevel% neq 0 (
    echo ERROR: Composer dependency installation failed!
    exit /b %errorlevel%
)
echo Composer dependencies installed.

echo Generating application key...
php artisan key:generate
if %errorlevel% neq 0 (
    echo ERROR: Application key generation failed!
    exit /b %errorlevel%
)
echo Application key generated.

echo Running database migrations...
php artisan migrate --force
if %errorlevel% neq 0 (
    echo ERROR: Database migration failed!
    exit /b %errorlevel%
)
echo Database migrations completed.

echo Running database seeders...
php artisan db:seed
if %errorlevel% neq 0 (
    echo ERROR: Database seeding failed!
    exit /b %errorlevel%
)
echo Database seeding completed.

echo Creating storage link...
php artisan storage:link
if %errorlevel% neq 0 (
    echo ERROR: Storage link creation failed!
    exit /b %errorlevel%
)
echo Storage link created.

echo Installing Node.js dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Node.js dependency installation failed!
    exit /b %errorlevel%
)
echo Node.js dependencies installed.

echo Generating Wayfinder routes...
php artisan wayfinder:generate
if %errorlevel% neq 0 (
    echo ERROR: Wayfinder route generation failed!
    exit /b %errorlevel%
)
echo Wayfinder routes generated.

echo Running Laravel Pint for code formatting...
vendor\bin\pint --dirty
if %errorlevel% neq 0 (
    echo ERROR: Laravel Pint failed!
    exit /b %errorlevel%
)
echo Laravel Pint completed.

echo.
echo Setup complete!