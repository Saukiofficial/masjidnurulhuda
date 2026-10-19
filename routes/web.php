<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TakmirController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - Website Resmi Masjid Nurul Huda
|--------------------------------------------------------------------------
*/

// 1. Beranda
Route::get('/', HomeController::class)->name('home');

// 2. Struktur Pengurus Takmir
Route::get('/pengurus', TakmirController::class)->name('takmir');

// 3. Laporan Keuangan & Renovasi
Route::get('/keuangan', FinanceController::class)->name('finance');
Route::get('/laporan', function () {
    return redirect()->route('finance');
});

// 4. Agenda & Kegiatan Masjid
Route::get('/kegiatan', EventController::class)->name('events');

// 5. Kontak & Layanan Jamaah
Route::get('/kontak', [ContactController::class, 'index'])->name('contact');
Route::post('/kontak', [ContactController::class, 'store'])->name('contact.store');

// 6. Unduh / Stream Laporan PDF
Route::get('/laporan/mingguan', [ReportController::class, 'downloadWeekly'])->name('report.weekly');
Route::get('/laporan/bulanan', [ReportController::class, 'downloadMonthly'])->name('report.monthly');
Route::get('/laporan/custom', [ReportController::class, 'downloadCustom'])->name('report.custom');