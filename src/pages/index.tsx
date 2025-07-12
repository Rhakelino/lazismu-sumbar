"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Berita from "./berita";
import BeritaGrid from "@/components/BeritaGrid";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const zoomIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

const fadeRight = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
};

const Home: React.FC = () => {
  const infoBoxes = [
    { title: "6", description: "Pilar Lazismu" },
    { title: "Rp 1.977.468.393", description: "Total Himpunan" },
    { title: "4828", description: "Donatur" },
  ];

  const programs = [
    {
      category: "Pendidikan",
      title: "Beasiswa Pendidikan",
      description:
        "Memberikan akses pendidikan berkualitas kepada anak-anak yang kurang mampu melalui program beasiswa.",
      imageUrl: "https://picsum.photos/500/300?random=1",
      progress: 75,
      totalRaised: "Rp 150.000.000",
    },
    {
      category: "Kesehatan",
      title: "Layanan Kesehatan Gratis",
      description:
        "Menyediakan layanan kesehatan gratis untuk masyarakat prasejahtera di daerah terpencil.",
      imageUrl: "https://picsum.photos/500/300?random=2",
      progress: 60,
      totalRaised: "Rp 120.000.000",
    },
    {
      category: "Ekonomi",
      title: "Pemberdayaan UMKM",
      description:
        "Mendukung pengembangan usaha mikro kecil menengah untuk meningkatkan kemandirian ekonomi.",
      imageUrl: "https://picsum.photos/500/300?random=3",
      progress: 45,
      totalRaised: "Rp 90.000.000",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/images/slider-1.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </section>

      {/* Info Box */}
     <motion.div
  variants={fadeUp}
  initial="initial"
  whileInView="animate"
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.3 }}
  className="relative mt-[-40px] z-10 bg-orange-600 text-white mx-4 sm:mx-0 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 rounded-2xl shadow-lg"
>
  {[
    { title: "Pilar Lazismu", value: "6" },
    { title: "Total Himpunan", value: "Rp 1.977.468.393" },
    { title: "Target Himpunan", value: "Rp 2.188.080.000" }
  ].map((item, index) => (
    <div
      key={index}
      className="bg-orange-500/30 rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:bg-orange-500/40 hover:scale-[1.02]"
    >
      <h3 className="text-sm sm:text-base font-medium text-white/90 mb-1 sm:mb-2">
        {item.title}
      </h3>
      <p className="text-xl sm:text-3xl font-bold text-white">
        {item.value}
      </p>
    </div>
  ))}
</motion.div>

      {/* Program Section */}
      <section className="py-16">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Program Unggulan
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4 rounded"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mendukung program-program kemanusiaan yang berdampak untuk
              masyarakat yang membutuhkan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={zoomIn}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300"
              >
                <div className="relative h-56">
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                  />
                  <div
                    className={`absolute top-4 left-4 text-xs font-bold text-white px-2 py-1 rounded ${program.category === "Pendidikan"
                      ? "bg-orange-500"
                      : program.category === "Kesehatan"
                        ? "bg-red-500"
                        : "bg-green-500"
                      }`}
                  >
                    {program.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 relative">
                    <div
                      className={`bg-${program.category === "Pendidikan"
                        ? "orange"
                        : program.category === "Kesehatan"
                          ? "red"
                          : "green"
                        }-500 h-2.5 rounded-full`}
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">
                      Terkumpul: {program.totalRaised}
                    </span>
                    <span className="font-medium">{program.progress}%</span>
                  </div>
                  <Link
                    href="/program"
                    className={`inline-block bg-${program.category === "Pendidikan"
                      ? "orange"
                      : program.category === "Kesehatan"
                        ? "red"
                        : "green"
                      }-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-${program.category === "Pendidikan"
                        ? "orange"
                        : program.category === "Kesehatan"
                          ? "red"
                          : "green"
                      }-600 transition-colors`}
                  >
                    Donasi Sekarang
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              href="/program"
              className="inline-flex items-center px-5 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Lihat Semua Program
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Testimoni Donatur
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4 rounded"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apa kata mereka yang telah berpartisipasi dalam program-program
              kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmad Syafiq",
                message:
                  "Saya sangat terbantu dengan adanya layanan dari LAZISMU!",
              },
              {
                name: "Nur Hasanah",
                message:
                  "Program beasiswa pendidikan sangat membantu anak-anak di daerah kami.",
              },
              {
                name: "Farid Rahman",
                message:
                  "Layanan ambulans gratis ini sangat berharga bagi kami.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeRight}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md relative"
              >
                <div className="absolute -top-5 left-6 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-4">
                  &quot;{testimonial.message}&quot;
                </p>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 bg-orange-500 text-white text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Mari Berbagi Kebaikan!</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Bersama kita dapat membantu lebih banyak saudara-saudara kita yang
          membutuhkan.
        </p>
        <Link
          href="/program"
          className="inline-block bg-white text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Donasi Sekarang
        </Link>
      </motion.section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Berita</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-4 rounded"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Program donasi pilihan untuk kebaikan bersama
        </p>
        <BeritaGrid />
      </div>
    </div>
  );
};

export default Home;
