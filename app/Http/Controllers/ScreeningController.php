<?php

namespace App\Http\Controllers;

use App\Services\HypertensionInferenceService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Screening; // Added import for Screening model

class ScreeningController extends Controller
{
    protected $inferenceService;

    public function __construct(HypertensionInferenceService $inferenceService)
    {
        $this->inferenceService = $inferenceService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Screening::with(['user', 'riskLevel'])->latest();

        if (! $user->is_admin) {
            $query->where('user_id', $user->id);
        }

        $screenings = $query->paginate(10)->withQueryString();

        return Inertia::render('Screenings/History', [
            'screenings' => $screenings,
        ]);
    }

    /**
     * Process the user's screening answers and return the inference results.
     */
    public function store(Request $request)
    {
        // Validate incoming request for answers (array of boolean)
        $userAnswers = $request->input('answers', []);

        $results = $this->inferenceService->runInference($userAnswers);

        $riskLevelModel = \App\Models\RiskLevel::where('name', $results[0]['risk_name'])->first();

        // Map results to include full RiskLevel data
        $formattedResults = collect($results)->map(function ($result) use ($riskLevelModel) {
            return [
                'risk_name' => $result['risk_name'],
                'explanation' => $result['explanation'],
                'full_description' => $riskLevelModel?->description,
                'suggestion' => $riskLevelModel?->suggestion,
            ];
        })->all();

        // Save screening to database
        $screening = Screening::create([
            'user_id' => auth()->id(), // null if guest, user ID if authenticated
            'risk_level_id' => $riskLevelModel?->id,
            'answers' => $userAnswers,
            'results' => $formattedResults,
        ]);

        return response()->json([
            'success' => true,
            'results' => $formattedResults,
            'screening_id' => $screening->id, // Optionally return the ID of the saved screening
        ]);
    }
}
