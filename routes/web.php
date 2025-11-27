<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\RiskFactor;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'riskFactors' => RiskFactor::select('code', 'name')->get(),
    ]);
})->name('home');

Route::post('/screening/submit', [\App\Http\Controllers\ScreeningController::class, 'store'])->name('screening.submit');

Route::get('/screening', function () {
    return Inertia::render('screening/index', [
        'riskFactors' => RiskFactor::select('code', 'name')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('screening.index');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::get('/screenings', [\App\Http\Controllers\Admin\ScreeningHistoryController::class, 'index'])
            ->name('admin.screenings.index');

        Route::get('/screenings/{screening}', [\App\Http\Controllers\Admin\ScreeningHistoryController::class, 'show'])
            ->name('admin.screenings.show');

        Route::get('/rules', function (\App\Services\HypertensionInferenceService $inferenceService) {
            return Inertia::render('dashboard/rules', [
                'rules' => $inferenceService->getRules(),
                'riskFactors' => \App\Models\RiskFactor::all()->pluck('name', 'code'),
            ]);
        })->name('admin.rules');
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::patch('/profile/bmi-update', [\App\Http\Controllers\ProfileController::class, 'updateBmi'])->name('profile.bmi.update');
    Route::patch('/profile-user', [\App\Http\Controllers\ProfileController::class, 'updateProfile'])->name('profile-user.update');

    Route::get('/profile-user/edit', function () {
        $user = auth()->user();
        $screenings = $user->screenings()->with('riskLevel')->latest()->get();

        return Inertia::render('ProfileUser/Edit', [
            'screenings' => $screenings,
        ]);
    })->name('profile-user.edit');
});

require __DIR__.'/settings.php';

Route::get('/riwayat-skrining', [App\Http\Controllers\ScreeningController::class, 'index'])->middleware(['auth'])->name('screenings.index');
