<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Donation;
use App\Models\FundExpense;
use App\Models\FundIncome;
use App\Models\RenovationProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class LandingController extends Controller
{
    public function __invoke()
    {
        // 1. Hitung Statistik Utama
        $manualIncome = FundIncome::sum('amount');
        $onlineDonation = Donation::where('status', 'success')->sum('amount');
        
        $totalIncome = $manualIncome + $onlineDonation;
        $totalExpense = FundExpense::sum('amount');
        $balance = $totalIncome - $totalExpense;

        // 2. Ambil Progres Renovasi Terakhir
        $renovationProgress = RenovationProgress::where('is_published', true)
            ->latest('date')
            ->first();

        // 3. Siapkan Data Grafik (Bulanan Tahun Ini)
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

        // 4. Aktivitas Terkini (GABUNGAN: Pengeluaran, Pemasukan Manual, & Donasi Online)
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
                    'type' => 'expense', // Penanda uang keluar
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
                    'type' => 'income', // Penanda uang masuk
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

        // 5. Data Rekening Bank
        $bankAccounts = BankAccount::where('is_active', true)->get();

        return Inertia::render('Home', [
            'stats' => [
                'totalIncome' => $totalIncome,
                'totalExpense' => $totalExpense,
                'balance' => $balance,
            ],
            'renovationProgress' => $renovationProgress,
            'chartData' => $chartData,
            'recentActivities' => $recentActivities, 
            'bankAccounts' => $bankAccounts,
        ]);
    }
}