import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import supabase from '@/lib/db';
import { INews } from '@/types/news';
import Image from 'next/image';

const DetailBerita: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [news, setNews] = useState<INews | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .eq('id', id)
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
    }, [id]);

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
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{news.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                <span>{new Date(news.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</span>
            </div>
            {news.image && (
                <Image
                    src={news.image}
                    alt={news.title}
                    className="object-cover rounded-lg mb-6"
                    height={720}
                    width={1000}
                    loading="lazy"
                />
            )}
            <article
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: news.description }}
            />
            <button
                onClick={() => router.back()}
                className="mt-8 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Kembali
            </button>
        </div>
    );
};

export default DetailBerita;
