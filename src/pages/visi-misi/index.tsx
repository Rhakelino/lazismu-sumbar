import React from 'react';
import { Eye, ClipboardList, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

const VisiMisi = () => {
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
                      Visi Misi
                    </span>
                  </h1>
                  <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Program donasi pilihan untuk kebaikan bersama
                  </p>
                </div>
              </div>
            </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Visi & Misi Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* VISI */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-sm p-6 border border-orange-100 flex flex-col h-full">
            <h2 className="font-bold uppercase text-lg text-orange-600 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              VISI
            </h2>
            <div className="h-0.5 w-16 bg-orange-500 mb-4"></div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi Lembaga Amil Zakat Terpercaya di Sumatera Barat setingkat nasional hingga internasional
            </p>
          </div>

          {/* MISI */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm p-6 border border-blue-100 flex flex-col h-full">
            <h2 className="font-bold uppercase text-lg text-blue-600 mb-4 flex items-center">
              <ClipboardList className="h-6 w-6 mr-2" />
              MISI
            </h2>
            <div className="h-0.5 w-16 bg-blue-500 mb-4"></div>
            <ol className="list-decimal ml-5 text-gray-700 space-y-2 text-base leading-relaxed">
              <li>Meningkatkan kualitas pengelolaan ZIS yang amanah, profesional, dan transparan</li>
              <li>Meningkatkan pendayagunaan ZIS yang kreatif, inovatif, dan produktif</li>
              <li>Meningkatkan pelayanan donatur yang berorientasi ke depan</li>
            </ol>
          </div>
        </div>

        {/* PRINSIP */}
        <div className="mb-12 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="font-bold uppercase text-lg text-gray-800 mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-green-600" />
            PRINSIP
          </h2>
          <div className="h-0.5 w-16 bg-green-500 mb-4"></div>
          <p className="text-gray-700 mb-4">Pengelolaan ZISKA berprinsip:</p>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            {[
              {
                title: "Syariat Islam",
                desc: "artinya dalam menjalankan tugas dan fungsinya, harus berpedoman sesuai syariat Islam, mulai dari tata cara perekrutan pegawai hingga tata cara pendistribusian ZISKA"
              },
              {
                title: "Amanah dan integritas",
                desc: "artinya harus menjadi lembaga yang dapat dipercaya, dengan memegang teguh kode etik dan prinsip-prinsip moral"
              },
              {
                title: "Kemanfaatan",
                desc: "artinya memberikan manfaat yang besar bagi mustahik"
              },
              {
                title: "Keadilan",
                desc: "artinya mampu bertindak adil, yakni sikap memperlakukan secara setara di dalam memenuhi hak-hak yang timbul berdasarkan perjanjian serta peraturan perundangan yang berlaku"
              },
              {
                title: "Kepastian hukum",
                desc: "artinya muzaki dan mustahik harus memiliki jaminan dan kepastian hukum dalam proses pengelolaan dana ZISKA"
              },
              {
                title: "Terintegrasi",
                desc: "artinya harus dilakukan secara hirarki sehingga mampu meningkatkan kinerja pengumpulan, pendistribusian dan pendayagunaan dana ZISKA"
              },
              {
                title: "Akuntabilitas",
                desc: "artinya pengelolaan dana ZISKA harus bisa dipertanggungjawabkan kepada masyarakat dan mudah diakses oleh masyarakat dan pihak lain yang berkepentingan"
              },
              {
                title: "Profesional",
                desc: "artinya perilaku yang selalu mengedepankan sikap dan tindakan yang dilandasi oleh tingkat kompetensi, kredibilitas dan komitmen yang tinggi"
              },
              {
                title: "Transparansi",
                desc: "artinya tindakan menyampaikan informasi secara transparan, konsisten, dan kredibel untuk memberikan layanan yang lebih baik dan lebih cepat kepada pemangku kepentingan"
              },
              {
                title: "Sinergi",
                desc: "artinya sikap membangun dan memastikan hubungan kerja sama internal yang produktif serta kemitraan yang harmonis dengan para pemangku kepentingan dana ZISKA untuk menghasilkan karya yang bermanfaat dan berkualitas"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mt-1">
                  {index + 1}
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    <span className="font-bold">{item.title}</span>, {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TUJUAN */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="font-bold uppercase text-lg text-gray-800 mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-purple-600" />
            TUJUAN
          </h2>
          <div className="h-0.5 w-16 bg-purple-500 mb-4"></div>
          <p className="text-gray-700 mb-4">Pengelolaan ZISKA bertujuan:</p>
          <div className="space-y-4">
            {[
              "Meningkatkan efektivitas dan efisiensi pelayanan dalam pengelolaan dana ZISKA dalam rangka mencapai maksud dan tujuan Persyarikatan",
              "Meningkatkan manfaat dana ZISKA untuk mewujudkan kesejahteraan masyarakat dan penanggulangan kemiskinan dalam rangka mencapai maksud dan tujuan Persyarikatan",
              "Meningkatkan kemampuan ekonomi umat melalui pemberdayaan usaha-usaha produktif"
            ].map((tujuan, index) => (
              <div key={index} className="flex items-start bg-purple-50 p-4 rounded-lg">
                <div className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <p className="text-gray-700">{tujuan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;