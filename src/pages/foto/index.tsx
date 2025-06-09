import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import supabase from '@/lib/db';

interface Photo {
    id: string;
    image: string;
    created_at: string;
}

const Foto = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState<string>('');

    // Fetch photos from Supabase
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('album')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                setPhotos(data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching photos:', err);
                setError('Gagal memuat foto');
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    // Pagination and photo display logic
    const totalPages = Math.ceil(photos.length / itemsPerPage);
    const paginatedPhotos = photos.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
    };

    const openModal = (src: string) => {
        setCurrentPhoto(src);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentPhoto('');
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto">
            {/* Header */}
            <HeroSection
                title="Foto"
                subtitle="Dokumentasi Kegiatan"
                imageSrc="/images/logo-zis.png"
            />

            {/* Foto List */}
            {photos.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    Tidak ada foto yang tersedia
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 mx-6 md:mx-12 lg:mx-24 gap-8 pt-20">
                        {paginatedPhotos.map(photo => (
                            <motion.div
                                key={photo.id}
                                variants={fadeUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300"
                                onClick={() => openModal(photo.image)}
                            >
                                <div className="relative">
                                    <Image
                                        src={photo.image}
                                        alt={`Foto ${photo.id}`}
                                        width={1000}
                                        height={224}
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10 space-x-2">
                            {/* Nomor Halaman */}
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrentPage(i + 1);
                                        window.scrollTo({ top: 150, behavior: 'smooth' });
                                    }}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === i + 1 
                                            ? 'bg-orange-500 text-white' 
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                        </div>
                    )}

                    {/* Informasi Halaman */}
                    {totalPages > 1 && (
                        <div className="text-center mt-4 text-gray-600">
                            Halaman {currentPage} dari {totalPages}
                        </div>
                    )}
                </>
            )}

            {/* Modal untuk foto */}
            {isModalOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={handleOverlayClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="relative bg-white p-4 rounded-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={currentPhoto}
                            alt="Modal Foto"
                            layout="intrinsic"
                            width={900}
                            height={600}
                            className="object-contain max-h-[80vh] max-w-full"
                        />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Foto;