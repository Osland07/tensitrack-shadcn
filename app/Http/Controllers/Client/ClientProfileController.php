<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function updateProfile(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'age' => ['nullable', 'integer', 'min:1'],
            'gender' => ['nullable', 'string', 'in:male,female'],
            'systolic' => ['nullable', 'integer'],
            'diastolic' => ['nullable', 'integer'],
        ]);

        $user->update($validated);

        return redirect()->back()->with('status', 'Profil berhasil diperbarui!');
    }

    /**
     * Update the user's height and weight from the BMI calculator.
     */
    public function updateBmi(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'height' => ['required', 'numeric', 'min:1', 'max:300'],
            'weight' => ['required', 'numeric', 'min:1', 'max:500'],
        ]);

        $user = Auth::user();
        $user->update($validated);

        return redirect()->back()->with('status', 'Tinggi dan berat badan Anda telah diperbarui!');
    }
}
