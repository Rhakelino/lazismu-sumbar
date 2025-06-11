import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const LaporanKeuangan = () => {
    return (
        <div>
            {/* Header Section */}
           <HeroSection
        title="Laporan Keuangan"
        subtitle="Program donasi pilihan untuk kebaikan bersama"
        imageSrc="/images/logo-zis.png"
      />

            {/* Featured Reports */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <motion.h2
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Laporan Terbaru
                </motion.h2>

                <motion.div
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.8 }}
                    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Laporan 2023 */}
                        <motion.div
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            initial="initial"
                            whileInView="animate"
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative h-52 bg-gradient-to-r from-amber-400 to-orange-500">
                                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image src="/images/logo-zis.png" alt="LAZISMU Logo" width={64} height={64} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded">
                                        Terbaru
                                    </span>
                                    <h3 className="text-white text-xl font-bold mt-2">Laporan Keuangan 2023</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Desember 2023</span>
                                    <span className="mx-2">•</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span>PDF (2.4 MB)</span>
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Laporan keuangan tahunan LAZISMU untuk tahun yang berakhir 31 Desember 2023 dan laporan auditor independen.
                                </p>
                                <div className="flex justify-between items-center">
                                    <a href="#" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:shadow-md transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>Unduh</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Laporan 2024 */}
                        <motion.div
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            initial="initial"
                            whileInView="animate"
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative h-52 bg-gradient-to-r from-blue-400 to-indigo-500">
                                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image src="/images/logo-zis.png" alt="LAZISMU Logo" width={64} height={64} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-white text-xl font-bold mt-2">Laporan Keuangan 2024</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Desember 2024</span>
                                    <span className="mx-2">•</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span>PDF (2.1 MB)</span>
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Laporan keuangan tahunan LAZISMU untuk tahun yang berakhir 31 Desember 2022 dan laporan auditor independen.
                                </p>
                                <div className="flex justify-between items-center">
                                    <a href="#" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:shadow-md transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>Unduh</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Laporan 2025 */}
                        <motion.div
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            initial="initial"
                            whileInView="animate"
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative h-52 bg-gradient-to-r from-green-400 to-teal-500">
                                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image src="/images/logo-zis.png" alt="LAZISMU Logo" width={64} height={64} />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-white text-xl font-bold mt-2">Laporan Keuangan 2025</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Desember 2025</span>
                                    <span className="mx-2">•</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span>PDF (1.9 MB)</span>
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Laporan keuangan tahunan LAZISMU untuk tahun yang berakhir 31 Desember 2021 dan laporan auditor independen.
                                </p>
                                <div className="flex justify-between items-center">
                                    <a href="#" className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:shadow-md transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>Unduh</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex justify-center flex-col items-center"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-orange-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Transparansi Keuangan
                    </h2>

                    <motion.div
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <div className="p-6 md:p-8">
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Komitmen Kami</h3>
                                    <p className="text-gray-600 mb-6">
                                        LAZISMU berkomitmen untuk menjaga transparansi dan akuntabilitas dalam mengelola dana
                                        ZIS. Seluruh laporan keuangan kami diaudit oleh akuntan publik independen dan
                                        dipublikasikan kepada masyarakat.
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                        Kami percaya bahwa transparansi adalah kunci kepercayaan donatur. Oleh karena itu, kami
                                        secara konsisten menerbitkan laporan keuangan tahunan yang dapat diakses oleh siapapun.
                                    </p>
                                    <div className="flex space-x-2">
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Teraudit
                                        </span>
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Transparan
                                        </span>
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Akuntabel
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg p-6">
                                        <h3 className="text-lg font-bold text-orange-800 mb-4">Mengapa Transparansi Penting?</h3>
                                        <ul className="space-y-3">
                                            {[
                                                "Membangun kepercayaan donatur",
                                                "Memastikan dana ZIS dikelola dengan baik",
                                                "Menjamin penyaluran dana tepat sasaran",
                                                "Menunjukkan akuntabilitas lembaga",
                                                "Mendukung pengembangan program berkelanjutan",
                                            ].map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-orange-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pertanyaan Umum
                    </h2>

                    <motion.div
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <div className="divide-y divide-gray-200">
                            {[
                                {
                                    question: "Bagaimana cara mendapatkan laporan keuangan LAZISMU?",
                                    answer: "Anda dapat mengunduh laporan keuangan LAZISMU secara langsung dari website kami. Semua laporan tersedia dalam format PDF dan dapat diakses secara gratis oleh siapapun."
                                },
                                {
                                    question: "Apakah laporan keuangan LAZISMU diaudit?",
                                    answer: "Ya, seluruh laporan keuangan LAZISMU diaudit oleh Kantor Akuntan Publik independen yang memiliki reputasi baik dan terpercaya. Hasil audit tersebut kami publikasikan sebagai bagian dari komitmen transparansi."
                                },
                                {
                                    question: "Berapa persen dana ZIS yang disalurkan untuk operasional?",
                                    answer: "Sesuai dengan ketentuan syariah dan peraturan yang berlaku, LAZISMU mengalokasikan maksimal 12,5% dari dana zakat untuk biaya operasional (amil). Rincian penggunaan dana dapat dilihat dalam laporan keuangan kami."
                                },
                                {
                                    question: "Apakah LAZISMU melaporkan penerimaan dan penyaluran dana secara terpisah?",
                                    answer: "Ya, dalam laporan keuangan LAZISMU, kami memisahkan penerimaan dan penyaluran dana berdasarkan sumbernya, seperti zakat, infak/sedekah, dan dana sosial lainnya. Hal ini untuk memastikan bahwa setiap dana disalurkan sesuai dengan ketentuan syariah."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">{item.question}</h3>
                                    <p className="text-gray-600">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default LaporanKeuangan;