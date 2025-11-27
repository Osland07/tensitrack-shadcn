@echo off

REM Check if .env exists, if not, copy from .env.example
IF NOT EXIST .env (
    echo .env file not found, copying from .env.example...
    copy .env.example .env
)

REM Install PHP dependencies
echo Installing Composer dependencies...
composer install

REM Generate application key
echo Generating application key...
php artisan key:generate

REM Run database migrations
echo Running database migrations...
php artisan migrate --force

REM Run database seeders
echo Running database seeders...
php artisan db:seed

REM Create storage link
echo Creating storage link...
php artisan storage:link

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

REM Generate Wayfinder routes
echo Generating Wayfinder routes...
php artisan wayfinder:generate

REM Run Laravel Pint for code formatting
echo Running Laravel Pint for code formatting...
vendor\bin\pint --dirty

echo Setup complete!
