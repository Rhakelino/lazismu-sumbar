import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Data Foto
const categories = [
  { name: 'Semua', color: 'orange' },
  { name: 'Nature', color: 'green' },
  { name: 'City', color: 'blue' },
  { name: 'Architecture', color: 'purple' },
];

const photos = [
  { id: 1, src: 'https://picsum.photos/600/400?random=1', alt: 'Foto 1', category: 'Nature' },
  { id: 2, src: 'https://picsum.photos/600/400?random=2', alt: 'Foto 2', category: 'City' },
  { id: 3, src: 'https://picsum.photos/600/400?random=3', alt: 'Foto 3', category: 'Nature' },
  { id: 4, src: 'https://picsum.photos/600/400?random=4', alt: 'Foto 4', category: 'Architecture' },
  { id: 5, src: 'https://picsum.photos/600/400?random=5', alt: 'Foto 5', category: 'Nature' },
  { id: 6, src: 'https://picsum.photos/600/400?random=6', alt: 'Foto 6', category: 'City' },
  { id: 7, src: 'https://picsum.photos/600/400?random=7', alt: 'Foto 7', category: 'Architecture' },
  { id: 8, src: 'https://picsum.photos/600/400?random=8', alt: 'Foto 8', category: 'City' },
  { id: 9, src: 'https://picsum.photos/600/400?random=9', alt: 'Foto 9', category: 'Nature' },
  { id: 10, src: 'https://picsum.photos/600/400?random=10', alt: 'Foto 10', category: 'City' },
];

const Foto = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>('');

  // Filter photos based on selected category
  const filteredPhotos = selectedCategory === 'Semua' ? photos : photos.filter(p => p.category === selectedCategory);
  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
  const paginatedPhotos = filteredPhotos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
               <Image src="/images/logo-zis.png" width={100} height={100} alt="Logo ZIS" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-yellow-400">Galeri Foto</span>
            </h1>
            <p className="text-base text-blue-100 max-w-2xl mx-auto">
              Koleksi foto kegiatan sosial dan kemanusiaan.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setCurrentPage(1);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className={`min-w-[150px] px-6 py-3 rounded text-base font-medium transition text-center ${selectedCategory === cat.name ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-white text-gray-600 border border-orange-100 hover:bg-orange-50'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Foto List */}
      <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 mx-6 md:mx-12 lg:mx-24 gap-8">
        {paginatedPhotos.map(photo => (
          <motion.div
            key={photo.id}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300"
            onClick={() => openModal(photo.src)}
          >
            <div className="relative">
              <img src={photo.src} alt={photo.alt} className="w-full h-56 object-cover" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredPhotos.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
      {filteredPhotos.length > 0 && (
        <div className="text-center mt-5 text-sm mb-12 text-gray-500">
          <span>Halaman {currentPage} dari {totalPages}</span>
        </div>
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
            <img
              src={currentPhoto}
              alt="Modal Foto"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Foto;
