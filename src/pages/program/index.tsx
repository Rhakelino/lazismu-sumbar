import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';

const Program = () => {
    // Categories state
    const categories = [
        { name: 'Semua', color: 'orange' },
        { name: 'Qurban', color: 'amber' },
        { name: 'Zakat', color: 'emerald' },
        { name: 'Infaq', color: 'orange' },
        { name: 'Wakaf', color: 'cyan' },
        { name: 'Program Pilar', color: 'violet' }
    ];

    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
    };

    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const programs = [
        {
            gambar: 'https://picsum.photos/500/300?random=1',
            judul: 'Qurban Berkah Nusantara',
            terkumpul: 'Rp 80.000.000',
            target: 'Rp 150.000.000',
            deskripsi: 'Salurkan qurban terbaik Anda untuk masyarakat pelosok Indonesia.',
            kategori: 'Qurban',
            slug: 'qurban-berkah-nusantara',
            sisa_hari: 20,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=2',
            judul: 'Zakat Produktif UMKM',
            terkumpul: 'Rp 120.000.000',
            target: 'Rp 200.000.000',
            deskripsi: 'Bantu pemberdayaan ekonomi mustahik melalui zakat produktif.',
            kategori: 'Zakat',
            slug: 'zakat-produktif-umkm',
            sisa_hari: 25,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=3',
            judul: 'Infaq Pembangunan Masjid',
            terkumpul: 'Rp 90.000.000',
            target: 'Rp 200.000.000',
            deskripsi: 'Dukung pembangunan dan renovasi masjid di daerah minoritas.',
            kategori: 'Infaq',
            slug: 'infaq-pembangunan-masjid',
            sisa_hari: 30,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=4',
            judul: 'Infaq Anak Yatim',
            terkumpul: 'Rp 70.000.000',
            target: 'Rp 100.000.000',
            deskripsi: 'Santunan rutin untuk anak yatim dan dhuafa.',
            kategori: 'Infaq',
            slug: 'infaq-anak-yatim',
            sisa_hari: 18,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=5',
            judul: 'Wakaf Sumur Air Bersih',
            terkumpul: 'Rp 65.000.000',
            target: 'Rp 120.000.000',
            deskripsi: 'Bangun sumur air bersih untuk desa kekeringan.',
            kategori: 'Wakaf',
            slug: 'wakaf-sumur-air',
            sisa_hari: 35,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=6',
            judul: 'Wakaf Sekolah Islam',
            terkumpul: 'Rp 100.000.000',
            target: 'Rp 250.000.000',
            deskripsi: 'Wakaf pembangunan sekolah Islam di pedalaman.',
            kategori: 'Wakaf',
            slug: 'wakaf-sekolah-islam',
            sisa_hari: 40,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=7',
            judul: 'Pilar Pendidikan',
            terkumpul: 'Rp 110.000.000',
            target: 'Rp 200.000.000',
            deskripsi: 'Beasiswa dan bantuan alat sekolah untuk anak prasejahtera.',
            kategori: 'Program Pilar',
            slug: 'pilar-pendidikan',
            sisa_hari: 28,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=8',
            judul: 'Pilar Kesehatan',
            terkumpul: 'Rp 95.000.000',
            target: 'Rp 180.000.000',
            deskripsi: 'Layanan kesehatan gratis untuk masyarakat pelosok.',
            kategori: 'Program Pilar',
            slug: 'pilar-kesehatan',
            sisa_hari: 22,
        },
        {
            gambar: 'https://picsum.photos/500/300?random=9',
            judul: 'Pilar Ekonomi',
            terkumpul: 'Rp 85.000.000',
            target: 'Rp 150.000.000',
            deskripsi: 'Pelatihan dan modal usaha mikro untuk keluarga miskin.',
            kategori: 'Program Pilar',
            slug: 'pilar-ekonomi',
            sisa_hari: 24,
        },
    ];

    // Filter programs based on selected category
    const filteredPrograms = selectedCategory === 'Semua' ? programs : programs.filter(p => p.kategori === selectedCategory);
    const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
    const paginatedPrograms = filteredPrograms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-full mx-auto">
            {/* Header */}
            <HeroSection
                title="Program"
                subtitle="Program donasi pilihan untuk kebaikan bersama"
                imageSrc="/images/logo-zis.png"
            />

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4  my-8">
                {categories.map(cat => (
                    <button
                        key={cat.name}
                        onClick={() => {
                            setSelectedCategory(cat.name);
                            setCurrentPage(1);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`min-w-[150px] px-6 py-3 rounded text-base font-medium transition text-center ${selectedCategory === cat.name ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-white text-gray-600 border border-orange-100 hover:bg-orange-50'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Message if no programs match the selected category */}
            {filteredPrograms.length === 0 && <div className="text-center py-12 text-gray-500">Tidak ada program pada kategori ini.</div>}

            {/* Programs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-6 md:mx-12 lg:mx-24 gap-8">
                {paginatedPrograms.map(program => (
                    <motion.div
                        key={program.slug}
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300"
                    >
                        <div className="relative">
                            <Image src={program.gambar} alt={program.judul} width={1000} height={224} className=" object-cover" />
                            <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                                {program.kategori}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{program.judul}</h3>
                            <p className="text-gray-600 mb-4">{program.deskripsi}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(parseInt(program.terkumpul.replace(/[^0-9]/g, '')) / parseInt(program.target.replace(/[^0-9]/g, '')) * 100)}%` }}></div>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-gray-600">Terkumpul: {program.terkumpul}</span>
                                <span className="font-medium">{Math.round((parseInt(program.terkumpul.replace(/[^0-9]/g, '')) / parseInt(program.target.replace(/[^0-9]/g, '')) * 100))}%</span>
                            </div>
                            <a href={`/donasi/${program.slug}`} className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                                Donasi Sekarang
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            {filteredPrograms.length > 0 && totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 150, behavior: 'smooth' }); // Scroll to the top
                                }}
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
            {filteredPrograms.length > 0 && (
                <div className="text-center mt-5 text-sm mb-12 text-gray-500">
                    <span>Halaman {currentPage} dari {totalPages}</span>
                </div>
            )}
        </div>
    );
};

export default Program;