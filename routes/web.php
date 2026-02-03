<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

// Route Utama (Landing Page) - Menampilkan Dashboard Transparansi
Route::get('/', LandingController::class)->name('home');

// Route Download Laporan PDF (Mingguan & Bulanan)
Route::get('/laporan/mingguan', [ReportController::class, 'downloadWeekly'])->name('report.weekly');
Route::get('/laporan/bulanan', [ReportController::class, 'downloadMonthly'])->name('report.monthly');

// Redirect jika user mengakses /laporan secara langsung (opsional, untuk UX yang baik)
Route::get('/laporan', function () {
    return redirect('/');
});
