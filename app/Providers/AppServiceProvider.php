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
        // Konfigurasi Khusus untuk Production (DomCloud/Hosting)
        if ($this->app->environment('production')) {
            // 1. Paksa Generate Link HTTPS
            URL::forceScheme('https');

            // 2. TRUST PROXY (Sangat Penting untuk DomCloud/Cloudflare)
            // Memberitahu Laravel untuk mempercayai header HTTPS dari server depan
            // agar tidak terjadi redirect loop atau error 405 pada form POST.
            Request::setTrustedProxies(
                ['*'], // Percayai semua proxy
                Request::HEADER_X_FORWARDED_FOR |
                Request::HEADER_X_FORWARDED_HOST |
                Request::HEADER_X_FORWARDED_PORT |
                Request::HEADER_X_FORWARDED_PROTO |
                Request::HEADER_X_FORWARDED_AWS_ELB
            );
        }
    }
}
