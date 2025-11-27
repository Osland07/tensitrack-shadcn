<?php

namespace Database\Seeders;

use App\Models\TingkatRisiko;
use Illuminate\Database\Seeder;

class TingkatRisikoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $riskLevels = [
            ['kode' => 'H01', 'nama' => 'Rendah', 'keterangan' => 'Tidak ada atau sangat sedikit faktor risiko terdeteksi. Pertahankan gaya hidup sehat.'],
            ['kode' => 'H02', 'nama' => 'Sedang', 'keterangan' => 'Beberapa faktor risiko terdeteksi. Perlu perhatian dan perubahan gaya hidup.'],
            ['kode' => 'H03', 'nama' => 'Tinggi', 'keterangan' => 'Banyak faktor risiko terdeteksi. Sangat disarankan untuk konsultasi medis dan perubahan gaya hidup signifikan.'],
        ];

        foreach ($riskLevels as $level) {
            TingkatRisiko::updateOrCreate(
                ['kode' => $level['kode']],
                ['nama' => $level['nama'], 'keterangan' => $level['keterangan']]
            );
        }
    }
}
