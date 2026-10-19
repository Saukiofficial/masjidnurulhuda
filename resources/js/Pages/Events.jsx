import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, MapPin, User, Tag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import MainLayout from '../Layouts/MainLayout';

export default function Events({ profile, upcomingEvents = [], pastEvents = [] }) {
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
    const mosqueName = profile?.name || 'Masjid Nurul Huda';

    const eventsToDisplay = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

    return (
        <MainLayout>
            <Head title={`Agenda & Kegiatan - ${mosqueName}`} />

            {/* HEADER BANNER */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white py-12 sm:py-16">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300 mb-3">
                        <Sparkles className="w-4 h-4" />
                        <span>Syiar & Dakwah Islamiyah</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        Agenda & Kegiatan Masjid
                    </h1>
                    <p className="text-xs sm:text-base text-emerald-200 mt-2 max-w-2xl mx-auto">
                        Informasi jadwal kajian rutin, sholat Jumat, peringatan hari besar Islam, dan aktivitas sosial jamaah {mosqueName}.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                {/* TABS FILTER */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/50">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                                activeTab === 'upcoming'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Kegiatan Mendatang ({upcomingEvents.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                                activeTab === 'past'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Kegiatan Sebelumnya ({pastEvents.length})
                        </button>
                    </div>
                </div>

                {/* GRID DAFTAR AGENDA */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventsToDisplay && eventsToDisplay.length > 0 ? (
                        eventsToDisplay.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    {event.poster_image && (
                                        <div className="h-48 overflow-hidden bg-slate-100 relative">
                                            <img
                                                src={`/storage/${event.poster_image}`}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        {!event.poster_image && (
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                    {event.category}
                                                </span>
                                            </div>
                                        )}

                                        <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-3">
                                            {event.title}
                                        </h3>

                                        <div className="space-y-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                <span className="font-semibold text-slate-800">
                                                    {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            {event.time && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                    <span>{event.time}</span>
                                                </div>
                                            )}
                                            {event.speaker && (
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                                    <span className="font-semibold text-slate-800">{event.speaker}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                                <span>{event.location || 'Masjid Nurul Huda'}</span>
                                            </div>
                                        </div>

                                        {event.description && (
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">
                                                {event.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Terbuka untuk Umum
                                    </span>
                                    <span className="text-[10px] text-slate-400">Gratis</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-base font-bold text-slate-700">Belum ada kegiatan pada kategori ini.</p>
                            <p className="text-xs text-slate-400 mt-1">Jadwal kegiatan baru akan segera diumumkan oleh takmir.</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
