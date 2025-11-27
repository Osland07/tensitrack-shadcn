<?php

namespace App\Services;

use App\Models\FaktorRisiko;
use Illuminate\Support\Collection;

class HypertensionInferenceService
{
    /**
     * @var Collection<int, FaktorRisiko>
     */
    protected $faktorRisiko;

    /**
     * The inference rules.
     *
     * @var array
     */
    public function getRules(): array
    {
        return [
            [
                'if' => 'E01 is true',
                'then' => [
                    ['count' => '3 or more (E02–E11)', 'risk' => 'H03 (Tinggi)'],
                    ['count' => '0–2 (E02–E11)', 'risk' => 'H02 (Sedang)'],
                ],
            ],
            [
                'if' => 'E01 is false',
                'then' => [
                    ['count' => '5 or more (E02–E11)', 'risk' => 'H03 (Tinggi)'],
                    ['count' => '3–4 (E02–E11)', 'risk' => 'H02 (Sedang)'],
                    ['count' => '0–2 (E02–E11)', 'risk' => 'H01 (Rendah)'],
                ],
            ],
        ];
    }

    /**
     * Runs the inference engine based on the new logic.
     *
     * @param  array  $userAnswers  An associative array of fact codes that are true (e.g., ['E01' => true, 'E03' => true]).
     * @return array An array of inferred risk levels with their explanations.
     */
    public function runInference(array $userAnswers): array
    {
        $e01_is_active = $userAnswers['E01'] ?? false;

        $other_factors_count = 0;
        for ($i = 2; $i <= 11; $i++) {
            $factor = 'E'.str_pad($i, 2, '0', STR_PAD_LEFT);
            if (! empty($userAnswers[$factor])) {
                $other_factors_count++;
            }
        }

        $nama_risiko = '';
        $explanation = '';

        if ($e01_is_active) {
            if ($other_factors_count >= 3) {
                $nama_risiko = 'Tinggi';
                $explanation = 'E01 aktif dan 3 atau lebih faktor lain aktif.';
            } else {
                $nama_risiko = 'Sedang';
                $explanation = 'E01 aktif dan 0-2 faktor lain aktif.';
            }
        } else {
            if ($other_factors_count >= 5) {
                $nama_risiko = 'Tinggi';
                $explanation = 'E01 tidak aktif dan 5 atau lebih faktor lain aktif.';
            } elseif ($other_factors_count >= 3) {
                $nama_risiko = 'Sedang';
                $explanation = 'E01 tidak aktif dan 3-4 faktor lain aktif.';
            } else {
                $nama_risiko = 'Rendah';
                $explanation = 'E01 tidak aktif dan 0-2 faktor lain aktif.';
            }
        }

        return [
            [
                'nama_risiko' => $nama_risiko,
                'explanation' => $explanation,
            ],
        ];
    }
}
