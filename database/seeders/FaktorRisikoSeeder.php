<?php

namespace Database\Seeders;

use App\Models\FaktorRisiko;
use Illuminate\Database\Seeder;

class FaktorRisikoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facts = [
            [
                'kode' => 'E01',
                'keterangan' => 'Tekanan darah meningkat (sistolik 120–139 atau diastolik 80–89)',
            ],
            [
                'kode' => 'E02',
                'keterangan' => 'Riwayat hipertensi pada keluarga inti',
            ],
            [
                'kode' => 'E03',
                'keterangan' => 'Obesitas (IMT ≥ 25)',
            ],
            [
                'kode' => 'E04',
                'keterangan' => 'Kebiasaan merokok', // Added comma
            ],
            [
                'kode' => 'E05',
                'keterangan' => 'Kebiasaan mengonsumsi alkohol',
            ],
            [
                'kode' => 'E06',
                'keterangan' => 'Sering minum minuman berenergi (kratingdeng, extra joss)', // Added comma
            ],
            [
                'kode' => 'E07',
                'keterangan' => 'Sering konsumsi kafein kuat (kopi kental / teh kental)', // Added comma
            ],
            [
                'kode' => 'E08',
                'keterangan' => 'Sering makan makanan tinggi garam atau lemak', // Added comma
            ],
            [
                'kode' => 'E09',
                'keterangan' => 'Jarang olahraga', // Added comma
            ],
            [
                'kode' => 'E10',
                'keterangan' => 'Pola tidur buruk (sering begadang)', // Added comma
            ],
            [
                'kode' => 'E11',
                'keterangan' => 'Sering mengalami stres atau kecemasan', // Added comma
            ], // Added closing square bracket for the last element
        ];

        foreach ($facts as $fact) {
            FaktorRisiko::firstOrCreate(
                ['kode' => $fact['kode']],
                [
                    'nama' => $fact['keterangan'], // Changed 'description' to 'keterangan'
                ]
            );
        }
    }
}
