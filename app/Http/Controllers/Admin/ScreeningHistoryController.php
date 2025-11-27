<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RiskFactor;
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
        $screening->load('user', 'riskLevel'); // Corrected typo from riskLevels to riskLevel

        // Manually load risk factors based on the 'answers' JSON
        $trueAnswerCodes = collect($screening->answers)
            ->filter(fn ($answered) => $answered === true)
            ->keys();

        $riskFactors = RiskFactor::whereIn('code', $trueAnswerCodes)->get();
        
        // Append the manually loaded risk factors to the screening object
        $screening->risk_factors = $riskFactors;

        // Return JSON response for modal
        return response()->json($screening);
    }
}