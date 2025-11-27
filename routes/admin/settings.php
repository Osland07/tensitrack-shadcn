<?php

use App\Http\Controllers\Admin\AdminPasswordController;
use App\Http\Controllers\Admin\AdminProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [AdminProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [AdminPasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [AdminPasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('Admin/Settings/Appearance');
    })->name('appearance.edit');
});
