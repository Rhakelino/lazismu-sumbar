'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ClipboardList, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const VisiMisi = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Visi Misi"
        subtitle="Program donasi pilihan untuk kebaikan bersama"
        imageSrc="/images/logo-zis.png"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-sm p-6 border border-orange-100 flex flex-col h-full"
          >
            <h2 className="font-bold uppercase text-lg text-orange-600 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              VISI
            </h2>
            <div className="h-0.5 w-16 bg-orange-500 mb-4"></div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi Lembaga Amil Zakat Terpercaya di Sumatera Barat setingkat nasional hingga internasional
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm p-6 border border-blue-100 flex flex-col h-full"
          >
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
          </motion.div>
        </div>

        {/* Prinsip */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h2 className="font-bold uppercase text-lg text-gray-800 mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-green-600" />
            PRINSIP
          </h2>
          <div className="h-0.5 w-16 bg-green-500 mb-4"></div>
          <p className="text-gray-700 mb-4">Pengelolaan ZISKA berprinsip:</p>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            {[
              { title: "Syariat Islam", desc: "berpedoman pada syariat Islam dalam perekrutan hingga distribusi" },
              { title: "Amanah dan integritas", desc: "memegang teguh kode etik dan kepercayaan" },
              { title: "Kemanfaatan", desc: "memberikan manfaat besar bagi mustahik" },
              { title: "Keadilan", desc: "adil dalam pemenuhan hak dan kewajiban" },
              { title: "Kepastian hukum", desc: "ada jaminan hukum bagi muzaki dan mustahik" },
              { title: "Terintegrasi", desc: "sistem yang saling mendukung secara hirarki" },
              { title: "Akuntabilitas", desc: "pengelolaan bisa dipertanggungjawabkan dan transparan" },
              { title: "Profesional", desc: "berdasarkan kompetensi dan komitmen tinggi" },
              { title: "Transparansi", desc: "informasi disampaikan secara jelas dan terbuka" },
              { title: "Sinergi", desc: "kerja sama produktif dengan semua pemangku kepentingan" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mt-1">
                  {index + 1}
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    <span className="font-bold">{item.title}</span>, {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tujuan */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h2 className="font-bold uppercase text-lg text-gray-800 mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-purple-600" />
            TUJUAN
          </h2>
          <div className="h-0.5 w-16 bg-purple-500 mb-4"></div>
          <p className="text-gray-700 mb-4">Pengelolaan ZISKA bertujuan:</p>
          <div className="space-y-4">
            {[
              "Meningkatkan efektivitas dan efisiensi pelayanan dalam pengelolaan dana ZISKA",
              "Meningkatkan manfaat dana ZISKA untuk kesejahteraan masyarakat dan penanggulangan kemiskinan",
              "Meningkatkan kemampuan ekonomi umat melalui pemberdayaan usaha-usaha produktif"
            ].map((tujuan, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start bg-purple-50 p-4 rounded-lg"
              >
                <div className="flex-shrink-0 bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <p className="text-gray-700">{tujuan}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisiMisi;
