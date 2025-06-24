import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";

const DonasiSukses: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pembayaran Berhasil - Terima Kasih</title>
        <meta
          name="description"
          content="Terima kasih atas pembayaran Anda. Semoga menjadi amal jariyah yang berkah."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.5 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
            >
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-2xl font-bold text-white mb-2">
                Pembayaran Anda Berhasil!
              </h1>
              <p className="text-green-100">
                Terima kasih atas donasi dan kebaikan Anda.
              </p>
            </motion.div>
          </div>

          {/* Appreciation Message */}
          <div className="p-6 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="text-2xl mb-2">🤲</div>
              <p className="text-gray-700 text-sm font-bold mb-2">
                Barakallahu fiikum!
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Semoga donasi Anda menjadi amal jariyah yang berkah dan
                bermanfaat untuk sesama. Jika Anda membutuhkan bantuan atau
                kwitansi resmi, silakan hubungi kami melalui kontak di bawah
                ini.
              </p>
            </motion.div>

            {/* Kontak Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-green-500 text-sm"
            >
              <div className="mb-3 font-semibold text-gray-700">
                Kontak Kami
              </div>
              <div className="space-y-3">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.6 18a8 8 0 1 1 1.4-7" />
                    <path d="M8 12.57l-.28-.43a8 8 0 1 0 3-3" />
                  </svg>
                  WhatsApp: 0812-3456-7890
                </a>
                <a
                  href="mailto:info@yayasandonasi.org"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email: info@yayasandonasi.org
                </a>
              </div>
            </motion.div>

            <div className="">
              <Link
                href="/program"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg 
      shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Kembali
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default DonasiSukses;
