<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profile-user/edit', function () {
        return Inertia::render('ProfileUser/Edit');
    })->name('profile-user.edit');

    Route::prefix('admin')->group(function () {
        Route::get('risk-levels', [\App\Http\Controllers\Admin\RiskLevelController::class, 'index'])
            ->name('risk-levels.index');
        Route::get('risk-levels/create', [\App\Http\Controllers\Admin\RiskLevelController::class, 'create'])
            ->name('risk-levels.create');
        Route::get('risk-levels/{riskLevel}/edit', [\App\Http\Controllers\Admin\RiskLevelController::class, 'edit'])
            ->name('risk-levels.edit');
        Route::post('risk-levels', [\App\Http\Controllers\Admin\RiskLevelController::class, 'store'])
            ->name('risk-levels.store');
        Route::patch('risk-levels/{riskLevel}', [\App\Http\Controllers\Admin\RiskLevelController::class, 'update'])
            ->name('risk-levels.update');
        Route::delete('risk-levels/{riskLevel}', [\App\Http\Controllers\Admin\RiskLevelController::class, 'destroy'])
            ->name('risk-levels.destroy');

        Route::get('risk-factors', [\App\Http\Controllers\Admin\RiskFactorController::class, 'index'])
            ->name('risk-factors.index');
        Route::get('risk-factors/create', [\App\Http\Controllers\Admin\RiskFactorController::class, 'create'])
            ->name('risk-factors.create');
        Route::get('risk-factors/{riskFactor}/edit', [\App\Http\Controllers\Admin\RiskFactorController::class, 'edit'])
            ->name('risk-factors.edit');
        Route::post('risk-factors', [\App\Http\Controllers\Admin\RiskFactorController::class, 'store'])
            ->name('risk-factors.store');
        Route::patch('risk-factors/{riskFactor}', [\App\Http\Controllers\Admin\RiskFactorController::class, 'update'])
            ->name('risk-factors.update');
        Route::delete('risk-factors/{riskFactor}', [\App\Http\Controllers\Admin\RiskFactorController::class, 'destroy'])
            ->name('risk-factors.destroy');
    });
});

require __DIR__.'/settings.php';
