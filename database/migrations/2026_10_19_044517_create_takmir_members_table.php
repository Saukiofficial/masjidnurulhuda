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
        Schema::create('takmir_members', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama lengkap & gelar
            $table->string('position'); // Jabatan: Ketua, Sekretaris, Bendahara, dll
            $table->string('period')->nullable(); // Masa bakti: Contoh 2024 - 2029
            $table->string('phone')->nullable(); // WhatsApp
            $table->string('photo')->nullable(); // Foto profil
            $table->text('bio')->nullable(); // Keterangan tugas / profil singkat
            $table->integer('sort_order')->default(0); // Urutan tampilan struktur
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('takmir_members');
    }
};
