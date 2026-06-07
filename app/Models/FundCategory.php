<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FundCategory extends Model
{
    protected $guarded = [];

    public function incomes(): HasMany
    {
        return $this->hasMany(FundIncome::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(FundExpense::class);
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function physicalDonations(): HasMany
    {
        return $this->hasMany(PhysicalDonation::class);
    }
}