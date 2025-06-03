// components/BeritaGrid.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; // Adjust according to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NewsItems {
    id: string;
    title: string;
    image: string;
    description: string;
    created_at: string;
}

const BeritaGrid: React.FC = () => {
    const [beritaList, setBeritaList] = useState<NewsItems[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchBerita = async () => {
            const querySnapshot = await getDocs(collection(db, 'news'));
            const beritaData: NewsItems[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Omit<NewsItems, 'id'>,
            }));

            beritaData.sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            setBeritaList(beritaData);
        };

        fetchBerita();
    }, []);

    const totalPages = Math.ceil(beritaList.length / itemsPerPage);
    const currentBerita = beritaList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="mx-6 md:mx-12 lg:mx-24 py-8">
            {/* Berita List Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-">
                {currentBerita.map(berita => (
                    <motion.div key={berita.id} className="bg-white rounded-lg shadow-md p-4">
                        <Image src={berita.image} alt={`News Image`} width={720} height={240} className="mt-2 rounded" />
                        <h3 className="font-semibold text-lg">{berita.title}</h3>
                        <p>{berita.description}</p>
                        <p className="text-sm text-gray-500">{new Date(berita.created_at).toLocaleDateString()}</p>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition ${currentPage === index + 1
                                        ? 'bg-orange-500 text-white'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
            {totalPages > 1 && (
                <div className="text-center mt-5 text-sm mb-12 text-gray-500">
                    <span>Halaman {currentPage} dari {totalPages}</span>
                </div>
            )}
        </div>
    );
};

export default BeritaGrid;