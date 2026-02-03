<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RenovationProgress extends Model
{
    // Definisikan nama tabel secara eksplisit agar cocok dengan migrasi
    protected $table = 'renovation_progresses';

    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
        'images' => 'array',
        'is_published' => 'boolean',
    ];
}
