<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTingkatRisikoRequest;
use App\Http\Requests\Admin\UpdateTingkatRisikoRequest;
use App\Models\TingkatRisiko;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminTingkatRisikoController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/TingkatRisiko/Create');
    }

    public function edit(TingkatRisiko $tingkatRisiko): Response
    {
        return Inertia::render('Admin/TingkatRisiko/Edit', [
            'tingkatRisiko' => $tingkatRisiko,
        ]);
    }

    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $tingkatRisiko = TingkatRisiko::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', '%'.$search.'%')
                    ->orWhere('kode', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            })
            ->orderBy('kode')
            ->paginate(10) // Paginate with 10 items per page
            ->withQueryString(); // Keep query string for pagination links

        return Inertia::render('Admin/TingkatRisiko/Index', [
            'tingkatRisiko' => $tingkatRisiko,
            'filters' => ['search' => $search], // Pass current search term to frontend
        ]);
    }

    public function store(StoreTingkatRisikoRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['kode'])) {
            $last = TingkatRisiko::query()
                ->where('kode', 'like', 'H%')
                ->orderBy('kode', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->kode) + 1 : 1;
            $data['kode'] = 'H'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        TingkatRisiko::query()->create($data);

        return to_route('tingkat-risiko.index')->with('success', 'Data berhasil disimpan!');
    }

    public function update(UpdateTingkatRisikoRequest $request, TingkatRisiko $tingkatRisiko): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['kode']) && $tingkatRisiko->kode === null) {
            $last = TingkatRisiko::query()
                ->where('kode', 'like', 'H%')
                ->orderBy('kode', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->kode) + 1 : 1;
            $data['kode'] = 'H'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        $tingkatRisiko->update($data);

        return back()->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(TingkatRisiko $tingkatRisiko): RedirectResponse
    {
        $tingkatRisiko->delete();

        return back()->with('success', 'Data berhasil dihapus!');
    }
}
