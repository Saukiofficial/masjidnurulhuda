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
        // Paksa HTTPS jika aplikasi berjalan di environment 'production'
        // Ini penting untuk mengatasi masalah Mixed Content dan Redirect Loop/Error 405
        // saat aplikasi berada di belakang Reverse Proxy (Cloudflare, Nginx, dll).
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
