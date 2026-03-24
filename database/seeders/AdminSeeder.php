<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        if (! User::where('email', 'admin@masjid.com')->exists()) {
            User::create([
                'name' => 'Takmir Masjid',
                'email' => 'admin@masjid.com',
                'password' => Hash::make('password'), 
                'email_verified_at' => now(),
            ]);
        }
    }
}
