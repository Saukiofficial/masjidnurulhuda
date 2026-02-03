<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $guarded = [];

    // Cast status default
    protected $attributes = [
        'status' => 'pending',
        'donor_name' => 'Hamba Allah',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(FundCategory::class, 'fund_category_id');
    }
}
