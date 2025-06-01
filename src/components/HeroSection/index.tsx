import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  children?: React.ReactNode; // Menambahkan props children
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, imageSrc, children }) => {
  return (
    <div className="relative bg-orange-500 overflow-hidden">
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
            <Image src={imageSrc} width={100} height={100} alt="Logo ZIS" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-yellow-400">{title}</span>
          </h1>
          <p className="text-base text-blue-100 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Menampilkan children */}
        {children}
      </motion.div>
    </div>
  );
};

export default HeroSection;
