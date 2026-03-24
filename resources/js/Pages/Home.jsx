import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Clock, Activity, Building2, X, Copy, FileText, Eye, Calendar, Filter, ListFilter } from 'lucide-react';

export default function Home({ stats, renovationProgress, chartData, recentActivities, bankAccounts }) {

    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    
    // States untuk filter tanggal dan tipe laporan
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('semua'); // Default: Semua

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR',
            minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(number);
    };

    const formatRupiahShort = (number) => {
        if (number >= 1000000000) return `Rp ${(number / 1000000000).toFixed(1)}M`;
        if (number >= 1000000) return `Rp ${(number / 1000000).toFixed(1)}jt`;
        if (number >= 1000) return `Rp ${(number / 1000).toFixed(0)}rb`;
        return `Rp ${number}`;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Nomor rekening berhasil disalin!');
    };

    const handleCustomReport = () => {
        if (!startDate || !endDate) {
            alert('Mohon pilih Tanggal Mulai dan Tanggal Akhir terlebih dahulu.');
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert('Tanggal Mulai tidak boleh lebih besar dari Tanggal Akhir.');
            return;
        }
        // Kirim request custom report beserta type-nya
        window.open(`/laporan/custom?start_date=${startDate}&end_date=${endDate}&type=${reportType}&stream=true`, '_blank');
        setIsReportModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 font-sans text-slate-800">
            <Head title="Laporan Keuangan Masjid Nurul Huda" />

            {/* ═══ HERO ═══ */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/50 to-emerald-900"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>

                {/* NAVBAR */}
                <nav className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-2">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-3 sm:px-6 py-3 shadow-2xl">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-amber-400 rounded-xl blur-md opacity-50"></div>
                                    <div className="relative bg-gradient-to-br from-amber-400 to-yellow-500 p-2 sm:p-2.5 rounded-xl shadow-lg">
                                        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-900" />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-white tracking-wide truncate">Masjid Nurul Huda</h1>
                                    <p className="text-[10px] sm:text-xs text-emerald-200 hidden sm:block">Laporan Dana Masjid</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                                <button onClick={() => setIsReportModalOpen(true)} className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white rounded-lg transition text-sm font-medium border border-white/20">
                                    <Filter size={15} /> Filter Laporan
                                </button>
                                <button onClick={() => setIsReportModalOpen(true)} className="lg:hidden flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-white/20 text-emerald-100 rounded-xl border border-white/20 transition" title="Filter">
                                    <Filter size={16} />
                                </button>
                                <button onClick={() => setIsDonationModalOpen(true)} className="relative group overflow-hidden bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-emerald-900 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-xs sm:text-base">
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <Wallet size={15} className="sm:w-[18px] sm:h-[18px]" />
                                        <span className="hidden sm:inline">Donasi Sekarang</span>
                                        <span className="sm:hidden">Donasi</span>
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* HERO CONTENT */}
                <div className="relative z-10 max-w-7xl mx-auto py-6 sm:py-12 lg:py-20 px-3 sm:px-6 lg:px-8 text-white">
                    <div className="mb-5 sm:mb-8 flex justify-center">
                        <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-8 py-2 sm:py-3 rounded-full border border-amber-400/30 shadow-lg">
                            <p className="text-amber-300 text-sm sm:text-2xl lg:text-3xl text-center" style={{ fontFamily: 'serif' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-12 items-center mb-4 sm:mb-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">Laporan</span>
                                <br />
                                <span className="text-amber-300 drop-shadow-lg">Dana Masjid Nurul Huda</span>
                            </h2>
                            <p className="text-emerald-100 text-xs sm:text-lg md:text-xl mb-4 sm:mb-8 leading-relaxed">
                                Menjaga amanah dengan menyajikan laporan keuangan masjid secara terbuka, akurat, dan dapat diakses kapan saja oleh jamaah.
                            </p>
                        </div>

                        <div className="space-y-3 sm:space-y-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-amber-400/20 p-4 sm:p-8 shadow-2xl">
                                <div className="flex items-start gap-2 sm:gap-4">
                                    <div className="text-amber-400 text-2xl sm:text-4xl leading-none flex-shrink-0">"</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-emerald-50 text-xs sm:text-lg italic leading-relaxed text-right mb-2 sm:mb-3" style={{ fontFamily: 'serif' }}>
                                            كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ
                                        </p>
                                        <p className="text-emerald-100 text-[10px] sm:text-sm leading-relaxed">
                                            "Setiap kalian adalah pemimpin dan setiap kalian akan dimintai pertanggungjawaban atas yang dipimpinnya"
                                        </p>
                                        <p className="text-amber-300/80 text-[10px] sm:text-xs mt-1.5 font-medium">— HR. Bukhari & Muslim</p>
                                    </div>
                                    <div className="text-amber-400 text-2xl sm:text-4xl leading-none self-end flex-shrink-0">"</div>
                                </div>
                            </div>

                            {renovationProgress && (
                                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-white/20 shadow-2xl">
                                    <div className="flex justify-between items-center mb-3 sm:mb-4 gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="bg-amber-400/20 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                                            </div>
                                            <span className="font-bold text-white text-xs sm:text-lg truncate">{renovationProgress.title}</span>
                                        </div>
                                        <span className="text-amber-300 font-bold text-xl sm:text-3xl flex-shrink-0">{renovationProgress.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-emerald-950/50 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                                        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(251,191,36,0.6)] relative overflow-hidden" style={{ width: `${renovationProgress.percentage}%` }}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-emerald-200/90 mt-3 flex justify-between gap-2">
                                        <span className="flex items-center gap-1"><Clock size={10} /> Target: Insya Allah Segera</span>
                                        <span className="flex items-center gap-1"><Activity size={10} /> {new Date(renovationProgress.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 w-full">
                    <svg className="w-full h-8 sm:h-20 lg:h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'rgb(241 245 249)', stopOpacity: 0 }} />
                                <stop offset="100%" style={{ stopColor: 'rgb(241 245 249)', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <path fill="url(#waveGradient)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* ═══ STATISTIK — 3 kolom selalu ═══ */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-4 sm:-mt-16 lg:-mt-28 relative z-20 mb-5 sm:mb-12">
                <div className="grid grid-cols-3 gap-2 sm:gap-5 lg:gap-6">

                    {/* Pemasukan — KIRI */}
                    <div className="group bg-gradient-to-br from-white to-emerald-50/50 p-3 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border-t-4 border-emerald-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-14 sm:w-32 h-14 sm:h-32 bg-emerald-500/5 rounded-full -mr-7 sm:-mr-16 -mt-7 sm:-mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-2xl text-white shadow-md">
                                    <TrendingUp size={14} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <span className="bg-emerald-100 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-bold text-emerald-700">MASUK</span>
                            </div>
                            <p className="text-[8px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide mb-0.5 sm:mb-1">PEMASUKAN</p>
                            <h3 className="text-[7px] xs:text-[9px] sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent leading-tight break-all sm:break-normal">
                                {formatRupiah(stats.totalIncome)}
                            </h3>
                            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-2">
                                <TrendingUp size={12} /><span>Berkah Berlimpah</span>
                            </div>
                        </div>
                    </div>

                    {/* Pengeluaran — TENGAH */}
                    <div className="group bg-gradient-to-br from-white to-red-50/50 p-3 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border-t-4 border-red-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-14 sm:w-32 h-14 sm:h-32 bg-red-500/5 rounded-full -mr-7 sm:-mr-16 -mt-7 sm:-mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:rounded-2xl text-white shadow-md">
                                    <TrendingDown size={14} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <span className="bg-red-100 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-bold text-red-700">KELUAR</span>
                            </div>
                            <p className="text-[8px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide mb-0.5 sm:mb-1">PENGELUARAN</p>
                            <h3 className="text-[7px] xs:text-[9px] sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent leading-tight break-all sm:break-normal">
                                {formatRupiah(stats.totalExpense)}
                            </h3>
                            <div className="hidden sm:flex items-center gap-1.5 text-xs text-red-600 font-medium mt-2">
                                <Activity size={12} /><span>Dikelola Transparan</span>
                            </div>
                        </div>
                    </div>

                    {/* Saldo — KANAN */}
                    <div className="group bg-gradient-to-br from-white to-blue-50/50 p-3 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border-t-4 border-blue-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-14 sm:w-32 h-14 sm:h-32 bg-blue-500/5 rounded-full -mr-7 sm:-mr-16 -mt-7 sm:-mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-2xl text-white shadow-md">
                                    <Wallet size={14} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <span className="bg-blue-100 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-bold text-blue-700">KAS</span>
                            </div>
                            <p className="text-[8px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide mb-0.5 sm:mb-1">SiSA SALDO</p>
                            <h3 className="text-[7px] xs:text-[9px] sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent leading-tight break-all sm:break-normal">
                                {formatRupiah(stats.balance)}
                            </h3>
                            <div className="hidden sm:flex items-center gap-1.5 text-xs text-blue-600 font-medium mt-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span>Update Real-time</span>
                            </div>
                            <div className="sm:hidden flex items-center gap-1 text-[8px] text-blue-500 font-medium mt-1">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                <span>Live</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ═══ GRAFIK & AKTIVITAS ═══ */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-8 sm:mb-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

                    {/* GRAFIK */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-t-4 border-amber-400">
                        <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 flex-wrap">
                            <div>
                                <h3 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-1 sm:w-1.5 h-5 sm:h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                                    Grafik Keuangan Bulanan
                                </h3>
                                <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 ml-3 sm:ml-4">Perbandingan Pemasukan & Pengeluaran</p>
                            </div>
                            <div className="flex gap-2 sm:gap-4 text-[9px] sm:text-sm ml-3 sm:ml-0">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-600 font-medium">Pemasukan</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="text-gray-600 font-medium">Pengeluaran</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-44 sm:h-64 lg:h-80">
                            {chartData && chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -28, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={{ stroke: '#e5e7eb' }} />
                                        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={{ stroke: '#e5e7eb' }} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} width={36} />
                                        <Tooltip formatter={(value) => formatRupiah(value)} contentStyle={{ backgroundColor: 'white', border: '2px solid #d1d5db', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px' }} />
                                        <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '10px' }} iconType="circle" />
                                        <Bar dataKey="pemasukan" fill="url(#colorIncome)" name="Pemasukan" radius={[6, 6, 0, 0]} maxBarSize={48} />
                                        <Bar dataKey="pengeluaran" fill="url(#colorExpense)" name="Pengeluaran" radius={[6, 6, 0, 0]} maxBarSize={48} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <div className="bg-gray-100 p-4 sm:p-6 rounded-full mb-3 sm:mb-4">
                                        <Activity size={32} className="sm:w-12 sm:h-12 opacity-30" />
                                    </div>
                                    <p className="text-sm sm:text-lg font-semibold">Belum ada data grafik</p>
                                    <p className="text-xs sm:text-sm mt-1">Data akan muncul setelah ada transaksi</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
                                <div className="bg-emerald-50 rounded-xl p-2 sm:p-4 border border-emerald-100">
                                    <p className="text-[8px] sm:text-xs text-emerald-600 font-semibold mb-0.5 sm:mb-1">Rata-rata Masuk/Bulan</p>
                                    <p className="text-[7px] sm:text-xl font-bold text-emerald-700 leading-tight break-all sm:break-normal">
                                        {chartData && chartData.length > 0 ? formatRupiah(chartData.reduce((a, b) => a + (b.pemasukan || 0), 0) / chartData.length) : 'Rp 0'}
                                    </p>
                                </div>
                                <div className="bg-red-50 rounded-xl p-2 sm:p-4 border border-red-100">
                                    <p className="text-[8px] sm:text-xs text-red-600 font-semibold mb-0.5 sm:mb-1">Rata-rata Keluar/Bulan</p>
                                    <p className="text-[7px] sm:text-xl font-bold text-red-700 leading-tight break-all sm:break-normal">
                                        {chartData && chartData.length > 0 ? formatRupiah(chartData.reduce((a, b) => a + (b.pengeluaran || 0), 0) / chartData.length) : 'Rp 0'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AKTIVITAS TERKINI */}
                    <div className="relative bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-xl overflow-hidden border border-slate-100" style={{ boxShadow: '0 4px 24px 0 rgba(16,185,129,0.07), 0 1.5px 6px 0 rgba(0,0,0,0.06)' }}>
                        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500"></div>

                        <div className="px-3 sm:px-6 pt-3 sm:pt-5 pb-3 sm:pb-4 flex items-center justify-between border-b border-slate-100 bg-white">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-200">
                                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-none">Aktivitas Terkini</h3>
                                    <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5 font-medium">
                                        {recentActivities && recentActivities.length > 0 ? `${recentActivities.length} transaksi terbaru` : 'Transaksi Terakhir'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 bg-red-50 border border-red-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                <span className="text-[8px] sm:text-xs font-bold text-red-600 tracking-widest">LIVE</span>
                            </div>
                        </div>

                        <div className="max-h-[320px] sm:max-h-[440px] lg:max-h-[500px] overflow-y-auto custom-scrollbar px-3 sm:px-4 py-3 sm:py-4">
                            {recentActivities && recentActivities.length > 0 ? (
                                <div className="relative">
                                    <div className="absolute left-[17px] sm:left-[22px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-300 via-slate-200 to-slate-100 rounded-full"></div>
                                    <div className="space-y-2 sm:space-y-3">
                                        {recentActivities.map((activity) => {
                                            const isIncome = activity.type === 'income';
                                            return (
                                                <div key={activity.id} className="relative flex gap-2 sm:gap-4 group">
                                                    <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-9 sm:w-11 h-9 sm:h-11 mt-0.5">
                                                        <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${isIncome ? 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-amber-200' : 'bg-gradient-to-br from-slate-200 to-slate-300 shadow-slate-200'}`}>
                                                            {isIncome
                                                                ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-amber-900" />
                                                                : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`flex-1 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border transition-all duration-300 group-hover:-translate-y-0.5 ${isIncome ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-white border-amber-200 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-100' : 'bg-white border-slate-100 group-hover:border-slate-200 group-hover:shadow-md'}`}
                                                        style={isIncome ? { boxShadow: '0 2px 12px 0 rgba(251,191,36,0.13)' } : {}}
                                                    >
                                                        <div className="flex items-start justify-between gap-1 mb-1.5 sm:mb-2">
                                                            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                                                                {isIncome && (
                                                                    <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 text-[7px] sm:text-[10px] font-extrabold px-1.5 sm:px-2.5 py-0.5 rounded-full tracking-wide shadow-sm">
                                                                        ✦ DONASI
                                                                    </span>
                                                                )}
                                                                <span className={`text-[7px] sm:text-[10px] font-semibold px-1.5 sm:px-2.5 py-0.5 rounded-full border ${isIncome ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                                                    {activity.category}
                                                                </span>
                                                            </div>
                                                            <p className="text-[7px] sm:text-[10px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-0.5 flex-shrink-0">
                                                                <Clock size={7} className="sm:w-[10px] sm:h-[10px]" />
                                                                {activity.date_formatted}
                                                            </p>
                                                        </div>
                                                        <h4 className={`text-[9px] sm:text-sm font-bold leading-snug mb-1.5 sm:mb-2.5 ${isIncome ? 'text-amber-900' : 'text-slate-700'}`}>
                                                            {activity.title}
                                                        </h4>
                                                        <div className="flex items-center justify-between gap-1">
                                                            <span className={`text-[8px] sm:text-sm font-extrabold break-all sm:break-normal ${isIncome ? 'text-emerald-600' : 'text-red-500'}`}>
                                                                {isIncome ? '+' : '−'}{' '}{formatRupiah(activity.amount)}
                                                            </span>
                                                            {isIncome && (
                                                                <span className="text-amber-500 text-[8px] sm:text-xs font-medium" style={{ fontFamily: 'serif' }}>
                                                                    جَزَاكَ اللهُ
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 sm:h-56 text-slate-400">
                                    <div className="relative mb-3">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                                            <Clock size={20} className="sm:w-7 sm:h-7 text-emerald-400" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400 flex items-center justify-center shadow">
                                            <span className="text-[8px]">✦</span>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold text-slate-500">Belum ada aktivitas</p>
                                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Jadilah yang pertama berdonasi 🤲</p>
                                </div>
                            )}
                        </div>

                        <div className="px-3 sm:px-6 pb-3 sm:pb-5 pt-2.5 sm:pt-4 border-t border-slate-100 bg-white space-y-2 sm:space-y-3">
                            <p className="text-[8px] sm:text-[11px] text-center text-slate-400 font-semibold uppercase tracking-widest">Akses Laporan Resmi</p>
                            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                <a href="/laporan/bulanan?stream=true" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-teal-50 hover:to-emerald-50 border border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 rounded-lg sm:rounded-xl transition-all text-[8px] sm:text-xs font-bold shadow-sm hover:shadow-md">
                                    <Eye size={10} className="sm:w-3.5 sm:h-3.5" /> Bulanan
                                </a>
                                <a href="/laporan/mingguan?stream=true" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-teal-50 hover:to-emerald-50 border border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 rounded-lg sm:rounded-xl transition-all text-[8px] sm:text-xs font-bold shadow-sm hover:shadow-md">
                                    <Eye size={10} className="sm:w-3.5 sm:h-3.5" /> Jumat
                                </a>
                            </div>
                            <button onClick={() => setIsReportModalOpen(true)} className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl transition-all text-[8px] sm:text-xs font-bold shadow-md hover:shadow-lg">
                                <Filter size={10} className="sm:w-3.5 sm:h-3.5" /> Filter & Cetak Laporan
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* ═══ LOKASI MASJID ═══ */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-8 sm:mb-14">
                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Lokasi Kami</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-2">
                        Temukan <span className="text-emerald-600">Masjid Nurul Huda</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">Kami terbuka untuk seluruh jamaah. Datang, beribadah, dan bersama membangun masjid yang lebih baik.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 items-stretch">

                    {/* Info Card — kiri */}
                    <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">

                        {/* Alamat */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6 flex-1">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Alamat Lengkap</p>
                                    <h3 className="text-sm sm:text-base font-extrabold text-slate-800 mb-1">Masjid Nurul Huda</h3>
                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">XQ5M+RGC, Daleman, Poreh, Kec. Lenteng,<br className="hidden sm:inline"/> Kabupaten Sumenep, Jawa Timur 69461</p>
                                </div>
                            </div>
                        </div>

                        {/* Jam Sholat */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md shadow-amber-200">
                                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-900" />
                                </div>
                                <p className="text-xs sm:text-sm font-extrabold text-slate-800">Waktu Sholat Berjamaah</p>
                            </div>
                            <div className="space-y-2 sm:space-y-2.5">
                                {[
                                    { name: 'Subuh', time: '04.30', color: 'bg-indigo-100 text-indigo-700' },
                                    { name: 'Dzuhur', time: '12.00', color: 'bg-amber-100 text-amber-700' },
                                    { name: 'Ashar', time: '15.15', color: 'bg-orange-100 text-orange-700' },
                                    { name: 'Maghrib', time: '17.45', color: 'bg-rose-100 text-rose-700' },
                                    { name: "Isya'", time: '19.00', color: 'bg-emerald-100 text-emerald-700' },
                                ].map((sholat) => (
                                    <div key={sholat.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${sholat.color}`}>{sholat.name}</span>
                                        </div>
                                        <span className="text-xs sm:text-sm font-bold text-slate-700 font-mono">{sholat.time} WIB</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-slate-400 italic mt-3 text-center">*Waktu dapat berbeda, sesuaikan jadwal setempat</p>
                        </div>

                        {/* Tombol Google Maps */}
                        <a
                            href="https://maps.google.com/?q=-7.040240993042894,113.7839145327516"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-emerald-200 text-xs sm:text-sm transform hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            Buka di Google Maps
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </a>
                    </div>

                    {/* Peta — kanan */}
                    <div className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-xl border-2 border-amber-200" style={{minHeight: '320px'}}>
                        {/* Decorative corner ornament */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 z-10"></div>
                        <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md border border-amber-200 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-700">Masjid Nurul Huda</span>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!3m2!1sid!2sid!4v1771774324154!5m2!1sid!2sid!6m8!1m7!1s8qDKDyXyEEfA9qi9z9rIKA!2m2!1d-7.040240993042894!2d113.7839145327516!3f205.00391180723352!4f-3.6468265286988526!5f0.7820865974627469"
                            className="w-full h-full absolute inset-0"
                            style={{ border: 0, minHeight: '320px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Masjid Nurul Huda"
                        ></iframe>
                        {/* Subtle vignette overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow: 'inset 0 0 30px 4px rgba(0,0,0,0.07)'}}></div>
                    </div>

                </div>
            </div>

            {/* ═══ FOOTER ═══ */}
            <footer className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-gray-300 py-8 sm:py-12 overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-5 sm:mb-8">
                        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-2 sm:p-3 rounded-xl shadow-lg">
                                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-900" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-base sm:text-xl font-bold text-white">Masjid Nurul Huda</h3>
                                <p className="text-[10px] sm:text-sm text-emerald-200">Cahaya Petunjuk Umat</p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full inline-block mb-4 sm:mb-6 border border-white/20">
                            <p className="text-amber-300 text-xs sm:text-sm font-medium">مَنْ بَنَى لِلَّهِ مَسْجِدًا بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ</p>
                        </div>
                        <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed italic mb-1.5 sm:mb-2">
                            "Barangsiapa membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga"
                        </p>
                        <p className="text-amber-300/80 text-[10px] sm:text-xs font-medium mb-5 sm:mb-8">— HR. Bukhari & Muslim</p>
                    </div>
                    <div className="border-t border-white/10 pt-4 sm:pt-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                            <p className="text-emerald-200 text-center text-[10px] sm:text-sm">
                                &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Masjid Nurul Huda</span>. Developer by Sauki Annaim
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ═══ MODAL DONASI — Bottom sheet on mobile ═══ */}
            {isDonationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setIsDonationModalOpen(false)}>
                    <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md relative overflow-hidden animate-slide-up border-4 border-amber-400/20" onClick={(e) => e.stopPropagation()}>
                        {/* Drag handle mobile */}
                        <div className="flex justify-center pt-2.5 sm:hidden">
                            <div className="w-9 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 px-6 py-6 sm:px-8 sm:py-10 text-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
                            <button onClick={() => setIsDonationModalOpen(false)} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition">
                                <X size={18} />
                            </button>
                            <div className="relative">
                                <div className="bg-white/20 backdrop-blur-sm w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg border-2 border-white/30">
                                    <Wallet className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">Salurkan Donasi</h3>
                                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed px-2 sm:px-4">Infaq & sedekah Anda adalah amanah yang akan kami kelola dengan penuh tanggung jawab</p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-8 max-h-[55vh] sm:max-h-none overflow-y-auto custom-scrollbar">
                            <div className="text-center mb-4 sm:mb-6">
                                <p className="text-emerald-700 text-base sm:text-xl mb-1.5 sm:mb-2" style={{ fontFamily: 'serif' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-[160px] sm:max-h-[300px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                                {bankAccounts && bankAccounts.length > 0 ? (
                                    bankAccounts.map((bank) => (
                                        <div key={bank.id} className="group relative overflow-hidden p-3.5 sm:p-5 border-2 border-emerald-200 hover:border-amber-400 rounded-2xl bg-gradient-to-br from-emerald-50 to-white hover:shadow-lg transition-all duration-300">
                                            <div className="relative flex justify-between items-start gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
                                                        <div className="bg-emerald-600 w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <Building2 size={12} className="sm:w-4 sm:h-4 text-white" />
                                                        </div>
                                                        <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider truncate">{bank.bank_name}</p>
                                                    </div>
                                                    <p className="text-base sm:text-2xl font-bold text-gray-800 font-mono mb-1 sm:mb-2 tracking-wide">{bank.account_number}</p>
                                                    <p className="text-xs text-gray-600 font-medium">a.n {bank.account_name}</p>
                                                </div>
                                                <button onClick={() => copyToClipboard(bank.account_number)} className="p-2 sm:p-3 hover:bg-white rounded-xl transition-all text-emerald-600 hover:text-amber-600 hover:scale-110 shadow-sm hover:shadow-md flex-shrink-0">
                                                    <Copy size={16} className="sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500 text-sm"><p>Belum ada data rekening.</p></div>
                                )}
                            </div>

                            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-4 sm:p-5 border-2 border-emerald-200">
                                <p className="text-[10px] sm:text-xs text-emerald-800 font-semibold mb-2 sm:mb-3 text-center">📱 Konfirmasi Donasi via WhatsApp</p>
                                <a href="https://wa.me/6281225815155?text=Assalamu'alaikum,%20saya%20sudah%20transfer%20donasi%20sebesar..." target="_blank" rel="noreferrer" className="block w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl transition-all shadow-md text-xs sm:text-sm">
                                    Hubungi Admin: +62 812-2581-5155
                                </a>
                            </div>

                            <div className="mt-4 text-center pb-1">
                                <p className="text-[10px] sm:text-xs text-gray-500 italic">"Semoga Allah membalas kebaikan Anda dengan berlipat ganda"</p>
                                <p className="text-amber-600 text-xs sm:text-sm mt-1.5" style={{ fontFamily: 'serif' }}>جَزَاكَ اللهُ خَيْرًا</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ MODAL FILTER — Bottom sheet on mobile ═══ */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setIsReportModalOpen(false)}>
                    <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md relative overflow-hidden animate-slide-up border-t-8 border-emerald-500" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center pt-2.5 sm:hidden">
                            <div className="w-9 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                        <button onClick={() => setIsReportModalOpen(false)} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition">
                            <X size={18} />
                        </button>
                        <div className="p-5 sm:p-8">
                            <div className="text-center mb-4 sm:mb-6">
                                <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-emerald-600">
                                    <ListFilter size={22} className="sm:w-8 sm:h-8" />
                                </div>
                                <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Filter Cetak Laporan</h3>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Pilih kategori dan rentang tanggal untuk mencetak laporan spesifik.</p>
                            </div>
                            <div className="space-y-4 sm:space-y-5">
                                {/* Pilihan Kategori / Tipe Laporan */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Kategori Laporan</label>
                                    <select 
                                        className="w-full border-2 border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-700 bg-white text-sm"
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                    >
                                        <option value="semua">Semua Transaksi (Buku Kas)</option>
                                        <option value="pemasukan">Khusus Pemasukan Kas (Manual)</option>
                                        <option value="donatur">Khusus Penerimaan Donasi</option>
                                        <option value="pengeluaran">Khusus Pengeluaran</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Dari Tanggal (Mulai)</label>
                                    <input type="date" className="w-full border-2 border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-700 text-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Sampai Tanggal (Akhir)</label>
                                    <input type="date" className="w-full border-2 border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-700 text-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                <button onClick={handleCustomReport} className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg text-sm">
                                    <FileText size={16} /> Tampilkan Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                .animate-fade-in { animation: fade-in 0.25s ease-out; }
                .animate-scale-in { animation: scale-in 0.3s ease-out; }
                .animate-slide-up { animation: slide-up 0.32s cubic-bezier(0.32,0.72,0,1); }
                .animate-shimmer { animation: shimmer 2s infinite; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #14b8a6; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0d9488; }
            `}</style>
        </div>
    );
}