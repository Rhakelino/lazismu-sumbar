import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; // Impor koneksi Firestore
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface NewsItem {
    id: string;
    title: string;
    description: string;
    image: string;
    created_at: string;
}

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const BeritaGrid: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    const fetchNews = async () => {
        const querySnapshot = await getDocs(collection(db, 'news'));
        const newsData: NewsItem[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<NewsItem, 'id'>, // Omit untuk mengambil data tanpa id
        }));
        setNews(newsData);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={fadeUp}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white p-4 shadow-md rounded-lg"
                    >
                        <img
                            src={item.image}
                            alt={`News Image ${item.id}`}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">{formatDate(item.created_at)}</p>
                            <p className="text-gray-700 mt-2">
                                {item.description.length > 150
                                    ? `${item.description.slice(0, 147)}...`
                                    : item.description}
                            </p>
                            <a href="#" className="text-blue-500 mt-4 block">
                                Baca Selengkapnya
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BeritaGrid;