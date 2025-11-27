<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TingkatRisiko extends Model
{
    use HasFactory;

    protected $table = 'tingkat_risiko';

    protected $fillable = [
        'kode',
        'nama',
        'description',
        'suggestion',
    ];
}
