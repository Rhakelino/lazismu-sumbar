import React from 'react'
import { motion } from 'framer-motion';
const news = [
    {
        title: 'Peduli Lingkungan, Lazismu Ajak Masyarakat Bersihkan Sungai',
        description: 'Lazismu menggelar aksi bersih-bersih sungai untuk mengurangi pencemaran lingkungan di kawasan Surabaya.',
        image: 'https://picsum.photos/500/300?random=4',
        created_at: '2025-06-01 09:00:00',
    },
    {
        title: 'Aksi Solidaritas: Donasi untuk Korban Bencana Alam di Aceh',
        description: 'Lazismu menggalang dana untuk membantu korban bencana alam di Aceh. Donasi sudah disalurkan kepada ribuan warga yang terdampak.',
        image: 'https://picsum.photos/500/300?random=5',
        created_at: '2025-06-02 14:30:00',
    },
    {
        title: 'Program Pendidikan Gratis untuk Anak Yatim di Surabaya',
        description: 'Lazismu Surabaya menyediakan beasiswa bagi anak yatim untuk melanjutkan pendidikan hingga perguruan tinggi.',
        image: 'https://picsum.photos/500/300?random=6',
        created_at: '2025-06-03 11:15:00',
    },
    {
        title: 'Bantuan Kemanusiaan untuk Warga Palestina Terus Mengalir',
        description: 'Program bantuan kemanusiaan terus digalakkan oleh Lazismu untuk membantu saudara-saudara kita di Palestina.',
        image: 'https://picsum.photos/500/300?random=7',
        created_at: '2025-05-28 16:45:00',
    },
    {
        title: 'Qurban 2025: Membawa Kebahagiaan kepada Warga Miskin',
        description: 'Lazismu menyelenggarakan program qurban untuk berbagi kebahagiaan dengan masyarakat miskin di seluruh Indonesia.',
        image: 'https://picsum.photos/500/300?random=8',
        created_at: '2025-06-04 12:00:00',
    },
    {
        title: 'Pelatihan Kewirausahaan untuk Anak Muda di Surabaya',
        description: 'Lazismu mengadakan pelatihan kewirausahaan untuk anak muda agar bisa memulai usaha dan menciptakan lapangan pekerjaan.',
        image: 'https://picsum.photos/500/300?random=9',
        created_at: '2025-05-30 10:20:00',
    }
];

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const BeritaGrid = () => {
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
                {news.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white p-4 shadow-md rounded-lg"
                    >
                        <img
                            src={item.image}
                            alt={`News Image ${index + 1}`}
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
    )
}

export default BeritaGrid
