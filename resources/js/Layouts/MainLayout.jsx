import React from 'react';
import { Link } from '@inertiajs/react';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar Sederhana */}
            <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-primary-700">
                                🕌 Masjid Nurul Huda
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium">Beranda</Link>
                            <Link href="/laporan" className="text-gray-600 hover:text-primary-600 font-medium">Laporan Keuangan</Link>
                            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                                Donasi Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Masjid Nurul Huda , Design by Kyysolutions</p>
                </div>
            </footer>
        </div>
    );
}
