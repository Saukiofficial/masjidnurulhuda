import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Clock, Activity, Building2, X, Copy, FileText, Eye, Calendar, Filter } from 'lucide-react';

export default function Home({ stats, renovationProgress, chartData, recentActivities, bankAccounts }) {

    // States untuk Modals
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    
    // States untuk filter tanggal
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Helper untuk format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // Fungsi copy ke clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Nomor rekening berhasil disalin!');
    };

    // Fungsi submit cetak laporan custom
    const handleCustomReport = () => {
        if (!startDate || !endDate) {
            alert('Mohon pilih Tanggal Mulai dan Tanggal Akhir terlebih dahulu.');
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert('Tanggal Mulai tidak boleh lebih besar dari Tanggal Akhir.');
            return;
        }
        // Buka tab baru dengan parameter tanggal untuk trigger PDF di Controller
        window.open(`/laporan/custom?start_date=${startDate}&end_date=${endDate}&stream=true`, '_blank');
        setIsReportModalOpen(false); // Tutup modal setelah klik
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 font-sans text-slate-800">
            <Head title="Laporan Keuangan Masjid Nurul Huda" />

            {/* --- HERO SECTION --- */}
            <div className="relative overflow-hidden">
                {/* Background Islamic Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/50 to-emerald-900"></div>
                </div>

                {/* Decorative Islamic Ornament - Top */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>

                {/* Navbar */}
                <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-6 py-4 shadow-2xl">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-400 rounded-xl blur-md opacity-50"></div>
                                    <div className="relative bg-gradient-to-br from-amber-400 to-yellow-500 p-2.5 rounded-xl shadow-lg">
                                        <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-900" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide">Masjid Nurul Huda</h1>
                                    <p className="text-xs text-emerald-200 hidden sm:block">Laporan Dana Masjid</p>
                                </div>
                            </div>
                            <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
                                <div className="hidden lg:flex gap-2">
                                    <button onClick={() => setIsReportModalOpen(true)} className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white rounded-lg transition text-sm font-medium border border-white/20">
                                        <Filter size={16} /> Filter Laporan
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIsDonationModalOpen(true)}
                                    className="relative group overflow-hidden bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-emerald-900 px-4 sm:px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-sm sm:text-base"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Wallet size={18} />
                                        <span className="hidden sm:inline">Donasi Sekarang</span>
                                        <span className="sm:hidden">Donasi</span>
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-white">
                    {/* Bismillah Ornament */}
                    <div className="mb-8 flex justify-center">
                        <div className="bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 rounded-full border border-amber-400/30 shadow-lg">
                            <p className="text-amber-300 font-arabic text-xl sm:text-2xl lg:text-3xl" style={{ fontFamily: 'serif' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                        </div>
                    </div>

                    {/* Grid Layout untuk Title dan Hadits + Progress */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
                        {/* Kolom Kiri: Title & Deskripsi */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                                    Laporan
                                </span>
                                <br />
                                <span className="text-amber-300 drop-shadow-lg">Dana Masjid Nurul Huda</span>
                            </h2>
                            <p className="text-emerald-100 text-base sm:text-lg md:text-xl mb-8 leading-relaxed">
                                Menjaga amanah dengan menyajikan laporan keuangan masjid secara terbuka, akurat, dan dapat diakses kapan saja oleh jamaah.
                            </p>
                        </div>

                        {/* Kolom Kanan: Hadits Quote + Progress Bar */}
                        <div className="space-y-6">
                            {/* Hadits Quote */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-amber-400/20 p-6 sm:p-8 shadow-2xl">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="text-amber-400 text-3xl sm:text-4xl leading-none">"</div>
                                    <div className="flex-1">
                                        <p className="text-emerald-50 text-sm sm:text-base md:text-lg italic leading-relaxed text-right mb-3" style={{ fontFamily: 'serif' }}>
                                            كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ
                                        </p>
                                        <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                                            "Setiap kalian adalah pemimpin dan setiap kalian akan dimintai pertanggungjawaban atas yang dipimpinnya"
                                        </p>
                                        <p className="text-amber-300/80 text-xs mt-2 font-medium">— HR. Bukhari & Muslim</p>
                                    </div>
                                    <div className="text-amber-400 text-3xl sm:text-4xl leading-none self-end">"</div>
                                </div>
                            </div>

                            {/* Progress Bar Renovasi */}
                            {renovationProgress && (
                                <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                        <div className="flex items-center gap-2.5">
                                            <div className="bg-amber-400/20 p-2 rounded-lg">
                                                <Activity className="w-5 h-5 text-amber-300" />
                                            </div>
                                            <span className="font-bold text-white text-base sm:text-lg">{renovationProgress.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-amber-300 font-bold text-2xl sm:text-3xl">{renovationProgress.percentage}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-emerald-950/50 rounded-full h-4 overflow-hidden shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 h-4 rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(251,191,36,0.6)] relative overflow-hidden"
                                            style={{ width: `${renovationProgress.percentage}%` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-emerald-200/90 mt-4 flex flex-col sm:flex-row justify-between gap-2">
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            Target: Insya Allah Segera
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Activity size={14} />
                                            Update: {new Date(renovationProgress.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Islamic Pattern Wave Separator */}
                <div className="absolute bottom-0 w-full">
                    <svg className="w-full h-16 sm:h-24 lg:h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{stopColor: 'rgb(241 245 249)', stopOpacity: 0}} />
                                <stop offset="100%" style={{stopColor: 'rgb(241 245 249)', stopOpacity: 1}} />
                            </linearGradient>
                        </defs>
                        <path fill="url(#waveGradient)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* --- STATISTIK KEUANGAN --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-20 lg:-mt-28 relative z-20 mb-12 sm:mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Kartu Saldo */}
                    <div className="group bg-gradient-to-br from-white to-blue-50/50 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-blue-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                                    <Wallet size={28} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="bg-blue-100 px-3 py-1 rounded-full">
                                    <p className="text-xs font-bold text-blue-700">KAS</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">Saldo Kas Saat Ini</p>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                                {formatRupiah(stats.balance)}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium mt-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span>Update Real-time</span>
                            </div>
                        </div>
                    </div>

                    {/* Kartu Pemasukan */}
                    <div className="group bg-gradient-to-br from-white to-emerald-50/50 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
                                    <TrendingUp size={28} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="bg-emerald-100 px-3 py-1 rounded-full">
                                    <p className="text-xs font-bold text-emerald-700">MASUK</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">Total Pemasukan</p>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-1">
                                {formatRupiah(stats.totalIncome)}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-3">
                                <TrendingUp size={14} />
                                <span>Berkah Berlimpah</span>
                            </div>
                        </div>
                    </div>

                    {/* Kartu Pengeluaran */}
                    <div className="group bg-gradient-to-br from-white to-red-50/50 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-red-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 sm:p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl text-white shadow-lg group-hover:shadow-red-500/50 transition-shadow">
                                    <TrendingDown size={28} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="bg-red-100 px-3 py-1 rounded-full">
                                    <p className="text-xs font-bold text-red-700">KELUAR</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">Total Pengeluaran</p>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-1">
                                {formatRupiah(stats.totalExpense)}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-3">
                                <Activity size={14} />
                                <span>Dikelola Transparan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GRAFIK DAN AKTIVITAS --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                    {/* Grafik Keuangan */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-t-4 border-amber-400">
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                                    Grafik Keuangan Bulanan
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 ml-4">Perbandingan Pemasukan & Pengeluaran</p>
                            </div>
                            <div className="flex gap-4 text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-600 font-medium">Pemasukan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-gray-600 font-medium">Pengeluaran</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 sm:h-80">
                            {chartData && chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                                                <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
                                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#e5e7eb' }} />
                                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#e5e7eb' }} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} />
                                        <Tooltip formatter={(value) => formatRupiah(value)} contentStyle={{ backgroundColor: 'white', border: '2px solid #d1d5db', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                        <Bar dataKey="pemasukan" fill="url(#colorIncome)" name="Pemasukan" radius={[8, 8, 0, 0]} maxBarSize={60} />
                                        <Bar dataKey="pengeluaran" fill="url(#colorExpense)" name="Pengeluaran" radius={[8, 8, 0, 0]} maxBarSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <div className="bg-gray-100 p-6 rounded-full mb-4">
                                        <Activity size={48} className="opacity-30" />
                                    </div>
                                    <p className="text-lg font-semibold">Belum ada data grafik</p>
                                    <p className="text-sm mt-2">Data akan muncul setelah ada transaksi</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                    <p className="text-xs text-emerald-600 font-semibold mb-1">Rata-rata Masuk/Bulan</p>
                                    <p className="text-lg sm:text-xl font-bold text-emerald-700">
                                        {chartData && chartData.length > 0 ? formatRupiah(chartData.reduce((a,b) => a + (b.pemasukan || 0), 0) / chartData.length) : 'Rp 0'}
                                    </p>
                                </div>
                                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                    <p className="text-xs text-red-600 font-semibold mb-1">Rata-rata Keluar/Bulan</p>
                                    <p className="text-lg sm:text-xl font-bold text-red-700">
                                        {chartData && chartData.length > 0 ? formatRupiah(chartData.reduce((a,b) => a + (b.pengeluaran || 0), 0) / chartData.length) : 'Rp 0'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Aktivitas Terkini */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-t-4 border-teal-400">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full"></div>
                                    Aktivitas Terkini
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 ml-4">Transaksi Terakhir</p>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {recentActivities && recentActivities.length > 0 ? (
                                recentActivities.map((activity) => {
                                    const isIncome = activity.type === 'income';
                                    
                                    return (
                                        <div key={activity.id} className={`group bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 transition-all duration-300 ${isIncome ? 'hover:border-emerald-300 hover:shadow-emerald-100' : 'hover:border-red-200 hover:shadow-red-50'} hover:shadow-lg`}>
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2.5 rounded-lg group-hover:scale-110 transition-transform ${isIncome ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' : 'bg-gradient-to-br from-red-100 to-red-200'}`}>
                                                    {isIncome ? (
                                                        <TrendingUp className="w-5 h-5 text-emerald-700" />
                                                    ) : (
                                                        <FileText className="w-5 h-5 text-red-700" />
                                                    )}
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <p className="text-xs text-gray-500 font-medium">
                                                            {activity.date_formatted}
                                                        </p>
                                                    </div>
                                                    
                                                    <h4 className={`text-sm sm:text-base font-bold text-gray-800 mb-2 transition-colors leading-tight ${isIncome ? 'group-hover:text-emerald-700' : 'group-hover:text-red-700'}`}>
                                                        {activity.title}
                                                    </h4>
                                                    
                                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                                        <span className={`text-xs px-3 py-1.5 rounded-lg font-semibold border ${isIncome ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-100' : 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border-red-100'}`}>
                                                            {activity.category}
                                                        </span>
                                                        
                                                        <span className={`font-bold text-sm sm:text-base ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
                                                            {isIncome ? '+ ' : '- '}
                                                            {formatRupiah(activity.amount)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                                        <Clock size={32} className="opacity-30" />
                                    </div>
                                    <p className="text-sm">Belum ada aktivitas tercatat</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                            <p className="text-xs text-center text-gray-500 font-semibold">Akses Laporan Resmi:</p>
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="/laporan/bulanan?stream=true"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-teal-50 hover:to-emerald-50 border border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 rounded-xl transition-all text-xs font-bold shadow-sm hover:shadow-md"
                                >
                                    <Eye size={14} /> Bulanan
                                </a>
                                <a
                                    href="/laporan/mingguan?stream=true"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-teal-50 hover:to-emerald-50 border border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 rounded-xl transition-all text-xs font-bold shadow-sm hover:shadow-md"
                                >
                                    <Eye size={14} /> Jumat
                                </a>
                            </div>
                            
                            {/* Tombol Buka Modal Filter Tanggal */}
                            <button
                                onClick={() => setIsReportModalOpen(true)}
                                className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 border border-emerald-600 text-white rounded-xl transition-all text-xs font-bold shadow-md hover:shadow-lg"
                            >
                                <Filter size={14} /> Filter Laporan Berdasarkan Tanggal
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Islamic Style */}
            <footer className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-gray-300 py-12 overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-3 rounded-xl shadow-lg">
                                <Building2 className="w-6 h-6 text-emerald-900" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-white">Masjid Nurul Huda</h3>
                                <p className="text-sm text-emerald-200">Cahaya Petunjuk Umat</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full inline-block mb-6 border border-white/20">
                            <p className="text-amber-300 text-sm font-medium">مَنْ بَنَى لِلَّهِ مَسْجِدًا بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ</p>
                        </div>

                        <p className="text-emerald-100 text-sm max-w-2xl mx-auto leading-relaxed italic mb-2">
                            "Barangsiapa membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga"
                        </p>
                        <p className="text-amber-300/80 text-xs font-medium mb-8">— HR. Bukhari & Muslim</p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                            <p className="text-emerald-200">
                                &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Masjid Nurul Huda</span>. Developer by Kyysolutions
                            </p>
                            <div className="flex gap-6 text-emerald-200">
                                <a href="#" className="hover:text-amber-300 transition">Tentang</a>
                                <a href="#" className="hover:text-amber-300 transition">Kontak</a>
                                <a href="#" className="hover:text-amber-300 transition">Lokasi</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* --- MODAL DONASI --- */}
            {isDonationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in" onClick={() => setIsDonationModalOpen(false)}>
                    <div
                        className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden animate-scale-in border-4 border-amber-400/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 px-8 py-10 text-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>
                            <button onClick={() => setIsDonationModalOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                <X size={20} />
                            </button>
                            <div className="relative">
                                <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-white/30">
                                    <Wallet className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Salurkan Donasi</h3>
                                <p className="text-emerald-100 text-sm leading-relaxed px-4">Infaq & sedekah Anda adalah amanah yang akan kami kelola dengan penuh tanggung jawab</p>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="text-center mb-6">
                                <p className="text-emerald-700 font-arabic text-xl mb-2" style={{ fontFamily: 'serif' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
                            </div>

                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {bankAccounts && bankAccounts.length > 0 ? (
                                    bankAccounts.map((bank) => (
                                        <div key={bank.id} className="group relative overflow-hidden p-5 border-2 border-emerald-200 hover:border-amber-400 rounded-2xl bg-gradient-to-br from-emerald-50 to-white hover:shadow-lg transition-all duration-300">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-amber-400/10 transition-colors"></div>
                                            <div className="relative flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="bg-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center">
                                                            <Building2 size={16} className="text-white" />
                                                        </div>
                                                        <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{bank.bank_name}</p>
                                                    </div>
                                                    <p className="text-2xl font-bold text-gray-800 font-mono mb-2 tracking-wide">{bank.account_number}</p>
                                                    <p className="text-sm text-gray-600 font-medium">a.n {bank.account_name}</p>
                                                </div>
                                                <button onClick={() => copyToClipboard(bank.account_number)} className="p-3 hover:bg-white rounded-xl transition-all text-emerald-600 hover:text-amber-600 hover:scale-110 shadow-sm hover:shadow-md" title="Salin Nomor Rekening">
                                                    <Copy size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500">
                                        <p>Belum ada data rekening.</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-5 border-2 border-emerald-200">
                                <p className="text-xs text-emerald-800 font-semibold mb-3 text-center">📱 Konfirmasi Donasi via WhatsApp</p>
                                <a href="https://wa.me/6281225815155?text=Assalamu'alaikum,%20saya%20sudah%20transfer%20donasi%20sebesar..." target="_blank" rel="noreferrer" className="block w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Hubungi Admin: +62 812-2581-5155
                                </a>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-500 italic leading-relaxed">"Semoga Allah membalas kebaikan Anda dengan berlipat ganda"</p>
                                <p className="text-amber-600 font-arabic text-sm mt-2" style={{ fontFamily: 'serif' }}>جَزَاكَ اللهُ خَيْرًا</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL FILTER LAPORAN --- */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in" onClick={() => setIsReportModalOpen(false)}>
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden animate-scale-in border-t-8 border-emerald-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsReportModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            <div className="text-center mb-6">
                                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Filter Laporan</h3>
                                <p className="text-sm text-gray-500 mt-2">Pilih rentang tanggal untuk mencetak atau melihat laporan kustom.</p>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Dari Tanggal (Mulai)</label>
                                    <input 
                                        type="date" 
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-700"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sampai Tanggal (Akhir)</label>
                                    <input 
                                        type="date" 
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-700"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>

                                <button 
                                    onClick={handleCustomReport}
                                    className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <FileText size={18} /> Tampilkan Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #14b8a6;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0d9488;
                }
            `}</style>
        </div>
    );
}