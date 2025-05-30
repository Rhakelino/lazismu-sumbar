import React from 'react';
import Image from 'next/image'; // Import Image from Next.js for optimized images

const LatarBelakang: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            {/* Logo placeholder - replace with actual logo */}
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Image src="/images/logo-zis.png" width={100} height={100} alt="" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-yellow-400">
                Latar Belakang
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Program donasi pilihan untuk kebaikan bersama
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-2xl text-orange-400">LAZISMU</span> adalah lembaga zakat tingkat nasional yang berkhidmat dalam pemberdayaan masyarakat melalui pendayagunaan secara produktif dana zakat, infaq, wakaf, dan dana kedermawanan lainnya baik dari perseorangan, lembaga, perusahaan, dan instansi lainnya.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Didirikan oleh PP. Muhammadiyah pada tahun 2002, selanjutnya dikukuhkan oleh Menteri Agama Republik Indonesia sebagai Lembaga Amil Zakat Nasional melalui SK No. 457/21 November 2002. Dengan berlakunya Undang-undang Zakat nomor 23 tahun 2011, Peraturan Pemerintah nomor 14 tahun 2014, dan Keputusan Menteri Agama Republik Indonesia nomor 333 tahun 2015, LAZISMU telah dikukuhkan kembali melalui SK Menteri Agama Republik Indonesia nomor 730 tahun 2016, dan diperpanjang lagi dengan nomor 90 Tahun 2022.
              </p>
            </div>

            {/* Background Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Latar Belakang
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Latar belakang berdirinya LAZISMU terdiri atas dua faktor:
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-800">Pertama</span>, fakta Indonesia yang berselimut dengan kemiskinan yang masih meluas, kebodohan, dan indeks pembangunan manusia yang sangat rendah. Semua ini diakibatkan oleh tatanan keadilan sosial yang lemah.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-800">Kedua</span>, zakat diyakini mampu bersumbangsih dalam mendorong keadilan sosial, pembangunan manusia, dan mengentaskan kemiskinan. Sebagai negara berpenduduk Muslim terbesar di dunia, Indonesia memiliki potensi zakat, infaq, dan wakaf yang terbilang cukup tinggi. Namun, potensi ini belum dapat dikelola dan didayagunakan secara maksimal sehingga tidak memberikan dampak yang signifikan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Three Main Pillars */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Tiga Pilar Utama
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">KEMISKINAN</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Indonesia yang berselimutkan kemiskinan yang masih meluas, kebodohan, dan indeks pembangunan manusia yang rendah.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">SUMBANGSIH</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Zakat diyakini dapat mendorong keadilan sosial dan pembangunan manusia yang berkelanjutan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">PROBLEM SOLVER</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      LAZISMU dimaksudkan sebagai institusi pengelola zakat yang dapat menjadi solusi bagi masalah sosial.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm p-6 border border-yellow-200">
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
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Optimalisasi Kualitas Pengelolaan ZIS.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Optimalisasi Pendayagunaan ZIS yang Kreatif, Inovatif, dan Produktif.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Optimalisasi Pelayanan Muzaki dan Donatur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatarBelakang;