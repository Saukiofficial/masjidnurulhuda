<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Route Utama (Landing Page)
Route::get('/', LandingController::class)->name('home');
Route::get('/laporan/mingguan', [ReportController::class, 'downloadWeekly'])->name('report.weekly');
Route::get('/laporan/bulanan', [ReportController::class, 'downloadMonthly'])->name('report.monthly');
Route::get('/laporan/custom', [ReportController::class, 'downloadCustom'])->name('report.custom');

Route::get('/laporan', function () {
    return redirect('/');
});