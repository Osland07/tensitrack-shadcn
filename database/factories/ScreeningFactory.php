<?php

namespace Database\Factories;

use App\Models\FaktorRisiko;
use App\Models\TingkatRisiko;
use App\Models\User;
use App\Services\HypertensionInferenceService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Screening>
 */
class ScreeningFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $allFaktorRisiko = FaktorRisiko::all();
        $userAnswers = [];
        foreach ($allFaktorRisiko as $factor) {
            // Randomly assign true or false to each risk factor
            $userAnswers[$factor->kode] = $this->faker->boolean(50); // 50% chance of being true
        }

        $inferenceService = new HypertensionInferenceService;
        $inferenceResults = $inferenceService->runInference($userAnswers);

        $namaRisiko = $inferenceResults[0]['nama_risiko'];
        $tingkatRisikoModel = TingkatRisiko::where('nama', $namaRisiko)->first();

        $formattedResults = collect($inferenceResults)->map(function ($result) use ($tingkatRisikoModel) {
            return [
                'nama_risiko' => $result['nama_risiko'],
                'explanation' => $result['explanation'],
                'full_description' => $tingkatRisikoModel?->description,
                'suggestion' => $tingkatRisikoModel?->suggestion,
            ];
        })->all();

        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'tingkat_risiko_id' => $tingkatRisikoModel->id ?? TingkatRisiko::inRandomOrder()->first()->id, // Ensure a tingkat_risiko_id is always present
            'answers' => $userAnswers,
            'results' => $formattedResults,
        ];
    }
}
