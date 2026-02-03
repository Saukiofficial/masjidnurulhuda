<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fund_incomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fund_category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained(); // Siapa admin yang input

            $table->string('title'); // Contoh: "Kotak Jumat Tgl 12"
            $table->decimal('amount', 15, 2);
            $table->text('description')->nullable();
            $table->date('transaction_date');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fund_incomes');
    }
};
