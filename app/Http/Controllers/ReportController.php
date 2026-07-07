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
        ini_set('memory_limit', '512M');

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
        ini_set('memory_limit', '512M');

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
        ini_set('memory_limit', '512M');

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
                    // Thumbnail kecil buat kolom "Bukti" di tabel utama
                    $thumbBase64 = $this->imageToBase64($item->proof_file, maxWidth: 120, quality: 70);

                    if ($item->proof_file) {
                        // Versi lebih besar (tapi tetap dikompres) khusus lampiran
                        $largeBase64 = $this->imageToBase64($item->proof_file, maxWidth: 700, quality: 75);

                        if ($largeBase64) {
                            $proofs->push([
                                'date' => $item->transaction_date,
                                'description' => $item->title,
                                'amount' => $item->amount,
                                'image' => $largeBase64,
                            ]);
                        }
                    }

                    return [
                        'date' => $item->transaction_date,
                        'description' => $item->title,
                        'amount' => $item->amount,
                        'type' => 'expense',
                        'proof' => $thumbBase64,
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
     *
     * PENTING: gambar di-resize & dikompres dulu sebelum di-encode.
     * Foto nota dari HP bisa 3-5MB / resolusi 4000px+, kalau dipakai
     * mentah-mentah lalu ditumpuk untuk banyak baris pengeluaran +
     * lampiran, ini yang bikin memory_limit jebol pas render PDF.
     */
    private function imageToBase64(?string $path, int $maxWidth = 500, int $quality = 75): ?string
    {
        if (!$path || !Storage::disk('public')->exists($path)) {
            return null;
        }

        try {
            $contents = Storage::disk('public')->get($path);

            $source = @imagecreatefromstring($contents);
            if ($source === false) {
                return null;
            }

            $origWidth = imagesx($source);
            $origHeight = imagesy($source);

            if ($origWidth > $maxWidth) {
                $newWidth = $maxWidth;
                $newHeight = (int) round($origHeight * ($maxWidth / $origWidth));

                $resized = imagecreatetruecolor($newWidth, $newHeight);
                // Jaga background putih (kalau source PNG transparan / JPEG)
                $white = imagecolorallocate($resized, 255, 255, 255);
                imagefill($resized, 0, 0, $white);

                imagecopyresampled(
                    $resized, $source,
                    0, 0, 0, 0,
                    $newWidth, $newHeight,
                    $origWidth, $origHeight
                );

                imagedestroy($source);
                $source = $resized;
            }

            ob_start();
            imagejpeg($source, null, $quality);
            $compressed = ob_get_clean();
            imagedestroy($source);

            return 'data:image/jpeg;base64,' . base64_encode($compressed);
        } catch (\Throwable $e) {
            return null;
        }
    }
}