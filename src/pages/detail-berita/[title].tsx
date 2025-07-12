import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import supabase from '@/lib/db';
import { INews } from '@/types/news';
import Image from 'next/image';
import {
    ArrowLeft,
    Clock,
    User,
    Share2,
    Facebook,
    Twitter,
    Mail,
    Link as LinkIcon
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const DetailBerita: React.FC = () => {
    const router = useRouter();
    const { title } = router.query;

    const [news, setNews] = useState<INews | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!title) return;
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .eq('title', title)
                    .single();

                if (error) throw error;
                setNews(data);
            } catch (err: any) {
                setError(err.message || 'Terjadi kesalahan saat mengambil data berita.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [title]);

    // Fungsi untuk share
    const shareContent = (platform: string) => {
        const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(news?.title || '')}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(news?.title + ' - ' + shareUrl)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(news?.title || '')}&body=${encodeURIComponent(shareUrl)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl).then(() => {
                    toast.success('Link berhasil disalin!', {
                        style: {
                            background: '#333',
                            color: '#fff',
                        }
                    });
                });
                break;
        }
    };

    // Loading Spinner dengan Animasi
    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-screen"
            >
                <motion.div
                    animate={{
                        rotate: 360,
                        transition: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                    className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-gray-200 rounded-full"
                />
            </motion.div>
        );
    }

    // Error State
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
            >
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Terjadi Kesalahan</h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => router.reload()}
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Muat Ulang
                    </button>
                </div>
            </motion.div>
        );
    }

    // Tidak Ada Berita
    if (!news) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-screen flex items-center justify-center bg-gray-50"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Maaf, berita yang Anda cari tidak tersedia.</p>
                    <button
                        onClick={() => router.push('/berita')}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Kembali ke Berita
                    </button>
                </div>
            </motion.div>
        );
    }

    // Format tanggal dengan opsi lengkap
    const formattedDate = new Date(news.created_at).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            {/* Tambahkan Toaster untuk notifikasi */}
            <Toaster position="bottom-center" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gray-50 py-12 px-4 lg:px-0"
            >
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Navigasi */}
                    <div className="absolute z-10 m-4">
                        <button
                            onClick={() => router.back()}
                            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition"
                        >
                            <ArrowLeft className="text-gray-700" />
                        </button>
                    </div>

                    {/* Gambar Utama */}
                    {news.image && (
                        <div className="relative w-full h-[400px] md:h-[500px]">
                            <Image
                                src={news.image}
                                alt={news.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 hover:scale-105"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                    )}

                    {/* Konten Berita */}
                    <div className="p-6 md:p-12 relative z-10 -mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-6 -mt-24 relative"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {news.title}
                            </h1>

                            {/* Metadata Berita */}
                            <div className="flex items-center space-x-4 text-gray-600 mb-6">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>ADMIN</span>
                                </div>
                            </div>

                            {/* Artikel */}
                            <article
                                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: news.description }}
                            />
                        </motion.div>
                    </div>
                     <div className="flex flex-col pb-4 items-center">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                            <Share2 className="mr-2" /> Bagikan Berita
                        </h3>
                        <div className="flex space-x-4">
                            {/* Tombol Share Media Sosial */}
                            <button
                                onClick={() => shareContent('facebook')}
                                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                                aria-label="Share on Facebook"
                            >
                                <Facebook className="w-8 h-8" />
                            </button>

                            <button
                                onClick={() => shareContent('twitter')}
                                className="p-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"
                                aria-label="Share on Twitter"
                            >
                                <Twitter className="w-8 h-8" />
                            </button>

                            <button
                                onClick={() => shareContent('whatsapp')}
                                className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition"
                                aria-label="Share on WhatsApp"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    alt="WhatsApp"
                                    width={24}
                                    height={24}
                                    className="w-8 h-8"
                                />
                            </button>
                            <button
                                onClick={() => shareContent('copy')}
                                className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
                                aria-label="Copy Link"
                            >
                                <LinkIcon className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default DetailBerita;