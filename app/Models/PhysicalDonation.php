<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PhysicalDonation extends Model
{
    protected $guarded = [];

    protected $attributes = [
        'donor_name' => 'Hamba Allah',
        'status' => 'pending',
        'unit' => 'Unit',
        'is_public' => true,
    ];

    protected $casts = [
        'received_date' => 'date',
        'quantity' => 'decimal:2',
        'estimated_value' => 'decimal:2',
        'is_public' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(FundCategory::class, 'fund_category_id');
    }
}