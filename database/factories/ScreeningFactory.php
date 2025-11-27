<?php

namespace Database\Factories;

use App\Models\RiskLevel;
use App\Models\User;
use App\Models\RiskFactor;
use App\Models\Screening;
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
        $allRiskFactors = RiskFactor::all();
        $userAnswers = [];
        foreach ($allRiskFactors as $factor) {
            // Randomly assign true or false to each risk factor
            $userAnswers[$factor->code] = $this->faker->boolean(50); // 50% chance of being true
        }

        $inferenceService = new HypertensionInferenceService();
        $inferenceResults = $inferenceService->runInference($userAnswers);

        $riskLevelName = $inferenceResults[0]['risk_name'];
        $riskLevelModel = RiskLevel::where('name', $riskLevelName)->first();

        $formattedResults = collect($inferenceResults)->map(function ($result) use ($riskLevelModel) {
            return [
                'risk_name' => $result['risk_name'],
                'explanation' => $result['explanation'],
                'full_description' => $riskLevelModel?->description,
                'suggestion' => $riskLevelModel?->suggestion,
            ];
        })->all();

        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'risk_level_id' => $riskLevelModel->id ?? RiskLevel::inRandomOrder()->first()->id, // Ensure a risk_level_id is always present
            'answers' => $userAnswers,
            'results' => $formattedResults,
        ];
    }
}
