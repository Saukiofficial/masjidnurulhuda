<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('physical_donations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('fund_category_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('donor_name')->default('Hamba Allah');
            $table->string('donor_phone')->nullable();

            $table->string('item_name');
            $table->decimal('quantity', 12, 2)->default(1);
            $table->string('unit')->default('Unit');

            $table->decimal('estimated_value', 15, 2)->nullable();

            $table->date('received_date')->nullable();

            $table->string('status')->default('pending');
            /*
                pending  = Diajukan / Menunggu
                received = Diterima
                used     = Sudah Digunakan
                rejected = Ditolak
            */

            $table->string('photo')->nullable();
            $table->text('description')->nullable();

            $table->boolean('is_public')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('physical_donations');
    }
};