<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTingkatRisikoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('tingkatRisiko')?->id ?? null;

        return [
            'kode' => [
                'nullable',
                'regex:/^H\d{2}$/',
                Rule::unique('tingkat_risiko', 'kode')->ignore($id),
            ],
            'nama' => ['required', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
            'saran' => ['nullable', 'string'],
        ];
    }
}
