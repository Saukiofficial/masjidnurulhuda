import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { 
    PhoneCall, MapPin, Mail, Send, Building2, Wallet, 
    MessageCircle, Clock, CheckCircle2, AlertCircle, Compass, Navigation
} from 'lucide-react';
import MainLayout from '../Layouts/MainLayout';

export default function Contact({ profile, bankAccounts = [] }) {
    const mosqueName = profile?.name || 'Masjid Nurul Huda';
    const mosqueAddress = profile?.address || 'Jl. KaliMas, Poreh, Kec. Lenteng, Kabupaten Sumenep, Jawa Timur 69461';
    const mosquePhone = profile?.phone || '081234567890';
    const mosqueEmail = profile?.email || 'takmir@masjidnurulhuda.id';
    const latitude = profile?.latitude || '-7.040241';
    const longitude = profile?.longitude || '113.783915';

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout>
            <Head title={`Kontak & Layanan - ${mosqueName}`} />

            {/* HEADER BANNER */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white py-12 sm:py-16">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300 mb-3">
                        <PhoneCall className="w-4 h-4" />
                        <span>Layanan Jamaah & Umat</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        Hubungi Pengurus Takmir
                    </h1>
                    <p className="text-xs sm:text-base text-emerald-200 mt-2 max-w-2xl mx-auto">
                        Silakan hubungi kami untuk informasi peribadatan, konfirmasi infaq/donasi, layanan kemaslahatan jamaah, atau menyampaikan aspirasi.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* KOLOM KIRI: INFO KONTAK & MAPS (5 Kolom) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Kartu Call Center / WA */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-base">Call Center & WhatsApp</h3>
                                    <p className="text-xs text-slate-500">Pelayanan cepat respons takmir</p>
                                </div>
                            </div>

                            <p className="text-sm font-black text-slate-800 font-mono tracking-wider mb-2">
                                {mosquePhone}
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                Hubungi untuk keperluan konfirmasi donasi, konsultasi layanan jenazah, izin penggunaan fasilitas masjid, atau informasi kajian.
                            </p>

                            <a
                                href={`https://wa.me/${mosquePhone.replace(/\D/g, '')}?text=${encodeURIComponent('Assalamu\'alaikum Takmir ' + mosqueName + ', saya ingin bertanya mengenai...')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition shadow-md"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Kirim Pesan WhatsApp Langsung</span>
                            </a>
                        </div>

                        {/* Kartu Alamat & Email */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Alamat Lengkap</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{mosqueAddress}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Email Resmi</h4>
                                    <p className="text-xs text-slate-600 mt-1">{mosqueEmail}</p>
                                </div>
                            </div>
                        </div>

                        {/* Embed Google Maps */}
                        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-600">
                                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                    <Compass className="w-4 h-4 text-emerald-600" />
                                    <span>Koordinat: {latitude}, {longitude}</span>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(latitude + ',' + longitude)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1"
                                >
                                    <Navigation className="w-3.5 h-3.5" />
                                    <span>Buka Maps</span>
                                </a>
                            </div>
                            <div className="h-56 rounded-2xl overflow-hidden border border-slate-100">
                                <iframe
                                    src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=id&z=16&output=embed`}
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Peta Lokasi Masjid Nurul Huda"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: FORM PESAN & ASPIRASI (7 Kolom) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
                            <div className="mb-6">
                                <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                                    Kotak Aspirasi & Komunikasi
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                                    Sampaikan Pesan atau Saran Anda
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Pesan Anda akan masuk langsung ke sistem takmir dan ditindaklanjuti dengan amanah.
                                </p>
                            </div>

                            {recentlySuccessful && (
                                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                                    <span>Alhamdulillah, pesan Anda telah terkirim kepada pengurus takmir. Terima kasih atas masukan yang diberikan.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Nama Lengkap <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Contoh: Ahmad Fauzi"
                                            className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                                                errors.name ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                                            }`}
                                            required
                                        />
                                        {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Nomor WhatsApp (Opsional)
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Contoh: 08123456789"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                                        />
                                        {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Email (Opsional)
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="nama@email.com"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                                        />
                                        {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Perihal / Topik <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            placeholder="Contoh: Saran Kegiatan / Konfirmasi Donasi"
                                            className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                                                errors.subject ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                                            }`}
                                            required
                                        />
                                        {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Isi Pesan / Saran / Permohonan Doa <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tuliskan pesan atau saran Anda secara jelas..."
                                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                                            errors.message ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                                        }`}
                                        required
                                    ></textarea>
                                    {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{processing ? 'Sedang Mengirim...' : 'Kirim Pesan ke Pengurus'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
