import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { INews } from '@/types/news';
import supabase from '@/lib/db';


const BeritaGrid: React.FC = () => {

  const [news, setNews] = useState<INews[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const { data, error } = await supabase.from('news').select('*');

            if (error) console.log('error:' + error);
            else setNews(data);
        }
        fetchNews()
    }, [supabase])


  return (
    <div className="mx-6 md:mx-12 lg:mx-24 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <motion.div
            key={item.id}
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
            <p className="text-sm text-gray-500">{(item.created_at)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BeritaGrid;
