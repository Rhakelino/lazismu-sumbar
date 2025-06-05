import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Camera, Ambulance, BadgeInfo } from 'lucide-react';
import HeroSection from '@/components/HeroSection';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};
const Kontak = () => {
    return (
        <div>
            {/* Header Section */}
            <HeroSection
                title="Kontak Kami"
                subtitle="Program donasi pilihan untuk kebaikan bersama"
                imageSrc="/images/logo-zis.png"
            />
            {/* Struktur Organisasi */}
            <div className='max-w-screen-md mx-auto px-2 sm:px-4 py-8 sm:py-16 space-y-8 sm:space-y-16 overflow-x-hidden'>
                <div>
                    <motion.div
                        variants={fadeUp}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white rounded-xl shadow-sm p-4 sm:p-8 border border-gray-100"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8">
                            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <Phone className="h-5 w-5 mr-2 text-orange-500" />
                                    Tentang LAZISMU Sumatera Barat
                                </h2>
                                <div className="space-y-3 text-gray-600 text-sm sm:text-base">
                                    <p className="leading-relaxed">
                                        LAZISMU (Lembaga Amil Zakat, Infaq, dan Sedekah Muhammadiyah) Sumatera Barat adalah lembaga yang
                                        memiliki komitmen tinggi dalam mengelola zakat, infaq, dan sedekah dari masyarakat untuk
                                        didistribusikan kepada yang membutuhkan. Sebagai bagian dari Muhammadiyah, yang merupakan salah
                                        satu organisasi Islam terbesar di Indonesia, LAZISMU Sumatera Barat bertujuan untuk memberdayakan
                                        masyarakat melalui pengelolaan dana yang amanah, transparan, dan profesional.
                                    </p>
                                    <p className="leading-relaxed">
                                        Kami berkomitmen untuk menciptakan kesejahteraan sosial yang merata, dengan memberikan bantuan
                                        kepada mereka yang kurang beruntung, baik dalam bentuk bantuan langsung maupun program-program
                                        pemberdayaan yang lebih berkelanjutan.
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center">
                                    <div className="flex space-x-3">
                                        <a href="https://www.facebook.com/lazismusumbar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                            {/* Facebook Icon */}
                                        </a>
                                        <a href="https://www.instagram.com/lazismusumaterabarat/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                                            {/* Instagram Icon */}
                                        </a>
                                        <a href="https://www.twitter.com/lazismusumbar" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                            {/* Twitter Icon */}
                                        </a>
                                        <a href="https://www.youtube.com/lazismusumbar" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                                            {/* YouTube Icon */}
                                        </a>
                                    </div>
                                    <span className="ml-4 text-sm text-gray-500">Ikuti kami di sosial media</span>
                                </div>
                            </div>

                            {/* Informasi Kontak */}
                            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border h-full border-gray-100 mb-8 w-full max-w-md mx-auto">
  <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 gap-3 flex items-center">
    <BadgeInfo className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
    Informasi Kontak
  </h2>
  {/* Contact Details */}
  <div className="space-y-4 sm:space-y-6">
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-orange-50 rounded-full p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <Ambulance className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
      </div>
      <div className="ml-4 sm:ml-5 flex-grow">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Layanan Ambulans Gratis</h3>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm">0823 8746 2887 (Pak Nal)</p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-orange-50 rounded-full p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
      </div>
      <div className="ml-4 sm:ml-5 flex-grow">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Whatsapp Kantor</h3>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm">0823 9170 7227</p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-orange-50 rounded-full p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
      </div>
      <div className="ml-4 sm:ml-5 flex-grow">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Media Lazismu</h3>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm">0821 6212 8403</p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-orange-50 rounded-full p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
      </div>
      <div className="ml-4 sm:ml-5 flex-grow">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">Email</h3>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm break-all">lazismusumaterabarat@gmail.com</p>
      </div>
    </div>
  </div>
</div>

                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
                    >
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                                Lokasi Kami
                            </h2>
                            <div className="rounded-lg overflow-hidden border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126349.87422777654!2d100.2775352!3d-0.9519828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b9e3d0ad4d9f%3A0xa4b7469c50253fa!2sJl.+Bundo+Kanduang+No.1%2C+Belakang+Tangsi%2C+Kec.%2FPadang+Bar.%2C+Kota+Padang%2C+Sumatera+Barat!5e0!3m2!1sen!2sid!4v1658923483022!5m2!1sen!2sid"
                                    className="w-full h-[300px] md:h-[400px]" style={{ border: 0 }} allowFullScreen loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-5z" />
                                </svg>
                                Kirim Pesan
                            </h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Masukkan nama lengkap Anda"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Masukkan email Anda"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Masukkan subjek pesan"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Masukkan pesan Anda"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Kirim Pesan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Kontak;