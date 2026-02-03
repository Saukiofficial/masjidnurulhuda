<?php

namespace App\Filament\Widgets;

use App\Models\Donation;
use App\Models\FundExpense;
use App\Models\FundIncome;
use App\Models\RenovationProgress;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Number;

class MasjidStatsOverview extends BaseWidget
{
    // Mengatur agar widget ini autorefresh setiap 15 detik (opsional)
    protected static ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        // 1. Hitung Keuangan
        // Pemasukan Manual (Kotak Amal, dll)
        $manualIncome = FundIncome::sum('amount');

        // Donasi Online/Donatur (Hanya yang statusnya 'success')
        $onlineDonation = Donation::where('status', 'success')->sum('amount');

        // TOTAL PEMASUKAN = Manual + Donasi
        $totalIncome = $manualIncome + $onlineDonation;

        $totalExpense = FundExpense::sum('amount');

        // SALDO AKHIR
        $balance = $totalIncome - $totalExpense;

        // 2. Ambil Progress Terakhir
        $latestProgress = RenovationProgress::latest('date')->value('percentage') ?? 0;

        return [
            Stat::make('Saldo Kas Masjid', Number::currency($balance, 'IDR'))
                ->description('Total dana tersedia saat ini')
                ->descriptionIcon('heroicon-m-wallet')
                ->color($balance >= 0 ? 'success' : 'danger')
                ->chart([7, 3, 4, 5, 6, 3, 5, 8]), // Dummy sparkline chart

            Stat::make('Total Pemasukan', Number::currency($totalIncome, 'IDR'))
                ->description('Manual + Donatur')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Stat::make('Total Pengeluaran', Number::currency($totalExpense, 'IDR'))
                ->description('Dana yang telah digunakan')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Stat::make('Progres Renovasi', $latestProgress . '%')
                ->description('Update pengerjaan fisik terakhir')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary')
                ->chart([$latestProgress]),
        ];
    }
}
