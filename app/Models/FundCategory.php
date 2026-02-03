<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FundCategory extends Model
{
    protected $guarded = []; // Izinkan semua kolom diisi

    public function incomes(): HasMany
    {
        return $this->hasMany(FundIncome::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(FundExpense::class);
    }
}
