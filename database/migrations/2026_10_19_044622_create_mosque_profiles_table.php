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
        Schema::create('mosque_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Masjid Nurul Huda');
            $table->string('tagline')->nullable(); // Slogan / Moto masjid
            $table->text('address')->nullable(); // Alamat lengkap
            $table->text('google_maps_url')->nullable(); // Link / Embed Google Maps
            $table->string('phone')->nullable(); // Call Center / WA Takmir
            $table->string('email')->nullable(); // Email resmi
            $table->text('history')->nullable(); // Sejarah singkat / profil
            $table->text('vision_mission')->nullable(); // Visi & Misi
            $table->string('hero_title')->nullable(); // Judul sambutan di beranda
            $table->text('hero_subtitle')->nullable(); // Subjudul sambutan di beranda
            $table->string('hero_image')->nullable(); // Foto utama masjid
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mosque_profiles');
    }
};
