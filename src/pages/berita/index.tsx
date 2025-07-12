
import React from 'react';
import HeroSection from '@/components/HeroSection';
import BeritaGrid from '@/components/BeritaGrid';

const Berita = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <HeroSection
                title="Berita"
                subtitle="Program donasi pilihan untuk kebaikan bersama"
                imageSrc="/images/logo-zis.png"
            />
            <BeritaGrid />
        </div>
    );
};

export default Berita;
