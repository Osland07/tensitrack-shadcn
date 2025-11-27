<?php

namespace App\Http\Controllers;

use App\Models\Screening;
use App\Services\HypertensionInferenceService;
use Illuminate\Http\Request;
use Inertia\Inertia; // Added import for Screening model

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

        $query = Screening::with(['user', 'tingkatRisiko'])->latest();

        $query->where('user_id', $user->id);

        $screenings = $query->paginate(10)->withQueryString();

        return Inertia::render('Client/Riwayat/Index', [
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

        $tingkatRisikoModel = \App\Models\TingkatRisiko::where('nama', $results[0]['nama_risiko'])->first();

        // Map results to include full TingkatRisiko data
        $formattedResults = collect($results)->map(function ($result) use ($tingkatRisikoModel) {
            return [
                'nama_risiko' => $result['nama_risiko'],
                'explanation' => $result['explanation'],
                'full_description' => $tingkatRisikoModel?->description,
                'suggestion' => $tingkatRisikoModel?->suggestion,
            ];
        })->all();

        // Save screening to database
        $screening = Screening::create([
            'user_id' => auth()->id(), // null if guest, user ID if authenticated
            'tingkat_risiko_id' => $tingkatRisikoModel?->id,
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
