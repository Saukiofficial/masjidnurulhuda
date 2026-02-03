<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fund_expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fund_category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained(); // Admin yang mencatat

            $table->string('title'); // Contoh: "Pembelian Semen 50 Sak"
            $table->decimal('amount', 15, 2);
            $table->text('description')->nullable();
            $table->date('transaction_date');
            $table->string('proof_file')->nullable(); // Foto kwitansi/nota

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fund_expenses');
    }
};
