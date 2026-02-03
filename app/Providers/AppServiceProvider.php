<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Paksa HTTPS jika aplikasi berjalan di environment 'production' atau 'local' (jika pakai ngrok)
        // Anda bisa menghapus kondisi if() jika ingin memaksa di semua environment
        if (app()->isProduction()) {
            URL::forceScheme('https');
        }
    }
}
