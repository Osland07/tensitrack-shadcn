<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('height', 5, 2)->nullable()->after('password');
            $table->decimal('weight', 5, 2)->nullable()->after('height');
            $table->unsignedInteger('age')->nullable()->after('weight');
            $table->string('gender')->nullable()->after('age');
            $table->unsignedInteger('systolic')->nullable()->after('gender');
            $table->unsignedInteger('diastolic')->nullable()->after('systolic');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['height', 'weight', 'age', 'gender', 'systolic', 'diastolic']);
        });
    }
};
