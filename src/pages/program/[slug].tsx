import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

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
  deskripsiLengkap?: string;
  lokasi?: string;
  donatur?: number;
  lembaga?: string;
  manfaat?: string[];
  dokumentasi?: string[];
};

// Data Program
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

const ProgramDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState<"deskripsi" | "dokumentasi">(
    "deskripsi"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);

  // Temukan program berdasarkan slug
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <div className="container mx-auto text-center py-20">
        Program tidak ditemukan
      </div>
    );
  }

  // Animasi Framer Motion
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  // Hitung persentase donasi
  const persentaseDonasi = Math.round(
    (parseInt(program.terkumpul.replace(/[^0-9]/g, "")) /
      parseInt(program.target.replace(/[^0-9]/g, ""))) *
      100
  );

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        {...fadeUp}
        className="bg-white shadow-lg rounded-xl overflow-hidden"
      >
        {/* Header Program */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gambar Utama */}
          <div className="relative h-[300px] md:h-[500px] w-full">
            <Image
              src={program.gambar}
              alt={program.judul}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Informasi Program */}
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {program.judul}
            </h1>

            <div className="flex justify-between items-center mb-4">
              <span className="text-base md:text-lg text-gray-600">
                <strong>Kategori:</strong> {program.kategori}
              </span>
              <span className="text-base md:text-lg text-gray-600">
                <strong>Sisa Waktu:</strong> {program.sisa_hari} Hari
              </span>
            </div>

            {/* Progress Donasi */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mb-2">
                <div
                  className="bg-green-500 h-3 md:h-4 rounded-full"
                  style={{ width: `${persentaseDonasi}%` }}
                />
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Terkumpul: {program.terkumpul}</span>
                <span>{persentaseDonasi}%</span>
              </div>
            </div>

            {/* Statistik Donasi */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center bg-gray-50 p-2 md:p-4 rounded-lg">
              <div>
                <h3 className="text-base md:text-xl font-bold text-green-600">
                  {program.terkumpul}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">Terkumpul</p>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold text-blue-600">
                  {program.target}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">Target</p>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold text-orange-600">
                  {program.sisa_hari}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">Hari Tersisa</p>
              </div>
            </div>

            {/* Tombol Donasi */}
            <button
              onClick={() => setShowDevelopmentModal(true)}
              className="w-full mt-4 md:mt-6 inline-block text-center bg-green-500 text-white py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Donasi Sekarang
            </button>
          </div>
        </div>

        {/* Navigasi Tab */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 pt-4 whitespace-nowrap">
            <button
              onClick={() => setActiveTab("deskripsi")}
              className={`py-2 text-base md:text-lg font-medium ${
                activeTab === "deskripsi"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Deskripsi
            </button>
            {program.dokumentasi && (
              <button
                onClick={() => setActiveTab("dokumentasi")}
                className={`py-2 text-base md:text-lg font-medium ${
                  activeTab === "dokumentasi"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Dokumentasi
              </button>
            )}
          </nav>
        </div>

        {/* Konten Tab */}
        <div className="p-4 md:p-6">
          {activeTab === "deskripsi" ? (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Deskripsi Program
              </h2>
              <p className="text-base md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {program.deskripsiLengkap || program.deskripsi}
              </p>

              {program.lokasi && (
                <div className="mt-4 md:mt-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    Lokasi
                  </h3>
                  <p className="text-base text-gray-600">{program.lokasi}</p>
                </div>
              )}

              {program.manfaat && (
                <div className="mt-4 md:mt-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    Manfaat Program
                  </h3>
                  <ul className="list-disc list-inside text-base text-gray-700">
                    {program.manfaat.map((manfaat, index) => (
                      <li key={index} className="mb-2">
                        {manfaat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {program.dokumentasi?.map((dok, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(dok)}
                >
                  <Image
                    src={dok}
                    alt={`Dokumentasi ${index + 1}`}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal Gambar */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[80vh]">
            <Image
              src={selectedImage}
              alt="Dokumentasi Diperbesar"
              layout="responsive"
              width={1000}
              height={600}
              objectFit="contain"
            />
          </div>
        </div>
      )}

      {/* Modal Pengembangan */}
      {showDevelopmentModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDevelopmentModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg text-center max-w-md w-full"
          >
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Fitur Sedang Dikembangkan
            </h2>
            <p className="text-gray-600 mb-6">
              Terima kasih atas minat Anda. Saat ini, fitur donasi sedang dalam
              proses pengembangan.
            </p>
            <button
              onClick={() => setShowDevelopmentModal(false)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProgramDetail;
