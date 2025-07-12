'use client';
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const LatarBelakang: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Latar Belakang"
        subtitle="Program donasi pilihan untuk kebaikan bersama"
        imageSrc="/images/logo-zis.png"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Intro */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-2xl text-orange-400">LAZISMU</span> adalah lembaga zakat tingkat nasional yang berkhidmat dalam pemberdayaan masyarakat melalui pendayagunaan secara produktif dana zakat, infaq, wakaf, dan dana kedermawanan lainnya baik dari perseorangan, lembaga, perusahaan, dan instansi lainnya.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Didirikan oleh PP. Muhammadiyah pada tahun 2002, selanjutnya dikukuhkan oleh Menteri Agama Republik Indonesia sebagai Lembaga Amil Zakat Nasional melalui SK No. 457/21 November 2002. Dengan berlakunya Undang-undang Zakat nomor 23 tahun 2011, Peraturan Pemerintah nomor 14 tahun 2014, dan Keputusan Menteri Agama Republik Indonesia nomor 333 tahun 2015, LAZISMU telah dikukuhkan kembali melalui SK Menteri Agama Republik Indonesia nomor 730 tahun 2016, dan diperpanjang lagi dengan nomor 90 Tahun 2022.
              </p>
            </motion.div>

            {/* Latar Belakang */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Latar Belakang
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Latar belakang berdirinya LAZISMU terdiri atas dua faktor:
              </p>
              <div className="space-y-6">
                {[
                  {
                    label: 'Pertama',
                    desc: 'fakta Indonesia yang berselimut dengan kemiskinan yang masih meluas, kebodohan, dan indeks pembangunan manusia yang sangat rendah. Semua ini diakibatkan oleh tatanan keadilan sosial yang lemah.',
                  },
                  {
                    label: 'Kedua',
                    desc: 'zakat diyakini mampu bersumbangsih dalam mendorong keadilan sosial, pembangunan manusia, dan mengentaskan kemiskinan...',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-bold text-gray-800">{item.label}</span>, {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tujuan dan Komitmen */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Tujuan dan Komitmen
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Berdirinya LAZISMU dimaksudkan sebagai institusi pengelola zakat dengan manajemen modern yang dapat menghantarkan zakat menjadi bagian dari penyelesai masalah sosial yang terus berkembang. Dengan budaya kerja amanah dan transparan, LAZISMU berusaha mengembangkan diri menjadi Lembaga Zakat terpercaya, yang semakin menguatkan kepercayaan publik seiring waktu.
                </p>

                <p>
                  Dengan spirit kreativitas dan inovasi, LAZISMU senantiasa memproduksi program-program pendayagunaan yang mampu menjawab tantangan perubahan dan masalah sosial masyarakat yang berkembang. Saat ini, LAZISMU telah tersebar di hampir seluruh Indonesia, sehingga program-program pendayagunaan dapat menjangkau wilayah secara cepat, fokus, dan tepat sasaran.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            {/* Pilar Utama */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Tiga Pilar Utama
              </h3>
              {[
                {
                  title: 'KEMISKINAN',
                  desc: 'Indonesia yang berselimutkan kemiskinan yang masih meluas...',
                },
                {
                  title: 'SUMBANGSIH',
                  desc: 'Zakat diyakini dapat mendorong keadilan sosial dan pembangunan...',
                },
                {
                  title: 'PROBLEM SOLVER',
                  desc: 'LAZISMU dimaksudkan sebagai institusi pengelola zakat...',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Visi Misi */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm p-6 border border-yellow-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-yellow-200">
                Visi & Misi
              </h3>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    Visi
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Menjadi Lembaga Amil Zakat di Sumatera Barat Setingkat Nasional hingga Internasional.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    Misi
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Optimalisasi Kualitas Pengelolaan ZIS.',
                      'Optimalisasi Pendayagunaan ZIS yang Kreatif, Inovatif, dan Produktif.',
                      'Optimalisasi Pelayanan Muzaki dan Donatur.',
                    ].map((misi, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 text-sm leading-relaxed">{misi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatarBelakang;
