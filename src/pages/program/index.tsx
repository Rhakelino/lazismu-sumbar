"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

// Type definition untuk program
type Program = {
  gambar: string;
  judul: string;
  terkumpul: string;
  target: string;
  deskripsi: string;
  kategori: string;
  slug: string;
  sisa_hari: number;
};

const Program: React.FC = () => {
  // Definisi kategori dengan warna dan ikon
  const categories = [
    {
      name: "Semua",
      color: "orange",
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5a1.5 1.5 0 001.5-1.5v-6.75a1.5 1.5 0 00-1.5-1.5H8.25m1.5 0a1.5 1.5 0 01-1.5-1.5v-1.5a3.375 3.375 0 00-3.375-3.375H5.25m13.5 4.5h1.875a1.5 1.5 0 011.5 1.5v1.5a3.375 3.375 0 01-3.375 3.375H5.25m13.5-4.5H18a1.5 1.5 0 00-1.5 1.5v1.5a3.375 3.375 0 003.375 3.375H21v-3.375c0-.621-.504-1.125-1.125-1.125H19.5zM3.375 14.25A1.5 1.5 0 005.25 15.75v1.5a3.375 3.375 0 003.375 3.375H9v-3.375a1.5 1.5 0 00-1.5-1.5H5.25zm9.75 0a1.5 1.5 0 011.5 1.5V21h-1.875a3.375 3.375 0 01-3.375-3.375v-1.5a1.5 1.5 0 011.5-1.5h1.875z",
    },
    {
      name: "Infaq",
      color: "red",
      icon: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3",
    },
    {
      name: "Zakat",
      color: "blue",
      icon: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3",
    },
    {
      name: "Pilar Pendidikan",
      color: "amber",
      icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.697 50.697 0 00-2.474 11.573 48.902 48.902 0 012.013 4.338c.444-1.102.89-2.223 1.3-3.368a60.732 60.732 0 01-1.102-4.773 48.325 48.325 0 004.98.398m13.09.62c.118.342.237.677.358 1.002.23.616.459 1.195.68 1.743a50.696 50.696 0 002.201-4.855c-.22-1.474-.487-2.87-.793-4.186a51.804 51.804 0 00-2.258 3.296zm-10.516 5.013c.254 1.756.675 3.368 1.238 4.836a53.564 53.564 0 004.862-2.02c-.297-1.106-.478-2.29-.478-3.507 0-1.217.181-2.4.478-3.507a53.774 53.774 0 00-4.862-2.02c-.563 1.468-.984 3.08-1.238 4.836zm12.332-4.836c-.563-1.468-.984-3.08-1.238-4.836a53.576 53.576 0 00-4.862 2.02c.297 1.106.478 2.29.478 3.507 0 1.217-.181 2.4-.478 3.507a53.774 53.774 0 004.862 2.02c.563-1.468.984-3.08 1.238-4.836z",
    },
    {
      name: "Pilar Kesehatan",
      color: "emerald",
      icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    },
    {
      name: "Pilar Ekonomi",
      color: "indigo",
      icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Pilar Kemanusiaan",
      color: "cyan",
      icon: "M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    },
    {
      name: "Pilar Sosial Dakwah",
      color: "violet",
      icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    },
    {
      name: "Pilar Lingkungan",
      color: "green",
      icon: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3",
    },
  ];

  // List program dengan kategori yang lebih rinci
  const programs: Program[] = [
    {
      gambar: "/images/qurban.jpg",
      judul: "Qurban Berkah Nusantara",
      terkumpul: "Rp 80.000.000",
      target: "Rp 150.000.000",
      deskripsi:
        "Program kompleks untuk mendistribusikan hewan qurban ke daerah-daerah terpencil di Indonesia. Kami berkomitmen untuk membawa berkah Idul Adha kepada masyarakat paling membutuhkan, dengan fokus pada wilayah sulit dijangkau. Setiap hewan qurban akan didistribusikan secara merata, memastikan ribuan keluarga miskin dapat merasakan kegembiraan dan nutrisi dari daging kurban, sekaligus memperkuat solidaritas sosial di antara sesama muslim.",
      kategori: "Pilar Sosial Dakwah",
      slug: "qurban-berkah-nusantara",
      sisa_hari: 20,
    },
    {
      gambar: "/images/palestina.jpg",
      judul: "Program Kemanusiaan Peduli Palestina",
      terkumpul: "Rp 120.000.000",
      target: "Rp 200.000.000",
      deskripsi:
        "Inisiatif komprehensif untuk memberikan bantuan kemanusiaan bagi warga Palestina yang menghadapi krisis berkepanjangan. Program ini mencakup penyediaan bantuan pangan darurat, layanan kesehatan medis, dukungan pendidikan untuk anak-anak pengungsi, dan rehabilitasi infrastruktur yang rusak akibat konflik. Kami berkomitmen untuk membawa harapan, pertolongan, dan pemulihan bagi mereka yang terdampak kekerasan dan ketidakadilan.",
      kategori: "Pilar Kemanusiaan",
      slug: "peduli-palestina",
      sisa_hari: 25,
    },
    {
      gambar: "/images/peduli-lansia.jpg",
      judul: "Peduli Lansia",
      terkumpul: "Rp 90.000.000",
      target: "Rp 200.000.000",
      deskripsi:
        "Program holistik untuk pemberdayaan dan perawatan lansia di wilayah minoritas dan kurang beruntung. Kami fokus pada renovasi dan pembangunan pusat pembinaan lansia, penyediaan layanan kesehatan berkualitas, pendampingan psikologis, dan program aktivitas sosial yang bermakna. Tujuan kami adalah meningkatkan kualitas hidup para lansia, memastikan mereka tetap dihormati, diperhatikan, dan dapat hidup dengan bermartabat.",
      kategori: "Pilar Sosial Dakwah",
      slug: "infaq-pembangunan-masjid",
      sisa_hari: 30,
    },
    {
      gambar: "/images/mualaf.jpg",
      judul: "Pemberdayaan Mualaf",
      terkumpul: "Rp 70.000.000",
      target: "Rp 150.000.000",
      deskripsi:
        "Sebuah program komprehensif untuk memberdayakan mualaf (para mualaf baru) melalui pendekatan holistik. Kami menyediakan dukungan spiritual, pendidikan agama, konseling psikologis, pelatihan keterampilan hidup, dan bantuan ekonomi. Tujuan utama adalah membantu mereka beradaptasi dengan kehidupan baru, memperkuat keyakinan, dan membangun kemandirian ekonomi serta sosial.",
      kategori: "Pilar Sosial Dakwah",
      slug: "pemberdayaan-mualaf",
      sisa_hari: 60,
    },
    {
      gambar: "/images/jumat-berkah.jpg",
      judul: "Jumat Berkah",
      terkumpul: "Rp 32.000.000",
      target: "Rp 100.000.000",
      deskripsi:
        "Inisiatif sosial yang berfokus pada pemberian bantuan berkala setiap hari Jumat kepada keluarga kurang mampu, yatim piatu, dan masyarakat yang membutuhkan. Program ini mencakup distribusi paket sembako, layanan kesehatan gratis, dan bantuan pendidikan. Setiap Jumat, kami berkomitmen untuk membawa keberkahan dan harapan baru bagi mereka yang tertindas.",
      kategori: "Pilar Sosial Dakwah",
      slug: "jumat-berkah",
      sisa_hari: 76,
    },
    {
      gambar: "/images/beasiswa-mentari.jpg",
      judul: "Beasiswa",
      terkumpul: "Rp 70.000.000",
      target: "Rp 100.000.000",
      deskripsi:
        "Program beasiswa komprehensif yang bertujuan memberikan kesempatan pendidikan berkualitas bagi anak-anak yatim dan dhuafa. Kami tidak hanya memberikan bantuan biaya pendidikan, tetapi juga menyediakan pendampingan akademik, bimbingan mental, dan pengembangan potensi pribadi. Tujuan kami adalah memutus mata rantai kemiskinan melalui pendidikan yang inklusif dan bermutu.",
      kategori: "Pilar Pendidikan",
      slug: "beasiswa-anak-yatim",
      sisa_hari: 18,
    },
    {
      gambar: "https://picsum.photos/500/300?random=5",
      judul: "Wakaf Sumur Air Bersih",
      terkumpul: "Rp 65.000.000",
      target: "Rp 120.000.000",
      deskripsi:
        "Proyek strategis untuk membangun sumur air bersih di desa-desa yang mengalami krisis air. Kami tidak sekadar membangun infrastruktur, tetapi juga memberikan edukasi tentang sanitasi dan hygiene. Setiap sumur yang dibangun akan memberikan akses air bersih berkelanjutan bagi ratusan keluarga, meningkatkan kualitas kesehatan dan kehidupan masyarakat pedesaan.",
      kategori: "Pilar Lingkungan",
      slug: "wakaf-sumur-air",
      sisa_hari: 35,
    },
    {
      gambar: "/images/ambulan-gratis.jpg",
      judul: "Ambulans Gratis",
      terkumpul: "Rp 100.000.000",
      target: "Rp 250.000.000",
      deskripsi:
        "Layanan ambulans komprehensif untuk masyarakat kurang mampu, yang tidak hanya menyediakan transportasi medis darurat, tetapi juga mencakup layanan kesehatan mobile. Tim medis profesional kami siap memberikan pertolongan pertama, rujukan medis, dan dukungan kesehatan di wilayah terpencil. Program ini bertujuan mengurangi keterlambatan penanganan medis dan meningkatkan akses layanan kesehatan.",
      kategori: "Pilar Kesehatan",
      slug: "ambulans-gratis",
      sisa_hari: 40,
    },
    {
      gambar: "/images/umkm.jpg",
      judul: "Pemberdayaan UMKM",
      terkumpul: "Rp 110.000.000",
      target: "Rp 200.000.000",
      deskripsi:
        "Program komprehensif untuk memberdayakan Usaha Mikro, Kecil, dan Menengah (UMKM) di desa-desa tertinggal. Kami tidak hanya memberikan modal usaha, tetapi juga memberikan pelatihan kewirausahaan, pendampingan manajemen, akses pasar digital, dan pengembangan produk. Tujuan kami adalah menciptakan ekosistem ekonomi yang kuat dan berkelanjutan di tingkat akar rumput.",
      kategori: "Pilar Ekonomi",
      slug: "pemberdayaan-umkm",
      sisa_hari: 28,
    },
    {
      gambar: "/images/kesehatan-gratis.jpg",
      judul: "Layanan Kesehatan Gratis",
      terkumpul: "Rp 95.000.000",
      target: "Rp 180.000.000",
      deskripsi:
        "Inisiatif holistik untuk memberikan layanan kesehatan komprehensif secara gratis bagi masyarakat kurang mampu. Program ini mencakup pemeriksaan kesehatan berkala, pengobatan umum, konsultasi spesialis, pemberian obat-obatan, dan edukasi kesehatan preventif. Kami berkomitmen untuk mengurangi kesenjangan akses layanan kesehatan dan meningkatkan kualitas hidup masyarakat.",
      kategori: "Pilar Kesehatan",
      slug: "layanan-kesehatan-gratis",
      sisa_hari: 22,
    },
    {
      gambar: "https://picsum.photos/500/300?random=9",
      judul: "Konservasi Hutan Lindung",
      terkumpul: "Rp 85.000.000",
      target: "Rp 150.000.000",
      deskripsi:
        "Program berkelanjutan untuk pelestarian dan konservasi hutan lindung melalui pendekatan komprehensif. Kegiatan mencakup penanaman pohon, rehabilitasi ekosistem, pemberdayaan masyarakat sekitar hutan, edukasi lingkungan, dan perlindungan satwa. Kami bertujuan menciptakan keseimbangan antara pelestarian alam dan kesejahteraan masyarakat lokal.",
      kategori: "Pilar Lingkungan",
      slug: "konservasi-hutan-lindung",
      sisa_hari: 24,
    },
    {
      gambar: "/images/zakat.jpg",
      judul: "Zakat Penghasilan",
      terkumpul: "Rp 85.000.000",
      target: "Rp 150.000.000",
      deskripsi:
        "Program penghimpunan dan pendistribusian zakat penghasilan yang transparan dan amanah. Kami membantu muzaki menunaikan zakat dengan mudah dan tepat sasaran, serta memastikan mustahik menerima manfaat maksimal. Fokus kami adalah pemberdayaan ekonomi, pendidikan, dan kesejahteraan sosial bagi mereka yang berhak menerima zakat.",
      kategori: "Zakat",
      slug: "zakat-penghasilan",
      sisa_hari: 24,
    },
    {
      gambar: "/images/zakat.jpg",
      judul: "Zakat Maal",
      terkumpul: "Rp 85.000.000",
      target: "Rp 150.000.000",
      deskripsi:
        "Program strategis untuk pengelolaan zakat maal (zakat harta) secara profesional dan produktif. Kami tidak sekadar mendistribusikan, tetapi juga memberdayakan penerima zakat melalui investasi modal usaha, pelatihan keterampilan, dan pendampingan berkelanjutan untuk mencapai kemandirian ekonomi.",
      kategori: "Zakat",
      slug: "zakat-maal",
      sisa_hari: 24,
    },
    {
      gambar: "/images/infaq.jpg",
      judul: "Infaq Umum",
      terkumpul: "Rp 85.000.000",
      target: "Rp 150.000.000",
      deskripsi:
        "Wadah infaq fleksibel yang memungkinkan donatur berkontribusi untuk berbagai program kemanusiaan. Dana infaq akan dialokasikan secara dinamis sesuai kebutuhan mendesak, termasuk bantuan bencana, layanan sosial, pendidikan, kesehatan, dan pemberdayaan masyarakat. Transpransi dan akuntabilitas adalah komitmen utama kami.",
      kategori: "Infaq",
      slug: "infaq-umum",
      sisa_hari: 24,
    },
  ];
  // State untuk filter dan pagination
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter dan pagination
  const filteredPrograms = useMemo(() => {
    return selectedCategory === "Semua"
      ? programs
      : programs.filter((p) => p.kategori === selectedCategory);
  }, [selectedCategory, programs]);

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Animasi Framer Motion
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Hero Section */}
      <HeroSection
        title="Program Donasi"
        subtitle="Wujudkan kebaikan bersama melalui program tepat sasaran"
        imageSrc="/images/logo-zis.png"
      />

      {/* Kategori Filter dengan ikon */}
      <div className="flex flex-wrap justify-center gap-4 my-8 px-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setCurrentPage(1);
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            className={`flex items-center gap-2 min-w-[160px] px-4 py-3 rounded text-base font-medium transition text-center ${
              selectedCategory === cat.name
                ? `bg-${cat.color}-100 text-${cat.color}-600 border border-${cat.color}-200`
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-5 h-5 text-${cat.color}-500`}
            >
              <path fillRule="evenodd" d={cat.icon} clipRule="evenodd" />
            </svg>
            {cat.name}
          </button>
        ))}
      </div>
      {/* Daftar Program */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Tidak ada program pada kategori ini.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-6 md:mx-12 lg:mx-24 gap-8">
            {paginatedPrograms.map((program) => {
              // Cari warna kategori yang sesuai
              const categoryColor =
                categories.find((cat) => cat.name === program.kategori)
                  ?.color || "orange";

              return (
                <motion.div
                  key={program.slug}
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg mb-8 shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 flex flex-col h-[450px]"
                >
                  {/* Fixed height image container */}
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={program.gambar}
                      alt={program.judul}
                      fill
                      className="object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div
                      className={`absolute top-4 left-4 bg-${categoryColor}-500 text-white text-xs font-bold uppercase px-2 py-1 rounded`}
                    >
                      {program.kategori}
                    </div>
                  </div>

                  {/* Card content with flex to push button to bottom */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {program.judul}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {program.deskripsi}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className={`bg-${categoryColor}-500 h-2.5 rounded-full`}
                        style={{
                          width: `${
                            (parseInt(
                              program.terkumpul.replace(/[^0-9]/g, "")
                            ) /
                              parseInt(program.target.replace(/[^0-9]/g, ""))) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>

                    {/* Informasi donasi */}
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">
                        Terkumpul: {program.terkumpul}
                      </span>
                      <span className="font-medium">
                        {Math.round(
                          (parseInt(program.terkumpul.replace(/[^0-9]/g, "")) /
                            parseInt(program.target.replace(/[^0-9]/g, ""))) *
                            100
                        )}
                        %
                      </span>
                    </div>

                    {/* Button pushed to bottom with mt-auto */}
                    <div className="mt-auto">
                      <Link
                        href={`/program/${program.slug}`}
                        className={`inline-block bg-${categoryColor}-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-${categoryColor}-600 transition-colors w-full text-center`}
                      >
                        Lihat Selengkapnya
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center mt-10 mb-12">
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition ${
                      currentPage === i + 1
                        ? "bg-orange-500 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-4">
                Halaman {currentPage} dari {totalPages}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Program;
