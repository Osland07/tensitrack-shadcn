<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreTingkatRisikoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'kode' => ['nullable', 'regex:/^H\d{2}$/', 'unique:tingkat_risiko,kode'],
            'nama' => ['required', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
            'saran' => ['nullable', 'string'],
        ];
    }
}
