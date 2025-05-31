import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
        <footer className="bg-gradient-to-r from-orange-500 to-amber-500 text-white pt-10 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className=''>
                <div className="flex flex-col justify-center gap-3 mb-3">
             <Image src="/images/logo-zis.png" alt="Logo" width={100} height={100} />
                    <span className="font-bold text-lg tracking-wide text-white">LAZISMU Sumbar</span>
                <p className="text-sm mb-4">Lembaga Amil Zakat Nasional terpercaya di Sumatera Barat.</p>
                </div>
                <div className="flex gap-3 mt-2">
                    <Link href="#" aria-label="Instagram" className="hover:text-orange-400 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25A5.25 5.25 0 1 1 6.75 12 5.25 5.25 0 0 1 12 6.75zm0 1.5A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25zm5.38-1.13a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z" />
                        </svg>
                    </Link>
                    <Link href="#" aria-label="Facebook" className="hover:text-orange-400 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.16 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33v7.03C18.34 21.23 22 17.09 22 12.07">
                            </path>
                        </svg>
                    </Link>
                    <Link href="#" aria-label="YouTube" className="hover:text-orange-400 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M21.8 8.001a2.749 2.749 0 00-1.929-1.943C18.01 5.5 12 5.5 12 5.5s-6.01 0-7.871.558A2.749 2.749 0 002.2 8.001C1.5 9.86 1.5 12 1.5 12s0 2.14.7 3.999a2.749 2.749 0 001.929 1.943C5.99 18.5 12 18.5 12 18.5s6.01 0 7.871-.558a2.749 2.749 0 001.929-1.943C22.5 14.14 22.5 12 22.5 12s0-2.14-.7-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-3">Kontak</h3>
                <ul className="space-y-2 text-sm">
                    <li>Jl. Bundo Kanduang No.1, Belakang Tangsi, Kec. Padang Bar., Kota Padang, Sumatera Barat</li>
                    <li>Email: info@lazismusumbar.or.id</li>
                    <li>Telp: 0821 6212 8403</li>
                </ul>
            </div>
        </div>
        <div className="mt-10 pt-5 text-center text-xs">
            2025 LAZISMU Sumbar. All rights reserved.
        </div>
    </footer>

  )
}

export default Footer
