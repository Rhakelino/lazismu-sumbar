import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
       <footer className="bg-gradient-to-br from-black to-blue-500 text-white pt-12 pb-8 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
        {/* Logo and Social Links */}
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Image src="/images/logo-zis.png" width={100} height={100} alt="Logo ZIS" />
                <span className="font-bold text-2xl tracking-wide text-white">LAZISMU Sumbar</span>
            </div>
            <p className="text-sm mb-4">Lembaga Amil Zakat Nasional terpercaya di Sumatera Barat.</p>
            <div className="flex gap-4 mt-4">
                <a href="#" aria-label="Instagram" className="hover:text-orange-400 transition-transform transform hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25A5.25 5.25 0 1 1 6.75 12 5.25 5.25 0 0 1 12 6.75zm0 1.5A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25zm5.38-1.13a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z" />
                    </svg>
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-orange-400 transition-transform transform hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.16 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33v7.03C18.34 21.23 22 17.09 22 12.07"></path>
                    </svg>
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-orange-400 transition-transform transform hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.8 8.001a2.749 2.749 0 00-1.929-1.943C18.01 5.5 12 5.5 12 5.5s-6.01 0-7.871.558A2.749 2.749 0 002.2 8.001C1.5 9.86 1.5 12 1.5 12s0 2.14.7 3.999a2.749 2.749 0 001.929 1.943C5.99 18.5 12 18.5 12 18.5s6.01 0 7.871-.558a2.749 2.749 0 001.929-1.943C22.5 14.14 22.5 12 22.5 12s0-2.14-.7-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
                    </svg>
                </a>
            </div>
        </div>

        {/* Contact Information */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
                <li>Jl. Bundo Kanduang No.1, Belakang Tangsi, Kec. Padang Bar., Kota Padang, Sumatera Barat</li>
                <li>Email: <a href="mailto:info@lazismusumbar.or.id" className="hover:text-orange-400">info@lazismusumbar.or.id</a></li>
                <li>Telp: <a href="tel:+6282162128403" className="hover:text-orange-400">0821 6212 8403</a></li>
            </ul>
        </div>

        {/* Quick Links */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
                <li><Link href="/latar-belakang" className="hover:text-orange-400">Tentang Kami</Link></li>
                <li><Link href="/program" className="hover:text-orange-400">Donasi</Link></li>
                <li><Link href="/berita" className="hover:text-orange-400">Berita</Link></li>
                <li><Link href="/kontak" className="hover:text-orange-400">Kontak Kami</Link></li>
            </ul>
        </div>
    </div>
    {/* Footer Bottom */}
    <div className="mt-12 pt-6 text-center text-xs">
        <p>© 2025 LAZISMU Sumbar. All rights reserved. | <a href="/privacy-policy" className="hover:text-orange-400">Privacy Policy</a></p>
    </div>
</footer>

    )
}

export default Footer;
