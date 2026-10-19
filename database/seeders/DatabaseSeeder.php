<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil Seeder
        $this->call([
            AdminSeeder::class,
            MosqueDataSeeder::class,
        ]);
    }
}
