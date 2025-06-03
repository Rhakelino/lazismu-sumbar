import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  image: string;
  description: string;
  created_at: any;
}

const BeritaGrid: React.FC = () => {
  const [beritaList, setBeritaList] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const beritaQuery = query(collection(db, 'news'), orderBy('created_at', 'desc'));
        const snapshot = await getDocs(beritaQuery);
        const data: NewsItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<NewsItem, 'id'>,
        }));
        setBeritaList(data);
      } catch (error) {
        console.error('Gagal mengambil data berita:', error);
      }
    };

    fetchBerita();
  }, []);

  const totalPages = Math.ceil(beritaList.length / itemsPerPage);
  const currentBerita = beritaList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatTanggal = (created_at: any): string => {
    if (!created_at) return '-';
    try {
      const date = created_at.toDate ? created_at.toDate() : new Date(created_at);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '-';
    }
  };

  return (
    <div className="mx-6 md:mx-12 lg:mx-24 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBerita.map((berita) => (
          <motion.div
            key={berita.id}
            className="bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="relative w-full h-48 mb-3">
              <Image
                src={berita.image}
                alt={`Gambar Berita ${berita.title}`}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="font-semibold text-lg mb-1">{berita.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{berita.description}</p>
            <p className="text-sm text-gray-500">{formatTanggal(berita.created_at)}</p>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <>
          <div className="flex justify-center mt-10">
            <nav className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition ${
                    currentPage === index + 1
                      ? 'bg-orange-500 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
          <div className="text-center mt-5 text-sm mb-12 text-gray-500">
            Halaman {currentPage} dari {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default BeritaGrid;
