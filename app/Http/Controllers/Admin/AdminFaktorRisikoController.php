<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaktorRisikoRequest;
use App\Http\Requests\Admin\UpdateFaktorRisikoRequest;
use App\Models\FaktorRisiko;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminFaktorRisikoController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/FaktorRisiko/Create');
    }

    public function edit(FaktorRisiko $faktorRisiko): Response
    {
        return Inertia::render('Admin/FaktorRisiko/Edit', [
            'faktorRisiko' => $faktorRisiko,
        ]);
    }

    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $faktorRisiko = FaktorRisiko::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', '%'.$search.'%')
                    ->orWhere('kode', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            })
            ->orderBy('kode')
            ->paginate(10) // Paginate with 10 items per page
            ->withQueryString(); // Keep query string for pagination links

        return Inertia::render('Admin/FaktorRisiko/Index', [
            'faktorRisiko' => $faktorRisiko,
            'filters' => ['search' => $search], // Pass current search term to frontend
        ]);
    }

    public function store(StoreFaktorRisikoRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['kode'])) {
            $last = FaktorRisiko::query()
                ->where('kode', 'like', 'E%')
                ->orderBy('kode', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->kode) + 1 : 1;
            $data['kode'] = 'E'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        FaktorRisiko::query()->create($data);

        return to_route('faktor-risiko.index')->with('success', 'Data berhasil disimpan!');
    }

    public function update(UpdateFaktorRisikoRequest $request, FaktorRisiko $faktorRisiko): RedirectResponse
    {
        $data = $request->validated();

        $faktorRisiko->update($data);

        return back()->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(FaktorRisiko $faktorRisiko): RedirectResponse
    {
        $faktorRisiko->delete();

        return back()->with('success', 'Data berhasil dihapus!');
    }
}
