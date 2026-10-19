import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Building2, Wallet, TrendingUp, TrendingDown, Clock, Activity, 
    Calendar, Users, MapPin, ArrowRight, ChevronRight, PhoneCall,
    Sparkles, ShieldCheck, HeartHandshake, FileText
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
    // Bisa disesuaikan otomatis dengan penanggalan
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
    const heroTitle = profile?.hero_title || 'Selamat Datang di Portal Resmi Masjid Nurul Huda';
    const heroSubtitle = profile?.hero_subtitle || 'Menjaga amanah jamaah dengan keterbukaan informasi, transparansi dana donasi, dan pelayanan umat yang amanah.';

    return (
        <MainLayout>
            <Head title={`Beranda - ${mosqueName}`} />

            {/* ═══ 1. HERO SECTION ═══ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        {/* Bismillah */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-amber-400/30 shadow-lg">
                            <span className="text-amber-300 text-base sm:text-xl font-serif">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                                {heroTitle}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-emerald-100/90 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            {heroSubtitle}
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <Link
                                href="/keuangan"
                                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-emerald-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all flex items-center gap-2"
                            >
                                <Wallet className="w-5 h-5" />
                                <span>Laporan Keuangan & Kas</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/pengurus"
                                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                            >
                                <Users className="w-5 h-5 text-emerald-300" />
                                <span>Pengurus Takmir</span>
                            </Link>

                            <Link
                                href="/kegiatan"
                                className="px-6 py-3.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base border border-emerald-600/40 transition-all flex items-center gap-2"
                            >
                                <Calendar className="w-5 h-5 text-amber-300" />
                                <span>Agenda & Kajian</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Gelombang Bawah Hero */}
                <div className="w-full overflow-hidden leading-none">
                    <svg className="w-full h-8 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" fill="#f8fafc"></path>
                    </svg>
                </div>
            </div>

            {/* ═══ 2. JADWAL SHOLAT WIDGET ═══ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20 mb-12">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-4 sm:p-6 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2 text-center sm:text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Jadwal Sholat Hari Ini</h3>
                                <p className="text-xs text-slate-500">Kec. Lenteng, Kab. Sumenep & Sekitarnya (WIB)</p>
                            </div>
                        </div>
                        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            {currentDate ? `${currentDate} • ${currentTime}` : 'Waktu Indonesia Barat'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
                        {prayerTimes.map((item, idx) => (
                            <div 
                                key={item.name}
                                className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-3 sm:p-4 text-center border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all group"
                            >
                                <span className="text-[11px] font-bold text-slate-500 group-hover:text-emerald-700 transition uppercase tracking-wider">
                                    {item.name}
                                </span>
                                <p className="text-lg sm:text-2xl font-black text-slate-800 font-mono mt-1 group-hover:text-emerald-800 transition">
                                    {item.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ 3. SPOTLIGHT: SALDO KAS & PROGRES RENOVASI ═══ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1 mb-2 text-xs font-bold text-emerald-800">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Transparansi Dana & Pembangunan</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                        Amanah Kas Masjid & Progres Fisik
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-1">
                        Laporan keterbukaan dana infaq, sedekah donatur, serta perkembangan renovasi masjid secara berkala.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Kartu Saldo Kas */}
                    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                                    <Wallet className="w-4 h-4" /> Saldo Kas Masjid Saat Ini
                                </span>
                                <span className="bg-emerald-800/80 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-700">
                                    REALTIME
                                </span>
                            </div>

                            <p className="text-3xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight mb-4">
                                {formatRupiah(stats?.balance || 0)}
                            </p>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-800/70">
                                <div>
                                    <p className="text-[11px] text-emerald-300 font-medium">Total Pemasukan</p>
                                    <p className="text-base sm:text-lg font-bold text-emerald-100">
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

                        <div className="pt-6 mt-6 border-t border-emerald-800/50 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-emerald-300/80">Tersedia pembukuan kas & unduh laporan PDF mingguan</span>
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
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                    <Activity className="w-4 h-4 text-emerald-600" /> Tahap Renovasi Masjid
                                </span>
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                                    DALAM PROSES
                                </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                                {renovationProgress?.title || 'Pembangunan & Perluasan Masjid'}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                                {renovationProgress?.description || 'Pengerjaan renovasi sarana dan prasarana fisik masjid untuk meningkatkan kapasitas dan kenyamanan ibadah jamaah.'}
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-700">Persentase Pengerjaan</span>
                                    <span className="text-2xl font-black text-emerald-700">{renovationProgress?.percentage || 0}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200 shadow-inner">
                                    <div 
                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 shadow-md"
                                        style={{ width: `${renovationProgress?.percentage || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-slate-500">Menerima bantuan donasi uang maupun material fisik</span>
                            <Link 
                                href="/keuangan"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-emerald-50 text-emerald-800 hover:text-emerald-900 font-bold rounded-xl text-xs border border-slate-200 transition"
                            >
                                <span>Rekap Bantuan Material</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ 4. AGENDA & KEGIATAN TERDEKAT ═══ */}
            <div className="bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 py-14 border-y border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full mb-2">
                                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Jadwal Dakwah & Jamaah</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                                Agenda & Kegiatan Terdekat
                            </h2>
                        </div>
                        <Link 
                            href="/kegiatan"
                            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
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
                                    className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-slate-200/80 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                {event.category}
                                            </span>
                                            <span className="text-xs font-semibold text-slate-500">
                                                {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition line-clamp-2 mb-2">
                                            {event.title}
                                        </h3>

                                        {event.speaker && (
                                            <p className="text-xs text-amber-700 font-semibold mb-2">
                                                🎙️ {event.speaker}
                                            </p>
                                        )}

                                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                                            {event.description || 'Mari hadir dan makmurkan kegiatan ibadah serta pengajian di masjid.'}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
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

            {/* ═══ 5. PENGURUS TAKMIR MASJID ═══ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full mb-2">
                            <Users className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Struktur Takmir</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Pengurus Masjid Nurul Huda
                        </h2>
                    </div>
                    <Link 
                        href="/pengurus"
                        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
                    >
                        <span>Seluruh Pengurus</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leadMembers.map((member) => (
                        <div 
                            key={member.id}
                            className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg border border-slate-200/80 transition-all text-center group"
                        >
                            <div className="w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5">
                                {member.photo ? (
                                    <img src={`/storage/${member.photo}`} alt={member.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-emerald-800 font-black text-xl rounded-2xl">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
                                {member.position}
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition">
                                {member.name}
                            </h3>
                            <p className="text-[11px] text-slate-500 mt-1">Periode {member.period || '2024-2029'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ 6. LOKASI MASJID ═══ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full mb-3">
                                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Alamat & Lokasi</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">
                                Kunjungi Masjid Kami
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                {profile?.address || 'Jl. KaliMas, Poreh, Kec. Lenteng, Kabupaten Sumenep, Jawa Timur 69461'}
                            </p>
                            <div className="space-y-2 text-xs text-slate-600 mb-6">
                                <p className="flex items-center gap-2">
                                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                                    <span>Call Center: {profile?.phone || '081234567890'}</span>
                                </p>
                            </div>
                            <Link 
                                href="/kontak"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-md"
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