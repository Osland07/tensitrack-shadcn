<?php

use App\Models\FaktorRisiko;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('admin can view risk factors page', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->get(route('faktor-risiko.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('admin/risk-factors'));
});

test('creating risk factor auto-generates kode', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->post(route('faktor-risiko.store'), [
            'nama' => 'Faktor A',
            'keterangan' => 'Deskripsi',
            'saran' => 'Saran',
        ])->assertRedirect();

    $created = FaktorRisiko::first();
    expect($created->kode)->toBe('E01');
});
