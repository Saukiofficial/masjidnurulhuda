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
        Schema::create('renovation_progresses', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Contoh: "Pengecoran Lantai 2"
            $table->text('description')->nullable();
            $table->integer('percentage')->default(0); // 0-100
            $table->date('date');
            $table->json('images')->nullable(); // Simpan path gambar sebagai JSON
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('renovation_progresses');
    }
};
