<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Screening;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScreeningHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $screenings = Screening::with('user')->latest()->paginate(10); // Fetch all screenings with associated user, paginated

        return Inertia::render('admin/ScreeningHistory/Index', [
            'screenings' => $screenings,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Screening $screening)
    {
        $screening->load('user', 'riskFactors', 'riskLevels'); // Load related data

        // Return JSON response for modal
        return response()->json($screening);
    }
}