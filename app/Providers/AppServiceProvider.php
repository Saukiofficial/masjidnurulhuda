<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;

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
        // Deteksi jika berjalan di Production (Hosting)
        // Kita juga bisa memaksa jika domain mengandung 'domcloud' atau 'ngrok'
        if ($this->app->environment('production') || str_contains(request()->getHost(), 'domcloud.dev')) {

            // 1. Force HTTPS untuk semua URL Generator (Route, Asset, url())
            URL::forceScheme('https');

            // 2. Fix untuk Livewire agar asetnya dimuat via HTTPS
            // Ini penting karena Filament menggunakan Livewire untuk login
            $this->app['request']->server->set('HTTPS', 'on');

            // 3. Trust Proxy (Sangat Penting untuk Load Balancer)
            // Agar Laravel sadar dia berjalan di balik proxy HTTPS
            Request::setTrustedProxies(
                ['*'], // Trust semua IP proxy
                Request::HEADER_X_FORWARDED_FOR |
                Request::HEADER_X_FORWARDED_HOST |
                Request::HEADER_X_FORWARDED_PORT |
                Request::HEADER_X_FORWARDED_PROTO |
                Request::HEADER_X_FORWARDED_AWS_ELB
            );
        }
    }
}
