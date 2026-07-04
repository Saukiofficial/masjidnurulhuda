<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\FundExpense;
use App\Models\FundIncome;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

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

       
        $proofs = collect();

        if (in_array($type, ['semua', 'pengeluaran'])) {
            $expenses = FundExpense::whereBetween('transaction_date', [$startDate, $endDate])
                ->get()
                ->map(function ($item) use (&$proofs) {
                    $proofBase64 = $this->imageToBase64($item->proof_file);

                    if ($proofBase64) {
                        $proofs->push([
                            'date' => $item->transaction_date,
                            'description' => $item->title,
                            'amount' => $item->amount,
                            'image' => $proofBase64,
                        ]);
                    }

                    return [
                        'date' => $item->transaction_date,
                        'description' => $item->title,
                        'amount' => $item->amount,
                        'type' => 'expense',
                        'proof' => $proofBase64,
                    ];
                })
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
            'proofs' => $proofs->sortBy('date')->values(),
        ];
    }

    /**
     * Convert file gambar di disk 'public' menjadi data URI base64
     * supaya bisa ditampilkan langsung oleh DomPDF tanpa bergantung
     * pada symlink storage atau akses URL publik.
     */
    private function imageToBase64(?string $path): ?string
    {
        if (!$path || !Storage::disk('public')->exists($path)) {
            return null;
        }

        try {
            $mime = Storage::disk('public')->mimeType($path) ?: 'image/jpeg';
            $contents = Storage::disk('public')->get($path);

            return 'data:' . $mime . ';base64,' . base64_encode($contents);
        } catch (\Throwable $e) {
            return null;
        }
    }
}