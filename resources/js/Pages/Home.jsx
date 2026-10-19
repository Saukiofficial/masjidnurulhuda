import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Building2, Wallet, TrendingUp, TrendingDown, Clock, Activity, 
    Calendar, Users, MapPin, ArrowRight, ChevronRight, PhoneCall,
    Sparkles, ShieldCheck, HeartHandshake, Play, CheckCircle2
} from 'lucide-react';
import MainLayout from '../Layouts/MainLayout';

export default function Home({ 
    profile, 
    stats = {}, 
    renovationProgress, 
    upcomingEvents = [], 
    leadMembers = [], 
    bankAccounts = [], 
    latestActivities = [] 
}) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR',
            minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(number ?? 0);
    };

    // Jadwal Sholat Estimasi Wilayah Sumenep / Jawa Timur (WIB)
    const prayerTimes = [
        { name: 'Subuh', time: '04:12' },
        { name: 'Terbit', time: '05:28' },
        { name: 'Dzuhur', time: '11:32' },
        { name: 'Ashar', time: '14:48' },
        { name: 'Maghrib', time: '17:36' },
        { name: 'Isya', time: '18:46' },
    ];

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
            setCurrentDate(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const mosqueName = profile?.name || 'Masjid Nurul Huda';
    const heroImageUrl = profile?.hero_image 
        ? ('/storage/' + profile.hero_image) 
        : '/images/hero-mosque.jpg';

    return (
        <MainLayout>
            <Head title={`Beranda - ${mosqueName}`} />

            {/* ═══ 1. HERO SECTION (UNIFIED SEJAJAR KESAMPING: MOBILE & DESKTOP) ═══ */}
            <div className="relative bg-[#FCFCF8] overflow-hidden border-b border-[#E2EBE6]">
                {/* Latar Belakang Foto Arsitektur Masjid di Sisi Kanan (Aktif di SEMUA Layar: Mobile, Tablet, Desktop) */}
                <div className="absolute right-0 top-0 bottom-0 w-[52%] sm:w-[54%] lg:w-[58%] h-full pointer-events-none select-none overflow-hidden">
                    <img 
                        src={heroImageUrl} 
                        alt="Arsitektur Masjid Nurul Huda" 
                        className="w-full h-full object-cover object-center transform scale-105"
                    />

                    {/* Gradient Fade Lembut dari Kiri ke Kanan agar Teks Kontras Sempurna */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FCFCF8] via-[#FCFCF8]/92 via-20% sm:via-25% to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FCFCF8]/70 via-transparent to-transparent sm:hidden"></div>

                    {/* Ornamen Garis Arch Emas Halus Pembingkai Kubah */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 sm:opacity-90" viewBox="0 0 600 650" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M 60 300 L 60 190 Q 60 70, 180 70 L 220 70 Q 300 20, 320 0" 
                            stroke="#D8B45A" 
                            strokeWidth="1.8" 
                            strokeOpacity="0.85" 
                            fill="none" 
                        />
                    </svg>

                    {/* Kurva Hijau & Emas Elegan di Sudut Bawah Kanan */}
                    <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-44 sm:w-64 h-24 sm:h-36 pointer-events-none opacity-90">
                        <svg viewBox="0 0 250 140" fill="none" className="w-full h-full">
                            <path d="M 0 140 Q 140 100, 250 20 L 250 140 Z" fill="#073F35" />
                            <path d="M 0 140 Q 140 100, 250 20" stroke="#D8B45A" strokeWidth="2.5" fill="none" />
                        </svg>
                    </div>
                </div>

                {/* Kontainer Konten Hero (Sejajar ke Samping Berdampingan dengan Foto) */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-14 pb-14 sm:pb-24 lg:pb-32">
                    <div className="w-[72%] sm:w-[68%] lg:max-w-xl xl:max-w-2xl">
                        {/* Basmalah dengan Garis Emas Halus */}
                        <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                            <span className="w-5 sm:w-12 h-[1px] bg-[#D8B45A]/80"></span>
                            <span className="text-[#073F35] text-xs sm:text-base lg:text-xl font-serif tracking-wide" style={{ fontFamily: 'serif' }}>
                                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                            </span>
                            <span className="w-5 sm:w-12 h-[1px] bg-[#D8B45A]/80"></span>
                        </div>

                        {/* Headline Utama */}
                        <h1 className="text-2xl sm:text-4xl lg:text-[3.25rem] font-black text-[#102D31] tracking-tight leading-[1.12] sm:leading-[1.08] mb-3 sm:mb-5">
                            Selamat Datang di<br />
                            Portal Resmi Masjid<br />
                            <span className="text-[#0B5A49]">Nurul Huda</span>
                        </h1>

                        {/* Deskripsi */}
                        <p className="text-xs sm:text-base text-[#52646A] leading-relaxed max-w-sm sm:max-w-lg mb-5 sm:mb-8 font-normal">
                            Menjaga amanah jamaah dengan keterbukaan informasi, transparansi dana donasi, dan pelayanan umat yang amanah.
                        </p>

                        {/* 3 Tombol CTA Hero */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                            {/* CTA Primer */}
                            <Link
                                href="/keuangan"
                                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#073F35] hover:bg-[#0B5A49] text-white font-bold text-xs sm:text-sm shadow-[0_6px_18px_rgba(7,63,53,0.22)] hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                            >
                                <HeartHandshake className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                                <span className="truncate">Laporan Keuangan & Kas</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </Link>

                            {/* Tombol Sekunder Pengurus & Agenda */}
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/pengurus"
                                    className="flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 text-[#0B5A49] font-bold text-xs sm:text-sm border border-[#DCE6E1] shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
                                >
                                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B5A49] flex-shrink-0" />
                                    <span>Pengurus</span>
                                </Link>

                                <Link
                                    href="/kegiatan"
                                    className="flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 text-[#0B5A49] font-bold text-xs sm:text-sm border border-[#DCE6E1] shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
                                >
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B5A49] flex-shrink-0" />
                                    <span>Agenda</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ 2. PANEL 4 FITUR UTAMA (OVERLAPPING HERO) ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8 sm:-mt-12 mb-14 sm:mb-16">
                <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-[#DCE6E1] shadow-[0_14px_40px_rgba(16,45,49,0.08)] p-6 sm:p-8">
                    {/* Desktop: 4 Kolom dengan Pemisah Halus | Mobile: Grid 2x2 */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
                        {/* Fitur 1: Transparansi */}
                        <div className="text-center px-2 sm:px-5 flex flex-col items-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E7F5EF] text-[#073F35] flex items-center justify-center mb-3 shadow-sm">
                                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="font-extrabold text-[#102D31] text-sm sm:text-base mb-1">Transparansi</h3>
                            <p className="text-[11px] sm:text-xs text-[#52646A] leading-relaxed max-w-[200px]">
                                Laporan keuangan dan penggunaan dana yang jelas dan dapat diakses.
                            </p>
                        </div>

                        {/* Fitur 2: Pelayanan Umat */}
                        <div className="text-center px-2 sm:px-5 flex flex-col items-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E7F5EF] text-[#073F35] flex items-center justify-center mb-3 shadow-sm">
                                <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="font-extrabold text-[#102D31] text-sm sm:text-base mb-1">Pelayanan Umat</h3>
                            <p className="text-[11px] sm:text-xs text-[#52646A] leading-relaxed max-w-[200px]">
                                Melayani dengan sepenuh hati untuk kemaslahatan bersama.
                            </p>
                        </div>

                        {/* Fitur 3: Agenda & Kegiatan */}
                        <div className="text-center px-2 sm:px-5 flex flex-col items-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E7F5EF] text-[#073F35] flex items-center justify-center mb-3 shadow-sm">
                                <Calendar className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="font-extrabold text-[#102D31] text-sm sm:text-base mb-1">Agenda & Kegiatan</h3>
                            <p className="text-[11px] sm:text-xs text-[#52646A] leading-relaxed max-w-[200px]">
                                Informasi kegiatan masjid terbaru dan terkini.
                            </p>
                        </div>

                        {/* Fitur 4: Donasi */}
                        <div className="text-center px-2 sm:px-5 flex flex-col items-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E7F5EF] text-[#073F35] flex items-center justify-center mb-3 shadow-sm">
                                <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="font-extrabold text-[#102D31] text-sm sm:text-base mb-1">Donasi</h3>
                            <p className="text-[11px] sm:text-xs text-[#52646A] leading-relaxed max-w-[200px]">
                                Dukungan Anda sangat berarti untuk keberlangsungan masjid.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ 3. SECTION TENTANG MASJID (SESUAI MOCKUP) ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Teks Tentang Masjid (7 Kolom) */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#0B5A49] uppercase">
                            <span className="w-4 h-[2px] bg-[#D8B45A]"></span>
                            <span>TENTANG MASJID</span>
                            <span className="w-4 h-[2px] bg-[#D8B45A]"></span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102D31] tracking-tight">
                            {mosqueName}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#52646A] leading-relaxed">
                            {profile?.history || `${mosqueName} adalah pusat ibadah dan kegiatan umat yang berlokasi di Poreh, Lenteng, Sumenep. Kami berkomitmen untuk terus menjadi tempat ibadah yang nyaman, amanah, dan bermanfaat bagi seluruh jamaah.`}
                        </p>
                        <div className="pt-2">
                            <Link 
                                href="/pengurus"
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#073F35] hover:text-[#0B5A49] group"
                            >
                                <span>Lihat Profil & Struktur Kepengurusan</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Foto Card Profil Masjid (5 Kolom) */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#DCE6E1] group">
                            <img 
                                src={heroImageUrl} 
                                alt={`Profil ${mosqueName}`}
                                className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            
                            <Link 
                                href="/pengurus" 
                                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-2xl border border-white/30 text-white transition"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#073F35] text-amber-300 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <Play className="w-4 h-4 fill-amber-300 ml-0.5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold leading-tight truncate">Profil Masjid</p>
                                    <p className="text-[10px] text-emerald-200">Lihat selengkapnya</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ 4. JADWAL SHOLAT WIDGET ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white rounded-3xl shadow-sm border border-[#DCE6E1] p-5 sm:p-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2 text-center sm:text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#E7F5EF] text-[#073F35] flex items-center justify-center font-bold">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-[#102D31] text-sm sm:text-base">Jadwal Sholat Hari Ini</h3>
                                <p className="text-xs text-[#52646A]">Kec. Lenteng, Kab. Sumenep & Sekitarnya (WIB)</p>
                            </div>
                        </div>
                        <div className="text-xs font-semibold text-[#0B5A49] bg-[#E7F5EF] px-3 py-1.5 rounded-xl border border-emerald-200">
                            {currentDate ? `${currentDate} • ${currentTime}` : 'Waktu Indonesia Barat'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
                        {prayerTimes.map((item) => (
                            <div 
                                key={item.name}
                                className="bg-[#FCFCF8] rounded-2xl p-3 sm:p-4 text-center border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all group"
                            >
                                <span className="text-[11px] font-bold text-[#52646A] group-hover:text-[#0B5A49] transition uppercase tracking-wider">
                                    {item.name}
                                </span>
                                <p className="text-lg sm:text-2xl font-black text-[#102D31] font-mono mt-1 group-hover:text-[#073F35] transition">
                                    {item.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ 5. SPOTLIGHT: SALDO KAS & PROGRES RENOVASI ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5A49] uppercase tracking-widest bg-[#E7F5EF] px-3.5 py-1 rounded-full mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Transparansi Dana & Pembangunan</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#102D31]">
                        Amanah Kas Masjid & Progres Fisik
                    </h2>
                    <p className="text-xs sm:text-sm text-[#52646A] max-w-xl mx-auto mt-1">
                        Laporan keterbukaan dana infaq, sedekah donatur, serta perkembangan renovasi masjid secara berkala.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Kartu Saldo Kas */}
                    <div className="bg-gradient-to-br from-[#073F35] via-[#0B5A49] to-[#073F35] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                                    <Wallet className="w-4 h-4" /> Saldo Kas Masjid Saat Ini
                                </span>
                                <span className="bg-white/15 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                                    REALTIME
                                </span>
                            </div>

                            <p className="text-3xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight mb-4">
                                {formatRupiah(stats?.balance || 0)}
                            </p>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-[11px] text-emerald-200 font-medium">Total Pemasukan</p>
                                    <p className="text-base sm:text-lg font-bold text-white">
                                        {formatRupiah(stats?.totalIncome || 0)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-rose-300 font-medium">Total Pengeluaran</p>
                                    <p className="text-base sm:text-lg font-bold text-rose-200">
                                        {formatRupiah(stats?.totalExpense || 0)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-emerald-200/80">Tersedia pembukuan kas & unduh laporan PDF</span>
                            <Link 
                                href="/keuangan"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-xl text-xs transition shadow-md"
                            >
                                <span>Lihat Mutasi Lengkap</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Kartu Progres Renovasi */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE6E1] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#52646A] flex items-center gap-1.5">
                                    <Activity className="w-4 h-4 text-[#0B5A49]" /> Tahap Renovasi Masjid
                                </span>
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                                    DALAM PROSES
                                </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-[#102D31] mb-2">
                                {renovationProgress?.title || 'Pembangunan & Perluasan Masjid'}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#52646A] leading-relaxed mb-6">
                                {renovationProgress?.description || 'Pengerjaan renovasi sarana dan prasarana fisik masjid untuk meningkatkan kapasitas dan kenyamanan ibadah jamaah.'}
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-700">Persentase Pengerjaan</span>
                                    <span className="text-2xl font-black text-[#073F35]">{renovationProgress?.percentage || 0}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200 shadow-inner">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#0B5A49] to-[#16745E] rounded-full transition-all duration-1000 shadow-md"
                                        style={{ width: `${renovationProgress?.percentage || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-[#52646A]">Menerima donasi uang dan bantuan material fisik</span>
                            <Link 
                                href="/keuangan"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-[#E7F5EF] text-[#073F35] font-bold rounded-xl text-xs border border-slate-200 transition"
                            >
                                <span>Rekap Bantuan Material</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ 6. AGENDA & KEGIATAN TERDEKAT ═══ */}
            <div className="bg-[#FCFCF8] py-14 border-t border-[#E2EBE6]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5A49] uppercase tracking-widest bg-[#E7F5EF] px-3.5 py-1 rounded-full mb-2">
                                <Calendar className="w-3.5 h-3.5 text-[#073F35]" />
                                <span>Jadwal Dakwah & Jamaah</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#102D31]">
                                Agenda & Kegiatan Terdekat
                            </h2>
                        </div>
                        <Link 
                            href="/kegiatan"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#073F35] hover:text-[#0B5A49] group"
                        >
                            <span>Lihat Semua Agenda</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingEvents && upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event) => (
                                <div 
                                    key={event.id}
                                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-[#DCE6E1] transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E7F5EF] text-[#073F35] border border-emerald-200">
                                                {event.category}
                                            </span>
                                            <span className="text-xs font-semibold text-slate-500">
                                                {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-black text-[#102D31] group-hover:text-[#0B5A49] transition line-clamp-2 mb-2">
                                            {event.title}
                                        </h3>

                                        {event.speaker && (
                                            <p className="text-xs text-amber-700 font-semibold mb-2">
                                                🎙️ {event.speaker}
                                            </p>
                                        )}

                                        <p className="text-xs text-[#52646A] line-clamp-3 leading-relaxed mb-4">
                                            {event.description || 'Mari hadir dan makmurkan kegiatan ibadah serta pengajian di masjid.'}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 text-[11px] text-[#52646A] flex items-center justify-between">
                                        <span>⏰ {event.time || 'Waktu sholat'}</span>
                                        <span>📍 {event.location || 'Masjid'}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 bg-white rounded-3xl border border-dashed border-slate-300">
                                <p className="text-sm text-slate-500 font-medium">Belum ada agenda kegiatan mendatang yang dijadwalkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ 7. PENGURUS TAKMIR MASJID ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5A49] uppercase tracking-widest bg-[#E7F5EF] px-3.5 py-1 rounded-full mb-2">
                            <Users className="w-3.5 h-3.5 text-[#073F35]" />
                            <span>Struktur Takmir</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#102D31]">
                            Pengurus Masjid Nurul Huda
                        </h2>
                    </div>
                    <Link 
                        href="/pengurus"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#073F35] hover:text-[#0B5A49] group"
                    >
                        <span>Seluruh Pengurus</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leadMembers.map((member) => (
                        <div 
                            key={member.id}
                            className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg border border-[#DCE6E1] transition-all text-center group"
                        >
                            <div className="w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md bg-gradient-to-br from-[#073F35] to-[#16745E] p-0.5">
                                {member.photo ? (
                                    <img src={`/storage/${member.photo}`} alt={member.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#073F35] font-black text-xl rounded-2xl">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <span className="inline-block text-[11px] font-bold text-[#073F35] bg-[#E7F5EF] px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
                                {member.position}
                            </span>
                            <h3 className="font-extrabold text-[#102D31] text-sm sm:text-base group-hover:text-[#0B5A49] transition">
                                {member.name}
                            </h3>
                            <p className="text-[11px] text-[#52646A] mt-1">Periode {member.period || '2024-2029'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ 8. LOKASI MASJID ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE6E1]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5A49] uppercase tracking-widest bg-[#E7F5EF] px-3.5 py-1 rounded-full mb-3">
                                <MapPin className="w-3.5 h-3.5 text-[#073F35]" />
                                <span>Alamat & Lokasi</span>
                            </div>
                            <h2 className="text-2xl font-black text-[#102D31] mb-2">
                                Kunjungi Masjid Kami
                            </h2>
                            <p className="text-xs sm:text-sm text-[#52646A] leading-relaxed mb-4">
                                {profile?.address || 'Jl. KaliMas, Poreh, Kec. Lenteng, Kabupaten Sumenep, Jawa Timur 69461'}
                            </p>
                            <div className="space-y-2 text-xs text-[#52646A] mb-6">
                                <p className="flex items-center gap-2">
                                    <PhoneCall className="w-4 h-4 text-[#0B5A49]" />
                                    <span>Call Center: {profile?.phone || '081234567890'}</span>
                                </p>
                            </div>
                            <Link 
                                href="/kontak"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#073F35] hover:bg-[#0B5A49] text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-md"
                            >
                                <span>Kirim Pesan ke Takmir</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="lg:col-span-2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!3m2!1sid!2sid!4v1771774324154!5m2!1sid!2sid!6m8!1m7!1s8qDKDyXyEEfA9qi9z9rIKA!2m2!1d-7.040240993042894!2d113.7839145327516!3f205.00391180723352!4f-3.6468265286988526!5f0.7820865974627469"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi Masjid Nurul Huda"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}