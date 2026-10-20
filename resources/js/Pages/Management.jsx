import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Users, PhoneCall, ShieldCheck, Award, HeartHandshake, ArrowRight, MessageCircle } from 'lucide-react';
import MainLayout from '../Layouts/MainLayout';

export default function Management({ profile, members = [] }) {
    const mosqueName = profile?.name || 'Masjid Nurul Huda';

    return (
        <MainLayout>
            <Head title={`Pengurus Takmir - ${mosqueName}`} />

            {/* HEADER BANNER */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white py-12 sm:py-16">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300 mb-3">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Amanah & Khidmat Ummat</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        Struktur Pengurus Takmir
                    </h1>
                    <p className="text-xs sm:text-base text-emerald-200 mt-2 max-w-2xl mx-auto">
                        Jajaran pengurus Dewan Kemakmuran {mosqueName} yang mengemban amanah pengelolaan ibadah, dakwah, dan pembangunan fisik masjid.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* VISI & MISI CARD */}
                {profile?.vision_mission && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-black text-slate-900">Visi & Misi Takmir Masjid</h2>
                                <p className="text-xs text-slate-500">Pedoman langkah kepengurusan dan arah pembinaan jamaah</p>
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            {profile.vision_mission}
                        </div>
                    </div>
                )}

                {/* DAFTAR ANGGOTA TAKMIR */}
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Susunan Pengurus Aktif
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Masa Bakti Kepengurusan Periode 2024 - 2029
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members && members.length > 0 ? (
                            members.map((member) => (
                                <div
                                    key={member.id}
                                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="relative mb-5 text-center">
                                            <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden shadow-md bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 group-hover:scale-105 transition-transform">
                                                {member.photo ? (
                                                    <img src={`/storage/${member.photo}`} alt={member.name} className="w-full h-full object-cover rounded-2xl" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-emerald-800 font-black text-2xl rounded-2xl">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center mb-4">
                                            <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                                                {member.position}
                                            </span>
                                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition">
                                                {member.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Masa Bakti: {member.period || '2024 - 2029'}
                                            </p>
                                        </div>

                                        {member.bio && (
                                            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-center mb-4">
                                                {member.bio}
                                            </p>
                                        )}
                                    </div>

                                    {member.phone ? (
                                        <div className="pt-3 border-t border-slate-100 text-center">
                                            <a
                                                href={`https://wa.me/${member.phone.replace(/\D/g, '').replace(/^0/, '62')}?text=${encodeURIComponent('Assalamu\'alaikum ' + member.name + ', perkenalkan saya jamaah Masjid Nurul Huda...')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-bold transition border border-emerald-200"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span>Hubungi via WhatsApp</span>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-slate-400">
                                            Takmir Resmi {mosqueName}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                                <p className="text-sm text-slate-500">Data pengurus belum diisi.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* AJAKAN BERKONTRIBUSI */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-black">Ingin Berpartisipasi atau Berkoordinasi?</h3>
                        <p className="text-xs sm:text-sm text-emerald-200">
                            Takmir masjid senantiasa terbuka menerima saran, masukan, dan partisipasi jamaah.
                        </p>
                    </div>
                    <Link
                        href="/kontak"
                        className="flex-shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold text-xs sm:text-sm transition shadow-lg flex items-center gap-2"
                    >
                        <PhoneCall className="w-4 h-4" />
                        <span>Hubungi Takmir</span>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
