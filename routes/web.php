<?php

use App\Http\Controllers\Client\ClientProfileController;
use App\Models\FaktorRisiko;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// General Routes
Route::get('/', function () {
    return Inertia::render('Client/Home/Index', [
        'canRegister' => Features::enabled(Features::registration()),
        'faktorRisiko' => FaktorRisiko::select('code', 'name')->get(),
    ]);
})->name('home');
Route::post('/screening/submit', [\App\Http\Controllers\ScreeningController::class, 'store'])->name('screening.submit');
Route::get('/screening', function () {
    return Inertia::render('Client/Skrining/Index', [
        'faktorRisiko' => FaktorRisiko::select('code', 'name')->get(),
    ])->name('screening.index');
})->middleware(['auth', 'verified']);

require __DIR__.'/admin/settings.php';

// Client Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::patch('/profile/bmi-update', [ClientProfileController::class, 'updateBmi'])->name('profile.bmi.update');
    Route::patch('/profile-user', [ClientProfileController::class, 'updateProfile'])->name('profile-user.update');
    Route::get('/profile-user/edit', function () {
        $user = auth()->user();
        $screenings = $user->screenings()->with('riskLevel')->latest()->get();

        return Inertia::render('Client/Profil/Edit', [
            'screenings' => $screenings,
        ]);
    })->name('profile-user.edit');
    Route::get('/riwayat-skrining', [\App\Http\Controllers\ScreeningController::class, 'index'])->name('screenings.index');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/screenings', [\App\Http\Controllers\Admin\ScreeningHistoryController::class, 'index'])
            ->name('admin.screenings.index');
        Route::get('/screenings/{screening}', [\App\Http\Controllers\Admin\ScreeningHistoryController::class, 'show'])
            ->name('admin.screenings.show');
        Route::get('/rules', function (\App\Services\HypertensionInferenceService $inferenceService) {
            return Inertia::render('Admin/Rules/Index', [
                'rules' => $inferenceService->getRules(),
                'faktorRisiko' => \App\Models\FaktorRisiko::all()->pluck('name', 'code'),
            ]);
        })->name('admin.rules');
        Route::resource('tingkat-risiko', \App\Http\Controllers\Admin\AdminTingkatRisikoController::class)->except(['show']);
        Route::resource('faktor-risiko', \App\Http\Controllers\Admin\AdminFaktorRisikoController::class)->except(['show']);
    });
});
