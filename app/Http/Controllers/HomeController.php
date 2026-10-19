<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Donation;
use App\Models\Event;
use App\Models\FundExpense;
use App\Models\FundIncome;
use App\Models\MosqueProfile;
use App\Models\RenovationProgress;
use App\Models\TakmirMember;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        // 1. Profil Masjid
        $profile = MosqueProfile::first();

        // 2. Ringkasan Keuangan
        $manualIncome = FundIncome::sum('amount');
        $onlineDonation = Donation::where('status', 'success')->sum('amount');
        $totalIncome = $manualIncome + $onlineDonation;
        $totalExpense = FundExpense::sum('amount');
        $balance = $totalIncome - $totalExpense;

        // 3. Progres Renovasi Terakhir
        $renovationProgress = RenovationProgress::where('is_published', true)
            ->latest('date')
            ->first();

        // 4. Agenda Terdekat (Maksimal 3)
        $upcomingEvents = Event::where('is_published', true)
            ->where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->take(3)
            ->get();

        // 5. Pengurus Utama (Maksimal 4)
        $leadMembers = TakmirMember::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->take(4)
            ->get();

        // 6. Rekening Bank
        $bankAccounts = BankAccount::where('is_active', true)->get();

        // 7. Mutasi Terakhir (3 Transaksi Terakhir)
        $recentExpenses = FundExpense::with('category')
            ->latest('transaction_date')
            ->take(3)
            ->get()
            ->map(fn ($item) => [
                'id' => 'exp_' . $item->id,
                'title' => $item->title,
                'amount' => $item->amount,
                'date' => $item->transaction_date,
                'date_formatted' => Carbon::parse($item->transaction_date)->translatedFormat('d M Y'),
                'type' => 'expense',
            ]);

        $recentIncomes = FundIncome::with('category')
            ->latest('transaction_date')
            ->take(3)
            ->get()
            ->map(fn ($item) => [
                'id' => 'inc_' . $item->id,
                'title' => $item->title,
                'amount' => $item->amount,
                'date' => $item->transaction_date,
                'date_formatted' => Carbon::parse($item->transaction_date)->translatedFormat('d M Y'),
                'type' => 'income',
            ]);

        $recentDonations = Donation::where('status', 'success')
            ->latest('created_at')
            ->take(3)
            ->get()
            ->map(fn ($item) => [
                'id' => 'don_' . $item->id,
                'title' => 'Donasi: ' . $item->donor_name,
                'amount' => $item->amount,
                'date' => $item->created_at,
                'date_formatted' => Carbon::parse($item->created_at)->translatedFormat('d M Y'),
                'type' => 'income',
            ]);

        $latestActivities = $recentExpenses
            ->concat($recentIncomes)
            ->concat($recentDonations)
            ->sortByDesc('date')
            ->take(4)
            ->values();

        return Inertia::render('Home', [
            'profile' => $profile,
            'stats' => [
                'totalIncome' => $totalIncome,
                'totalExpense' => $totalExpense,
                'balance' => $balance,
            ],
            'renovationProgress' => $renovationProgress,
            'upcomingEvents' => $upcomingEvents,
            'leadMembers' => $leadMembers,
            'bankAccounts' => $bankAccounts,
            'latestActivities' => $latestActivities,
        ]);
    }
}
