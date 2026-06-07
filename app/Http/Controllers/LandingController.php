<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Donation;
use App\Models\FundExpense;
use App\Models\FundIncome;
use App\Models\PhysicalDonation;
use App\Models\RenovationProgress;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function __invoke()
    {
        /*
        |--------------------------------------------------------------------------
        | 1. Hitung Statistik Keuangan Utama
        |--------------------------------------------------------------------------
        | Catatan:
        | - FundIncome = pemasukan manual dari admin
        | - Donation = donasi uang online/manual yang statusnya success
        | - FundExpense = pengeluaran dana
        | - Donasi fisik TIDAK masuk saldo kas
        */

        $manualIncome = FundIncome::sum('amount');

        $onlineDonation = Donation::where('status', 'success')
            ->sum('amount');

        $totalIncome = $manualIncome + $onlineDonation;

        $totalExpense = FundExpense::sum('amount');

        $balance = $totalIncome - $totalExpense;

        /*
        |--------------------------------------------------------------------------
        | 2. Statistik Donasi Fisik
        |--------------------------------------------------------------------------
        | Donasi fisik hanya untuk monitoring barang/material.
        | Tidak dimasukkan ke saldo kas agar laporan keuangan tetap aman.
        */

        $physicalDonationStats = [
            'totalItems' => PhysicalDonation::whereIn('status', ['received', 'used'])
                ->count(),

            'totalEstimatedValue' => PhysicalDonation::whereIn('status', ['received', 'used'])
                ->sum('estimated_value'),

            'totalPending' => PhysicalDonation::where('status', 'pending')
                ->count(),

            'totalUsed' => PhysicalDonation::where('status', 'used')
                ->count(),
        ];

        /*
        |--------------------------------------------------------------------------
        | 3. Rekap Donasi Fisik Berdasarkan Barang
        |--------------------------------------------------------------------------
        | Contoh hasil:
        | - Semen: 50 Sak
        | - Pasir: 2 Truk
        | - Batu: 3 Truk
        */

        $physicalDonationSummary = PhysicalDonation::query()
            ->where('is_public', true)
            ->whereIn('status', ['received', 'used'])
            ->selectRaw('
                item_name,
                unit,
                SUM(quantity) as total_quantity,
                SUM(estimated_value) as total_estimated_value
            ')
            ->groupBy('item_name', 'unit')
            ->orderBy('item_name')
            ->get()
            ->map(function ($item) {
                return [
                    'item_name' => $item->item_name,
                    'unit' => $item->unit,
                    'total_quantity' => (float) $item->total_quantity,
                    'total_estimated_value' => (float) $item->total_estimated_value,
                ];
            });

        /*
        |--------------------------------------------------------------------------
        | 4. Donasi Fisik Terbaru
        |--------------------------------------------------------------------------
        | Untuk ditampilkan di frontend sebagai daftar bantuan fisik terbaru.
        */

        $recentPhysicalDonations = PhysicalDonation::with('category')
            ->where('is_public', true)
            ->latest('received_date')
            ->latest('created_at')
            ->take(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'donor_name' => $item->donor_name,
                    'item_name' => $item->item_name,
                    'quantity' => (float) $item->quantity,
                    'unit' => $item->unit,
                    'estimated_value' => (float) $item->estimated_value,
                    'received_date' => $item->received_date,
                    'date_formatted' => $item->received_date
                        ? Carbon::parse($item->received_date)->translatedFormat('d F Y')
                        : Carbon::parse($item->created_at)->translatedFormat('d F Y'),
                    'category' => $item->category->name ?? 'Umum',
                    'status' => $item->status,
                    'description' => $item->description,
                    'photo' => $item->photo,
                ];
            });

        /*
        |--------------------------------------------------------------------------
        | 5. Ambil Progres Renovasi Terakhir
        |--------------------------------------------------------------------------
        */

        $renovationProgress = RenovationProgress::where('is_published', true)
            ->latest('date')
            ->first();

        /*
        |--------------------------------------------------------------------------
        | 6. Data Grafik Keuangan Bulanan Tahun Ini
        |--------------------------------------------------------------------------
        */

        $currentYear = date('Y');

        $incomesChart = FundIncome::selectRaw('MONTH(transaction_date) as month, SUM(amount) as total')
            ->whereYear('transaction_date', $currentYear)
            ->groupBy('month')
            ->pluck('total', 'month');

        $donationsChart = Donation::selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->whereYear('created_at', $currentYear)
            ->where('status', 'success')
            ->groupBy('month')
            ->pluck('total', 'month');

        $expensesChart = FundExpense::selectRaw('MONTH(transaction_date) as month, SUM(amount) as total')
            ->whereYear('transaction_date', $currentYear)
            ->groupBy('month')
            ->pluck('total', 'month');

        $chartData = collect(range(1, 12))->map(function ($month) use ($incomesChart, $donationsChart, $expensesChart) {
            $totalMonthIncome = ($incomesChart->get($month) ?? 0) + ($donationsChart->get($month) ?? 0);

            return [
                'name' => Carbon::create()->month($month)->translatedFormat('M'),
                'pemasukan' => $totalMonthIncome,
                'pengeluaran' => $expensesChart->get($month) ?? 0,
            ];
        })->values();

        /*
        |--------------------------------------------------------------------------
        | 7. Aktivitas Terkini Keuangan
        |--------------------------------------------------------------------------
        | Gabungan:
        | - Pengeluaran
        | - Pemasukan manual
        | - Donasi uang
        */

        $recentExpensesList = FundExpense::with('category')
            ->latest('transaction_date')
            ->take(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => 'exp_' . $item->id,
                    'title' => $item->title,
                    'amount' => $item->amount,
                    'date' => $item->transaction_date,
                    'date_formatted' => Carbon::parse($item->transaction_date)->translatedFormat('d F Y'),
                    'category' => $item->category->name ?? 'Umum',
                    'type' => 'expense',
                ];
            });

        $recentIncomesList = FundIncome::with('category')
            ->latest('transaction_date')
            ->take(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => 'inc_' . $item->id,
                    'title' => $item->title,
                    'amount' => $item->amount,
                    'date' => $item->transaction_date,
                    'date_formatted' => Carbon::parse($item->transaction_date)->translatedFormat('d F Y'),
                    'category' => $item->category->name ?? 'Umum',
                    'type' => 'income',
                ];
            });

        $recentDonationsList = Donation::with('category')
            ->where('status', 'success')
            ->latest('created_at')
            ->take(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => 'don_' . $item->id,
                    'title' => 'Donasi: ' . $item->donor_name,
                    'amount' => $item->amount,
                    'date' => $item->created_at,
                    'date_formatted' => Carbon::parse($item->created_at)->translatedFormat('d F Y'),
                    'category' => $item->category->name ?? 'Umum',
                    'type' => 'income',
                ];
            });

        $recentActivities = $recentExpensesList
            ->concat($recentIncomesList)
            ->concat($recentDonationsList)
            ->sortByDesc('date')
            ->take(6)
            ->values();

        /*
        |--------------------------------------------------------------------------
        | 8. Data Rekening Bank
        |--------------------------------------------------------------------------
        */

        $bankAccounts = BankAccount::where('is_active', true)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | 9. Kirim Data ke Frontend Inertia React
        |--------------------------------------------------------------------------
        */

        return Inertia::render('Home', [
            'stats' => [
                'totalIncome' => $totalIncome,
                'totalExpense' => $totalExpense,
                'balance' => $balance,
            ],

            'physicalDonationStats' => $physicalDonationStats,
            'physicalDonationSummary' => $physicalDonationSummary,
            'recentPhysicalDonations' => $recentPhysicalDonations,

            'renovationProgress' => $renovationProgress,
            'chartData' => $chartData,
            'recentActivities' => $recentActivities,
            'bankAccounts' => $bankAccounts,
        ]);
    }
}