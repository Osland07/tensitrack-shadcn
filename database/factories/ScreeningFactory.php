<?php

namespace Database\Factories;

use App\Models\RiskLevel;
use App\Models\User;
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
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'risk_level_id' => RiskLevel::inRandomOrder()->first()->id,
            'answers' => '[]',
            'results' => '[]',
        ];
    }
}
