import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { INews } from '@/types/news';
import supabase from '@/lib/db';
import Link from 'next/link';

const BeritaGrid: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Tambahkan state untuk pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 6; // Jumlah berita per halaman


  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Hitung range untuk pagination
        const from = (currentPage - 1) * itemsPerPage;
        const to = from + itemsPerPage - 1;

        // Fetch data dengan pagination
        const { data, error, count } = await supabase
          .from('news')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) throw error;

        // Set berita dan total halaman
        setNews(data || []);
        setTotalPages(Math.ceil((count || 0) / itemsPerPage));
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data berita.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]); // Tambahkan currentPage sebagai dependency

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-orange-500 h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Berita tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="mx-6 md:mx-12 lg:mx-24 py-8">
      {/* Grid Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link href={`/detail-berita/${item.id}`} key={item.id}>
            <motion.div
              className="bg-white rounded-lg shadow-md flex flex-col h-full"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-48 mb-3 overflow-hidden">
                <Image
                  src={item.image}
                  alt={`Gambar Berita ${item.title}`}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex-1 flex flex-col px-4 pb-4">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700 mb-2 flex-1">{item.description.length > 50
                  ? item.description.slice(0, 100) + '...'
                  : item.description}</p>
                <Link href={`/detail-berita/${item.id}`} className='text-sm text-orange-500'>Lihat selengkapnya</Link>
                <p className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </motion.div>
          </Link>
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
              className={`px-4 py-2 rounded ${currentPage === i + 1
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
    </div>
  );
};

export default BeritaGrid;