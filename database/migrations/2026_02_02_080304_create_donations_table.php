<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            // Relasi ke kategori (uang ini untuk apa?)
            $table->foreignId('fund_category_id')->constrained()->cascadeOnDelete();

            // Data Donatur
            $table->string('donor_name')->default('Hamba Allah');
            $table->string('donor_email')->nullable();
            $table->string('donor_phone')->nullable();

            // Transaksi
            $table->decimal('amount', 15, 2); // Mendukung angka besar
            $table->text('message')->nullable(); // Doa/Pesan donatur

            // Status & Bukti
            $table->string('status')->default('pending'); // pending, success, failed
            $table->string('snap_token')->nullable(); // Untuk Midtrans (opsional nanti)
            $table->string('proof_file')->nullable(); // Bukti transfer manual

            $table->timestamp('transaction_date')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
