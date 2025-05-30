import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home: React.FC = () => {
  // Sample data for the info boxes and programs
  const infoBoxes = [
    { title: '25', description: 'Program' },
    { title: 'Rp 3.515.238.071,20', description: 'Total Donasi' },
    { title: '4828', description: 'Donatur' },
  ];

  const programs = [
    {
      category: 'Pendidikan',
      title: 'Beasiswa Pendidikan',
      description: 'Memberikan akses pendidikan berkualitas kepada anak-anak yang kurang mampu melalui program beasiswa.',
      imageUrl: 'https://picsum.photos/500/300?random=1',
      progress: 75,
      totalRaised: 'Rp 150.000.000',
    },
    {
      category: 'Kesehatan',
      title: 'Layanan Kesehatan Gratis',
      description: 'Menyediakan layanan kesehatan gratis untuk masyarakat prasejahtera di daerah terpencil.',
      imageUrl: 'https://picsum.photos/500/300?random=2',
      progress: 60,
      totalRaised: 'Rp 120.000.000',
    },
    {
      category: 'Ekonomi',
      title: 'Pemberdayaan UMKM',
      description: 'Mendukung pengembangan usaha mikro kecil menengah untuk meningkatkan kemandirian ekonomi.',
      imageUrl: 'https://picsum.photos/500/300?random=3',
      progress: 45,
      totalRaised: 'Rp 90.000.000',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/slider-1.jpg" // Ganti dengan URL gambar latar belakang yang sebenarnya
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </section>

      {/* Info Box */}
      <div data-aos="fade-up" className="relative mt-[-40px] z-10 bg-orange-400 shadow-lg rounded-2xl mx-4 sm:mx-0 p-6 flex flex-col sm:flex-row justify-around text-center">
        {infoBoxes.map((infoBox, index) => (
          <div key={index} className="flex-1">
            <h3 className="text-3xl font-bold">{infoBox.title}</h3>
            <p className="text-gray-600">{infoBox.description}</p>
          </div>
        ))}
      </div>

      {/* Spacing for Info Box */}
      <div className="h-20"></div>
      
      {/* Program Section */}
      <section className="py-16">
  <div className="container mx-auto px-4 text-center" data-aos="fade-up">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Program Unggulan</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {programs.map((program, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300" data-aos="zoom-in">
          <div className="relative h-56"> {/* Mengatur tinggi kontainer */}
            <Image
              src={program.imageUrl}
              alt={program.title}
              layout="fill" // Mengatur gambar untuk mengisi kontainer
              objectFit="cover" // Memastikan gambar akan mencakup kontainer
              className="absolute inset-0"
            />
            <div className={`absolute top-4 left-4 text-xs font-bold text-white px-2 py-1 rounded ${program.category === 'Pendidikan' ? 'bg-orange-500' : program.category === 'Kesehatan' ? 'bg-red-500' : 'bg-green-500'}`}>
              {program.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 relative">
              <div
                className={`bg-${program.category === 'Pendidikan' ? 'orange' : program.category === 'Kesehatan' ? 'red' : 'green'}-500 h-2.5 rounded-full`}
                style={{ width: `${program.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">Terkumpul: {program.totalRaised}</span>
              <span className="font-medium">{program.progress}%</span>
            </div>
            <Link href="#" className={`inline-block bg-${program.category === 'Pendidikan' ? 'orange' : program.category === 'Kesehatan' ? 'red' : 'green'}-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-${program.category === 'Pendidikan' ? 'orange' : program.category === 'Kesehatan' ? 'red' : 'green'}-600 transition-colors`}>
              Donasi Sekarang
            </Link>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-10" data-aos="fade-up">
      <Link href="/program" className="inline-flex items-center px-5 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
        Lihat Semua Program
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-16" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Testimoni Donatur</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample Testimonial */}
            {[
              { name: 'Ahmad Syafiq', message: 'Saya sangat terbantu dengan adanya layanan dari LAZISMU!' },
              { name: 'Nur Hasanah', message: 'Program beasiswa pendidikan sangat membantu anak-anak di daerah kami.' },
              { name: 'Farid Rahman', message: 'Layanan ambulans gratis ini sangat berharga bagi kami.' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md relative" data-aos="fade-right">
                <div className="absolute -top-5 left-6 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.message}"</p>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-orange-500 text-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Mari Berbagi Kebaikan!</h2>
        <p className="max-w-2xl mx-auto mb-8">Bersama kita dapat membantu lebih banyak saudara-saudara kita yang membutuhkan.</p>
        <Link href="/program" className="inline-block bg-white text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">Donasi Sekarang</Link>
      </section>

      {/* Partner Section */}
      <section className="py-16 bg-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mitra Kami</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {['partner-1.png', 'partner-2.png', 'partner-3.png', 'partner-4.png', 'partner-5.png'].map((partner, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src={`/images/${partner}`} alt={`Partner ${index + 1}`} width={100} height={100} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;