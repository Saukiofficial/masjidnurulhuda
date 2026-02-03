<?php

namespace App\Providers\Filament;

use App\Filament\Widgets\IncomeExpenseChart; // Widget grafik buatan kita
use App\Filament\Widgets\MasjidStatsOverview; // Widget statistik buatan kita
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()

            // --- CUSTOM BRANDING ---
            ->brandName('Masjid Nurul Huda') // Ganti tulisan "Laravel"
            // ->brandLogo(asset('images/logo.png')) // Opsional: Jika punya logo
            ->colors([
                'primary' => Color::Emerald, // Warna tema Hijau
                'gray' => Color::Slate,
            ])
            ->favicon(asset('favicon.ico'))

            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')

            // --- ATUR WIDGET DASHBOARD ---
            ->widgets([
                // Kita HAPUS widget bawaan agar bersih
                // Widgets\AccountWidget::class, (Widget Welcome)
                // Widgets\FilamentInfoWidget::class, (Widget Dokumentasi)

                // Daftarkan widget buatan kita secara manual (opsional, tapi rapi)
                MasjidStatsOverview::class,
                IncomeExpenseChart::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
