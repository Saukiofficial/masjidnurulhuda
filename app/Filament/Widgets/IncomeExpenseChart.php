<?php

namespace App\Filament\Widgets;

use App\Models\FundExpense;
use App\Models\FundIncome;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class IncomeExpenseChart extends ChartWidget
{
    protected static ?string $heading = 'Grafik Arus Kas (Tahun Ini)';

    protected static ?int $sort = 2; // Tampil di bawah stats

    protected function getData(): array
    {
        // Inisialisasi array bulanan (Jan-Des) dengan nilai 0
        $months = collect(range(1, 12))->map(fn($m) => Carbon::create(null, $m, 1)->format('M'))->toArray();
        $incomes = array_fill(0, 12, 0);
        $expenses = array_fill(0, 12, 0);

        // Query Data Pemasukan Tahun Ini
        $incomeData = FundIncome::selectRaw('MONTH(transaction_date) as month, SUM(amount) as total')
            ->whereYear('transaction_date', date('Y'))
            ->groupBy('month')
            ->pluck('total', 'month')
            ->toArray();

        // Query Data Pengeluaran Tahun Ini
        $expenseData = FundExpense::selectRaw('MONTH(transaction_date) as month, SUM(amount) as total')
            ->whereYear('transaction_date', date('Y'))
            ->groupBy('month')
            ->pluck('total', 'month')
            ->toArray();

        // Mapping data database ke array bulanan (index 0 = Jan, 1 = Feb, dst)
        foreach ($incomeData as $month => $total) {
            $incomes[$month - 1] = $total;
        }
        foreach ($expenseData as $month => $total) {
            $expenses[$month - 1] = $total;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Pemasukan',
                    'data' => $incomes,
                    'borderColor' => '#10b981', // Hijau (Emerald-500)
                    'backgroundColor' => '#10b981',
                    'fill' => false,
                ],
                [
                    'label' => 'Pengeluaran',
                    'data' => $expenses,
                    'borderColor' => '#ef4444', // Merah (Red-500)
                    'backgroundColor' => '#ef4444',
                    'fill' => false,
                ],
            ],
            'labels' => $months,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
