import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Building2, Wallet, Users, FileText, Calendar, PhoneCall, 
    Menu, X, Copy, Check, MapPin, Mail, ChevronRight, HeartHandshake
} from 'lucide-react';

export default function MainLayout({ children }) {
    const { sharedProfile, sharedBankAccounts = [], flash = {}, currentRoute = '' } = usePage().props;
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const mosqueName = sharedProfile?.name || 'Masjid Nurul Huda';
    const mosqueAddress = sharedProfile?.address || 'Jl. KaliMas, Poreh, Kec. Lenteng, Kab. Sumenep, Jawa Timur';
    const mosquePhone = sharedProfile?.phone || '081234567890';
    const mosqueEmail = sharedProfile?.email || 'takmir@masjidnurulhuda.id';

    const navItems = [
        { label: 'Beranda', href: '/', route: 'home', icon: Building2 },
        { label: 'Pengurus', href: '/pengurus', route: 'pengurus', icon: Users },
        { label: 'Laporan Keuangan', href: '/keuangan', route: 'keuangan', icon: FileText },
        { label: 'Agenda & Kegiatan', href: '/kegiatan', route: 'kegiatan', icon: Calendar },
        { label: 'Kontak', href: '/kontak', route: 'kontak', icon: PhoneCall },
    ];

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
            {/* Top Bar Aksara Emas */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500"></div>

            {/* Flash Message Alert */}
            {flash.success && (
                <div className="bg-emerald-600 text-white px-4 py-3 text-center text-sm font-medium shadow-md flex items-center justify-center gap-2 animate-fadeIn">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}
            {flash.error && (
                <div className="bg-rose-600 text-white px-4 py-3 text-center text-sm font-medium shadow-md flex items-center justify-center gap-2 animate-fadeIn">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{flash.error}</span>
                </div>
            )}

            {/* NAVBAR UTAMA */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Brand / Logo */}
                        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#073F35] flex items-center justify-center text-amber-300 shadow-md shadow-[#073F35]/20 group-hover:scale-105 transition-transform">
                                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
                                </div>
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-base sm:text-lg lg:text-xl font-black text-[#102D31] tracking-tight leading-tight group-hover:text-[#0B5A49] transition truncate">
                                    {mosqueName}
                                </h1>
                                <p className="hidden sm:block text-[11px] sm:text-xs text-[#52646A] font-medium truncate">
                                    Poreh, Lenteng, Sumenep
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1.5">
                            {navItems.map((item) => {
                                const isActive = currentRoute === item.route;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                            isActive
                                                ? 'bg-[#E7F5EF] text-[#0B5A49] shadow-sm'
                                                : 'text-[#52646A] hover:text-[#0B5A49] hover:bg-slate-50'
                                        }`}
                                    >
                                        <item.icon className={`w-4 h-4 ${isActive ? 'text-[#0B5A49]' : 'text-slate-400'}`} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA Button "Donasi Sekarang" & Mobile Menu Toggle */}
                        <div className="flex items-center gap-2.5">
                            {/* Desktop Only: CTA Button "Donasi Sekarang" */}
                            <button
                                onClick={() => setIsDonationModalOpen(true)}
                                className="hidden lg:flex bg-[#073F35] hover:bg-[#0B5A49] text-white font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-[#073F35]/20 hover:shadow-lg transition-all duration-200 items-center gap-2 active:scale-95"
                            >
                                <HeartHandshake className="w-4 h-4 text-emerald-300" />
                                <span>Donasi Sekarang</span>
                            </button>

                            {/* Mobile Hamburger / Menu Toggle Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#073F35] hover:bg-[#E7F5EF] transition focus:outline-none"
                                aria-label="Toggle navigation menu"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#073F35]" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 shadow-xl animate-fadeIn">
                        {navItems.map((item) => {
                            const isActive = currentRoute === item.route;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                                        isActive
                                            ? 'bg-[#E7F5EF] text-[#0B5A49] font-bold border border-[#CDE5DB]'
                                            : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#073F35] text-white' : 'bg-slate-100 text-slate-600'}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Tombol Donasi Sekarang khusus Mobile di dalam Menu */}
                        <div className="pt-3 mt-2 border-t border-slate-200/80">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsDonationModalOpen(true);
                                }}
                                className="w-full bg-[#073F35] hover:bg-[#0B5A49] text-white font-bold px-4 py-3.5 rounded-2xl text-sm shadow-md shadow-[#073F35]/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                                <HeartHandshake className="w-4 h-4 text-emerald-300" />
                                <span>Donasi Sekarang</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* MAIN BODY CONTENT */}
            <main className="flex-grow">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Kolom 1: Profil */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-amber-300 font-bold shadow-md">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-extrabold text-white tracking-wide">
                                    {mosqueName}
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                {sharedProfile?.tagline || 'Pusat Ibadah, Dakwah, dan Ukhuwah Jamaah Masyarakat Desa Poreh, Lenteng, Sumenep.'}
                            </p>
                            <div className="pt-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-[11px] text-emerald-300 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span>Laporan Kas Terbuka & Realtime</span>
                                </div>
                            </div>
                        </div>

                        {/* Kolom 2: Navigasi Cepat */}
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                                Navigasi
                            </h3>
                            <ul className="space-y-2 text-xs sm:text-sm">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-1.5">
                                            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <a href="/admin" className="text-amber-400/90 hover:text-amber-300 transition flex items-center gap-1.5 font-medium">
                                        <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                                        Login Takmir (Admin)
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Kolom 3: Kontak & Layanan */}
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                                Hubungi Takmir
                            </h3>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                                <li className="flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span>{mosqueAddress}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <a href={`https://wa.me/${mosquePhone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
                                        WA: {mosquePhone}
                                    </a>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span>{mosqueEmail}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Kolom 4: Rekening Donasi */}
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-amber-400 rounded-full"></span>
                                Infaq & Donasi
                            </h3>
                            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                                Donasi dapat disalurkan melalui rekening kas resmi takmir masjid berikut:
                            </p>
                            <div className="space-y-2">
                                {sharedBankAccounts.slice(0, 2).map((bank) => (
                                    <div key={bank.id} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
                                        <p className="font-bold text-slate-200">{bank.bank_name}</p>
                                        <p className="text-amber-400 font-mono tracking-wider">{bank.account_number}</p>
                                        <p className="text-[10px] text-slate-400">a.n. {bank.account_name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Baris Copyright */}
                    <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} {mosqueName}. Seluruh hak cipta dilindungi.</p>
                        <p className="flex items-center gap-1.5">
                            <HeartHandshake className="w-4 h-4 text-emerald-500" />
                            Transparansi Amanah untuk Kemaslahatan Ummat
                        </p>
                    </div>
                </div>
            </footer>

            {/* MODAL DONASI SEKARANG (Global Popup) */}
            {isDonationModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
                        <button
                            onClick={() => setIsDonationModalOpen(false)}
                            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-emerald-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
                                <Wallet className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900">Salurkan Donasi & Infaq</h3>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Rekening resmi kas {mosqueName}
                            </p>
                        </div>

                        <div className="space-y-3.5 mb-6">
                            {sharedBankAccounts.length > 0 ? (
                                sharedBankAccounts.map((bank, index) => (
                                    <div key={bank.id} className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-100 flex items-center justify-between gap-3 shadow-sm hover:border-emerald-300 transition">
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100/70 px-2 py-0.5 rounded-full">
                                                {bank.bank_name}
                                            </span>
                                            <p className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-wider mt-1">
                                                {bank.account_number}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate">a.n. {bank.account_name}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(bank.account_number, index)}
                                            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl text-xs font-bold border border-emerald-200 transition shadow-sm"
                                        >
                                            {copiedIndex === index ? (
                                                <>
                                                    <Check className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                                                    <span>Tersalin!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span>Salin</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-xs text-slate-400 py-4">Nomor rekening belum ditambahkan oleh takmir.</p>
                            )}
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-xs text-amber-900 leading-relaxed mb-6">
                            <p className="font-bold mb-1"> Konfirmasi Donasi:</p>
                            <p>Setelah melakukan transfer, Anda dapat mengonfirmasi donasi ke takmir melalui WhatsApp agar tercatat dalam sistem pembukuan laporan kas.</p>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`https://wa.me/${mosquePhone.replace(/\D/g, '')}?text=${encodeURIComponent('Assalamu\'alaikum Takmir ' + mosqueName + ', saya ingin konfirmasi donasi / infaq...')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold text-center transition shadow-md flex items-center justify-center gap-2"
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>Konfirmasi via WhatsApp</span>
                            </a>
                            <button
                                onClick={() => setIsDonationModalOpen(false)}
                                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
