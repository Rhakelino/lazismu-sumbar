import HeroSection from "@/components/HeroSection";
import supabase from "@/lib/db";
import { motion } from "framer-motion";
import { Phone, BadgeInfo, Ambulance, Camera, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
};

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { name, email, subject, message } = formData;
      // Ensure that the form data is not empty
      if (!name || !email || !subject || !message) {
        throw new Error("All fields must be filled.");
      }
      // Insert form data into Supabase (create a 'message' table)
      const { data, error } = await supabase
        .from("message") // Correct table name
        .insert([
          {
            nama_lengkap: name, // Correct column names
            email: email,
            subjek: subject,
            pesan: message,
          },
        ]);

      // If there is an error, log and throw the error to display to the user
      if (error) {
        console.error("Supabase Insert Error:", error); // Log the full error from Supabase
        throw new Error(error.message); // Provide a more detailed error message
      }

      setNotification("Pesan Anda berhasil dikirim!");

      // Clear form data after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setNotification(""); // Reset the notification after 3 seconds
      }, 1000);
    } catch (error: any) {
      // Log the error message to the console for debugging
      console.error("Error submitting form: ", error);

      // Display a notification with the detailed error message
      setNotification(`Terjadi kesalahan: ${error.message}`);
    }
  };
  return (
    <div>
      {/* Header Section */}
      <HeroSection title="Kontak Kami" subtitle="Program donasi pilihan untuk kebaikan bersama" imageSrc="/images/logo-zis.png" />

      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-8 sm:py-16 space-y-8 sm:space-y-16 overflow-x-hidden">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 sm:p-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8">
            {/* Tentang */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 flex flex-col justify-between">
              <div>
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
              </div>
              <div className="mt-5 flex items-center">
                <div className="flex space-x-3">
                  {/* Add social media icons here */}
                </div>
                <span className="ml-4 text-sm text-gray-500">Ikuti kami di sosial media</span>
              </div>
            </div>

            {/* Informasi Kontak */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border h-full border-gray-100 w-full max-w-md mx-auto">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 gap-3 flex items-center">
                <BadgeInfo className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                Informasi Kontak
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {/* Add contact information here */}
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto rounded-lg shadow-sm mb-8 bg-white p-4 sm:p-6">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 md:h-7 md:w-7 mr-2 text-orange-500" />
              Lokasi Kami
            </h2>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_URL"
                className="w-full h-56 sm:h-72 md:h-96"
                style={{ minHeight: 200, border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Lazismu"
              ></iframe>
            </div>
          </div>

          {/* Form Kirim Pesan */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 max-w-4xl mx-auto">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-5z" />
                </svg>
                Kirim Pesan
              </h2>

              {/* Notification */}
              {notification && (
                <div className="text-center text-sm text-gray-800 mb-4 p-3 rounded-md bg-green-200">
                  {notification}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                    value={formData.subject}
                    onChange={handleInputChange}
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
                    value={formData.message}
                    onChange={handleInputChange}
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
                    Kirim Pesan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
