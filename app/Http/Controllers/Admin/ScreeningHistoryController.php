<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FaktorRisiko;
use App\Models\Screening;
use Inertia\Inertia;

class ScreeningHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $screenings = Screening::with('user')->latest()->paginate(10); // Fetch all screenings with associated user, paginated

        return Inertia::render('Admin/RiwayatSkrining/Index', [
            'screenings' => $screenings,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Screening $screening)
    {
        $screening->load('user', 'tingkatRisiko'); // Corrected typo from riskLevels to riskLevel

        // Manually load risk factors based on the 'answers' JSON
        $trueAnswerCodes = collect($screening->answers)
            ->filter(fn ($answered) => $answered === true)
            ->keys();

        $riskFactors = FaktorRisiko::whereIn('kode', $trueAnswerCodes)->get();

        // Append the manually loaded risk factors to the screening object
        $screening->faktor_risiko = $riskFactors;

        // Return JSON response for modal
        return response()->json($screening);
    }
}
