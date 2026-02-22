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
        // Periode: Senin minggu ini s/d Hari ini (atau Minggu)
        $startDate = Carbon::now()->startOfWeek();
        $endDate = Carbon::now()->endOfWeek();

        $data = $this->getReportData($startDate, $endDate);
        $data['title'] = 'Laporan Keuangan Mingguan (Jumat)';
        $data['periode'] = $startDate->translatedFormat('d F Y') . ' - ' . $endDate->translatedFormat('d F Y');

        $pdf = Pdf::loadView('reports.finance', $data);

        // Fitur Stream: Jika ada parameter ?stream=true, tampilkan di browser
        if ($request->has('stream')) {
            return $pdf->stream('laporan-mingguan-masjid.pdf');
        }

        return $pdf->download('laporan-mingguan-masjid.pdf');
    }

    public function downloadMonthly(Request $request)
    {
        // Periode: Awal bulan s/d Akhir bulan ini
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $data = $this->getReportData($startDate, $endDate);
        $data['title'] = 'Laporan Keuangan Bulanan';
        $data['periode'] = $startDate->translatedFormat('F Y');

        $pdf = Pdf::loadView('reports.finance', $data);

        // Fitur Stream
        if ($request->has('stream')) {
            return $pdf->stream('laporan-bulanan-' . strtolower($startDate->format('F-Y')) . '.pdf');
        }

        return $pdf->download('laporan-bulanan-' . strtolower($startDate->format('F-Y')) . '.pdf');
    }

    // METHOD BARU: Untuk Cetak Laporan Kustom (Filter Tanggal)
    public function downloadCustom(Request $request)
    {
        // Validasi input tanggal dari request
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $startDate = Carbon::parse($request->start_date)->startOfDay();
        $endDate = Carbon::parse($request->end_date)->endOfDay();

        $data = $this->getReportData($startDate, $endDate);
        $data['title'] = 'Laporan Keuangan Kustom';
        $data['periode'] = $startDate->translatedFormat('d F Y') . ' s/d ' . $endDate->translatedFormat('d F Y');

        $pdf = Pdf::loadView('reports.finance', $data);

        // Fitur Stream
        if ($request->has('stream')) {
            return $pdf->stream('laporan-kustom-masjid.pdf');
        }

        return $pdf->download('laporan-kustom-masjid.pdf');
    }

    private function getReportData($startDate, $endDate)
    {
        // Ambil data pemasukan manual
        $incomes = FundIncome::whereBetween('transaction_date', [$startDate, $endDate])
            ->get()
            ->map(fn($item) => [
                'date' => $item->transaction_date,
                'description' => $item->title . ' (' . ($item->category->name ?? '-') . ')',
                'amount' => $item->amount,
                'type' => 'income'
            ]);

        // Ambil data donasi online yang sukses
        $donations = Donation::where('status', 'success')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get()
            ->map(fn($item) => [
                'date' => $item->created_at,
                'description' => 'Donasi: ' . $item->donor_name . ' (' . ($item->category->name ?? '-') . ')',
                'amount' => $item->amount,
                'type' => 'income'
            ]);

        // Gabungkan semua pemasukan dan urutkan berdasarkan tanggal
        $allIncomes = $incomes->concat($donations)->sortBy('date');

        // Ambil data pengeluaran
        $expenses = FundExpense::whereBetween('transaction_date', [$startDate, $endDate])
            ->get()
            ->map(fn($item) => [
                'date' => $item->transaction_date,
                'description' => $item->title,
                'amount' => $item->amount,
                'type' => 'expense'
            ])
            ->sortBy('date');

        // Hitung Saldo Awal (Total Pemasukan sebelum Start Date - Total Pengeluaran sebelum Start Date)
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