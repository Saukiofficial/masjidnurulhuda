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
        // Pemasukan = (Pemasukan Manual) + (Donasi Online yang Sukses)
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

        // Pemasukan Manual per Bulan
        $incomes = FundIncome::selectRaw('MONTH(transaction_date) as month, SUM(amount) as total')
            ->whereYear('transaction_date', $currentYear)
            ->groupBy('month')
            ->pluck('total', 'month');

        // Pemasukan Donatur per Bulan
        $donations = Donation::selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->whereYear('created_at', $currentYear)
            ->where('status', 'success')
            ->groupBy('month')
            ->pluck('total', 'month');

        // Pengeluaran per Bulan
        $expenses = FundExpense::selectRaw('MONTH(transaction_date) as month, SUM(amount) as total')
            ->whereYear('transaction_date', $currentYear)
            ->groupBy('month')
            ->pluck('total', 'month');

        // Mapping Data Grafik untuk Recharts
        $chartData = collect(range(1, 12))->map(function ($month) use ($incomes, $donations, $expenses) {
            $totalMonthIncome = ($incomes->get($month) ?? 0) + ($donations->get($month) ?? 0);

            return [
                'name' => Carbon::create()->month($month)->translatedFormat('M'), // Jan, Feb, dst
                'pemasukan' => $totalMonthIncome,
                'pengeluaran' => $expenses->get($month) ?? 0,
            ];
        })->values();

        // 4. Timeline Pengeluaran Terakhir (5 Data)
        $recentExpenses = FundExpense::with('category')
            ->latest('transaction_date')
            ->take(5)
            ->get()
            ->map(function ($expense) {
                return [
                    'id' => $expense->id,
                    'title' => $expense->title,
                    'amount' => $expense->amount,
                    'date' => $expense->transaction_date->translatedFormat('d F Y'),
                    'category' => $expense->category->name ?? 'Umum',
                ];
            });

        // 5. Data Rekening Bank (Untuk Modal Donasi)
        $bankAccounts = BankAccount::where('is_active', true)->get();

        // Kirim semua data ke React via Inertia
        return Inertia::render('Home', [
            'stats' => [
                'totalIncome' => $totalIncome,
                'totalExpense' => $totalExpense,
                'balance' => $balance,
            ],
            'renovationProgress' => $renovationProgress,
            'chartData' => $chartData,
            'recentExpenses' => $recentExpenses,
            'bankAccounts' => $bankAccounts,
        ]);
    }
}
