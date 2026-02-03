<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class FundIncome extends Model
{
    protected $guarded = [];

    protected $casts = [
        'transaction_date' => 'date',
    ];

    // Otomatis isi user_id saat create
    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->user_id) {
                $model->user_id = Auth::id();
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(FundCategory::class, 'fund_category_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
