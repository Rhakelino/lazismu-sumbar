import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const fadeLeft = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
};

const fadeRight = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
};


const Struktur = () => {
    return (
        <div>
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <motion.div
                      variants={fadeUp}
                      initial="initial"
                      whileInView="animate"
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Image src="/images/logo-zis.png" width={100} height={100} alt="Logo ZIS" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                          <span className="bg-clip-text text-transparent bg-yellow-400">Visi Misi</span>
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                          Program donasi pilihan untuk kebaikan bersama
                        </p>
                      </div>
                    </motion.div>
                  </div>

            {/* Struktur Organisasi */}
            <div className='max-w-full mx-auto px-4 py-16 space-y-16'>
            <div className="mb-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="font-bold uppercase text-xl text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mr-3 text-blue-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">STRUKTUR
                        KEPENGURUSAN</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-8"></div>

                <div className="space-y-8">
                    <div className="transform transition duration-300 hover:scale-[1.01]">
                        <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                            <span className="w-2 h-8 bg-amber-400 rounded-r-md mr-2"></span>
                            Dewan Pengawas Syariah
                        </h3>
                        <div
                            className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-sm p-5 border border-amber-100">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">1</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dr. Dadang Syaripudin, M.A</p>
                                        <p className="text-sm font-medium text-amber-600">Ketua</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">2</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dr. Zaman Sari, M.Ag</p>
                                        <p className="text-sm font-medium text-amber-600">Anggota</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">3</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">B. Farid Wazdi, S.P, M.B.A</p>
                                        <p className="text-sm font-medium text-amber-600">Anggota</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">4</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Muhib Rosyidi, S.Th.I, M.A.Hum</p>
                                        <p className="text-sm font-medium text-amber-600">Anggota</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">5</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dr. Ayi Yunus Rusyana, M.Ag</p>
                                        <p className="text-sm font-medium text-amber-600">Anggota</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">6</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dr. Hamin Ilyas</p>
                                        <p className="text-sm font-medium text-amber-600">Anggota</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span
                                        className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">7</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dr. Izza Rohman, M.A</p>
                                        <p className="text-sm font-medium text-amber-600">Anggota</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-3">
                        <div className="transform transition duration-300 hover:scale-[1.01]">
                            <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                                <span className="w-2 h-8 bg-orange-400 rounded-r-md mr-2"></span>
                                Ketua Badan Pengurus
                            </h3>
                            <div
                                className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-5 border border-orange-100 h-full flex items-center">
                                <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                                    <div className="flex flex-col items-center text-center">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-3 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-gray-800 text-lg">Ahmand Imam Mujadid Rais. M.IR.</p>
                                        <p className="text-sm font-medium text-orange-600 mt-1">Ex Office Bidang Riset &
                                            Pengembangan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="transform transition duration-300 md:pt-0 pt-8 hover:scale-[1.01]">
                            <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                                <span className="w-2 h-8 bg-orange-400 rounded-r-md mr-2"></span>
                                Ketua Badan Pengurus
                            </h3>
                            <div
                                className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-5 border border-orange-100 h-full flex items-center">
                                <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                                    <div className="flex flex-col items-center text-center">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-3 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-gray-800 text-lg">Gunawan Hidayat, ST, MT</p>
                                        <p className="text-sm font-medium text-orange-600 mt-1">Sekretaris
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="transform transition duration-300 pt-8 hover:scale-[1.01]">
                        <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                            <span className="w-2 h-8 bg-blue-400 rounded-r-md mr-2"></span>
                            Wakil Ketua Bidang
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm p-5 border border-blue-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-blue-700 text-sm uppercase">Himpunan & Kerjasama</h4>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="font-semibold text-gray-800">Arif Jamali Muis, S.Pd, M.Pd</p>
                                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-3">Ketua</p>
                                    <div className="border-t border-gray-100 pt-3 mt-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anggota:</p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                                <p className="text-gray-700">Nur Sigit Nugroho, S.I</p>
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                                <p className="text-gray-700">Ninik Annisa, M.A</p>
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">3</span>
                                                <p className="text-gray-700">M Ihsan Tanjung, S.Ag, SH, MH, M.Si</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm p-5 border border-green-200">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-green-700 text-sm uppercase">Audit Kepatuhan</h4>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="font-semibold text-gray-800">Dr. Emmil Juliana Al Hasanah Nasution, S.E, M.Ak</p>
                                    <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-3">Ketua</p>
                                    <div className="border-t border-gray-100 pt-3 mt-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anggota:</p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm">
                                                <span className="flex-shrink-0 bg-green-100 text-green-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                                <p className="text-gray-700">Muhyil Qoyyim, S.E.I, M.Si</p>
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span className="flex-shrink-0 bg-green-100 text-green-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                                <p className="text-gray-700">Elviera Mualimin, S.Psi, M.M</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm p-5 border border-purple-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-purple-700 text-sm uppercase">Kelembagaan & SDM</h4>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="font-semibold text-gray-800">Dr. Nurhayadi Wijhardjono, SE, M.M</p>
                                    <p className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-3">Ketua</p>
                                    <div className="border-t border-gray-100 pt-3 mt-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anggota:</p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                                <p className="text-gray-700">Mustiawan, M.I.Kom</p>
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                                <p className="text-gray-700">Shira Sahira, A.md.Keb.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-sm p-5 border border-red-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-red-700 text-sm uppercase">Pendayagunaan</h4>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="font-semibold text-gray-800">Muarawati Nur Malinda, M.P.A. (M)</p>
                                    <p className="text-xs font-medium text-red-600 uppercase tracking-wider mb-3">Ketua</p>
                                    <div className="border-t border-gray-100 pt-3 mt-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anggota:</p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-red-100 text-red-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                                <p className="text-gray-700">Artati Haris, M.Si</p>
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span
                                                    className="flex-shrink-0 bg-red-100 text-red-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                                <p className="text-gray-700">Masmulyadi, SP, SH, M.Sc</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-5 border border-indigo-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-orange-700 text-sm uppercase">Transformasi Digital</h4>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <p className="font-semibold text-gray-800">Barry Adhitya, S.Psi</p>
                                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wider mb-3">Ketua</p>
                                    <div className="border-t border-gray-100 pt-3 mt-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anggota:</p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm">
                                                <span className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                                <p className="text-gray-700">Dodong Priyambodo</p>
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                                <p className="text-gray-700">Erry Ahmad Sunandar, ST.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="transform transition duration-300 hover:scale-[1.01]">
                        <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                            <span className="w-2 h-8 bg-teal-400 rounded-r-md mr-2"></span>
                            Manager & Staff
                        </h3>

                        <div
                            className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-sm p-5 border border-teal-100 mb-5">
                            <div
                                className="flex flex-col md:flex-row items-center justify-center md:justify-start p-4 bg-white rounded-lg shadow-sm">
                                <div
                                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-400 rounded-full mb-3 md:mb-0 md:mr-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Manager
                                        Area</h4>
                                    <p className="font-bold text-gray-800 text-lg">M. Amirul Ramli, S.Pd, M.Pd</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-4 border border-gray-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-700 text-sm uppercase">Staff Keuangan</h4>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <p className="font-medium text-gray-800">Tuti Nurhayati, S. Ak.</p>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-4 border border-gray-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-700 text-sm uppercase">Staff Program</h4>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-sm">
                                            <span
                                                className="flex-shrink-0 bg-gray-200 text-gray-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                            <p className="text-gray-700">Adv. Arva Dekri, S.H.</p>
                                        </li>
                                        <li className="flex items-center text-sm">
                                            <span
                                                className="flex-shrink-0 bg-gray-200 text-gray-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                            <p className="text-gray-700">Miki Rinaldi</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-4 border border-gray-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-700 text-sm uppercase">Staff Administrasi</h4>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <p className="font-medium text-gray-800">Roza Rahmadani, S.Sos</p>
                                </div>
                            </div>
                            <div
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-4 border border-gray-100">
                                <div className="flex items-center mb-3">
                                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-700 text-sm uppercase">Staff Fundraising</h4>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-sm">
                                            <span
                                                className="flex-shrink-0 bg-gray-200 text-gray-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                                            <p className="text-gray-700">Idil Putra, S.Pd</p>
                                        </li>
                                        <li className="flex items-center text-sm">
                                            <span
                                                className="flex-shrink-0 bg-gray-200 text-gray-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                                            <p className="text-gray-700">Ade Syahputra</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="transform transition duration-300 hover:scale-[1.01]">
                        <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                            <span className="w-2 h-8 bg-amber-400 rounded-r-md mr-2"></span>
                            Volunteer
                        </h3>
                        <div
                            className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-sm p-6 border border-amber-100 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-amber-200 rounded-full opacity-50">
                            </div>
                            <div
                                className="absolute bottom-0 left-0 -mb-8 -ml-8 w-36 h-36 bg-amber-200 rounded-full opacity-30">
                            </div>

                            <div className="relative bg-white rounded-lg shadow-sm py-6 px-4">
                                <p className="font-bold text-amber-600 text-lg tracking-wider">VOLUNTEER LAZIMU SUMATERA BARAT
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Struktur
