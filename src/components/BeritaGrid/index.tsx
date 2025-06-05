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

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
        if (error) throw error;
        setNews(data);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data berita.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [supabase]);

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

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Berita tidak ditemukan.</p>
      </div>
    );
  }


  return (
    <div className="mx-6 md:mx-12 lg:mx-24 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <Link href={`/detail-berita/${item.id}`} key={item.id}>
            <motion.div
              className="bg-white rounded-lg shadow-md p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={item.image}
                  alt={`Gambar Berita ${item.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>

            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BeritaGrid;
