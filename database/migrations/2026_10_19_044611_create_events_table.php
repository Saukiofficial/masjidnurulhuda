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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Contoh: Kajian Rutin Ahad Pagi
            $table->string('category')->default('Kajian'); // Kajian, Sholat Jumat, Hari Besar, Sosial
            $table->string('speaker')->nullable(); // Pemateri / Ustadz
            $table->date('date'); // Tanggal pelaksanaan
            $table->string('time')->nullable(); // Contoh: 19:30 WIB s/d selesai
            $table->string('location')->default('Masjid Nurul Huda');
            $table->text('description')->nullable();
            $table->string('poster_image')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
