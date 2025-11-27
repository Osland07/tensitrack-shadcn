<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('admin can view risk levels page', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->get(route('tingkat-risiko.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('admin/risk-levels'));
});

test('creating risk level auto-generates kode', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->post(route('tingkat-risiko.store'), [
            'nama' => 'Rendah',
            'keterangan' => 'Risiko rendah',
            'saran' => 'Tetap pantau',
        ])->assertRedirect();

    $created = TingkatRisiko::first();
    expect($created->kode)->toBe('H01');
});
