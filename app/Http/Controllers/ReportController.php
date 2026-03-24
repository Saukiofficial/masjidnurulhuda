<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\FundExpense;
use App\Models\FundIncome;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReportController extends Controller
{
    public function downloadWeekly(Request $request)
    {
        $startDate = Carbon::now()->startOfWeek();
        $endDate = Carbon::now()->endOfWeek();

        $data = $this->getReportData($startDate, $endDate);
        $data['title'] = 'Laporan Keuangan Mingguan (Jumat)';
        $data['periode'] = $startDate->translatedFormat('d F Y') . ' - ' . $endDate->translatedFormat('d F Y');

        $pdf = Pdf::loadView('reports.finance', $data);

        if ($request->has('stream')) {
            return $pdf->stream('laporan-mingguan.pdf');
        }
        return $pdf->download('laporan-mingguan.pdf');
    }

    public function downloadMonthly(Request $request)
    {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $data = $this->getReportData($startDate, $endDate);
        $data['title'] = 'Laporan Keuangan Bulanan';
        $data['periode'] = $startDate->translatedFormat('F Y');

        $pdf = Pdf::loadView('reports.finance', $data);

        if ($request->has('stream')) {
            return $pdf->stream('laporan-bulanan.pdf');
        }
        return $pdf->download('laporan-bulanan.pdf');
    }

   
    public function downloadCustom(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => 'nullable|string|in:semua,pemasukan,donatur,pengeluaran' // Validasi tipe
        ]);

        $startDate = Carbon::parse($request->start_date)->startOfDay();
        $endDate = Carbon::parse($request->end_date)->endOfDay();
        $type = $request->input('type', 'semua');

        $data = $this->getReportData($startDate, $endDate, $type);
        
        
        $titles = [
            'semua' => 'Laporan Keuangan Keseluruhan',
            'pemasukan' => 'Laporan Khusus Pemasukan (Manual)',
            'donatur' => 'Laporan Khusus Penerimaan Donasi',
            'pengeluaran' => 'Laporan Khusus Pengeluaran',
        ];

        $data['title'] = $titles[$type];
        $data['periode'] = $startDate->translatedFormat('d F Y') . ' s/d ' . $endDate->translatedFormat('d F Y');

        $pdf = Pdf::loadView('reports.finance', $data);

        if ($request->has('stream')) {
            return $pdf->stream('laporan-kustom-'.$type.'.pdf');
        }
        return $pdf->download('laporan-kustom-'.$type.'.pdf');
    }

    
    private function getReportData($startDate, $endDate, $type = 'semua')
    {
        $incomes = collect();
        $donations = collect();
        $expenses = collect();

      
        if (in_array($type, ['semua', 'pemasukan'])) {
            $incomes = FundIncome::whereBetween('transaction_date', [$startDate, $endDate])
                ->get()
                ->map(fn($item) => [
                    'date' => $item->transaction_date,
                    'description' => $item->title . ' (' . ($item->category->name ?? '-') . ')',
                    'amount' => $item->amount,
                    'type' => 'income'
                ]);
        }

    
        if (in_array($type, ['semua', 'donatur'])) {
            $donations = Donation::where('status', 'success')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get()
                ->map(fn($item) => [
                    'date' => $item->created_at,
                    'description' => 'Donasi: ' . $item->donor_name . ' (' . ($item->category->name ?? '-') . ')',
                    'amount' => $item->amount,
                    'type' => 'income'
                ]);
        }

       
        if (in_array($type, ['semua', 'pengeluaran'])) {
            $expenses = FundExpense::whereBetween('transaction_date', [$startDate, $endDate])
                ->get()
                ->map(fn($item) => [
                    'date' => $item->transaction_date,
                    'description' => $item->title,
                    'amount' => $item->amount,
                    'type' => 'expense'
                ])
                ->sortBy('date');
        }

        
        $allIncomes = $incomes->merge($donations)->sortBy('date');

       
        $pastIncome = FundIncome::where('transaction_date', '<', $startDate)->sum('amount') 
                    + Donation::where('status', 'success')->where('created_at', '<', $startDate)->sum('amount');
        $pastExpense = FundExpense::where('transaction_date', '<', $startDate)->sum('amount');
        $saldoAwal = $pastIncome - $pastExpense;

        return [
            'incomes' => $allIncomes,
            'expenses' => $expenses,
            'total_income' => $allIncomes->sum('amount'),
            'total_expense' => $expenses->sum('amount'),
            'saldo_awal' => $saldoAwal,
            
            'saldo_akhir' => $saldoAwal + $allIncomes->sum('amount') - $expenses->sum('amount'),
        ];
    }
}