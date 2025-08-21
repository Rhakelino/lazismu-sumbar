"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

type MemberItem = {
  name: string;
  role?: string;
  image: string;
};

type LeaderItem = {
  title: string;
  name: string;
  role?: string;
  image: string;
};

type StaffItem = {
  role: string;
  name?: string;
  image?: string;
  members?: string[];
  memberImages?: string[];
};

type WakilKetua = {
  title: string;
  name: string;
  image: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const fadeRight = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
};

const Struktur: React.FC = () => {
  const dewanPengawas: MemberItem[] = [
    {
      name: "Dr. Mursal, M.Ag",
      role: "Anggota",
      image: "/images/mursal.jpg",
    },
    {

      name: "Prof. Dr. Sobhan Lubis, M.A",
      role: "Ketua",
      image: "/images/sobhan.jpg",
    },
    {
      name: "Dr. Desi Asmaret, M.Ag",
      role: "Anggota",
      image: "/images/asmaret.jpg",
    },
  ];

  const leaders: LeaderItem[] = [
    {
      title: "Ketua Badan Pengurus",
      name: "Zainal Akil, S.Pd",
      image: "/images/profil-pengurus.jpg",
    },
    {
      title: "Sekretaris",
      name: "Afdi Efendi, S.Ag",
      image: "/images/afdi.jpg",
    },
  ];

  const wakilSekretaris = {
    name: "Anasrul, SHI., C.ELM",
    image: "/images/anasrul.jpg",
  };

  const wakilKetuaBidang: WakilKetua[] = [
    {
      title: "Himpunan & Kerjasama",
      name: "Dr. Hj. Ulfatmi Amirsyah, M.Ag",
      image: "/images/ulfatmi.jpg",
    },
    {
      title: "Audit Kepatuhan",
      name: "Dr. Willy Nofranita, S.E.,M.Si, Ak, CA",
      image: "/images/willy.jpg",
    },
    {
      title: "Pendayahgunaan dan Pendistribusian",
      name: "Dr. Budi Santoso",
      image: "/images/budi-santoso.jpg",
    },
    {
      title: "Transformasi Digital dan Monitoring Evaluasi",
      name: "Arif Budiman, M.Kom",
      image: "/images/arif.jpg",
    },
  ];

  const managerArea = {
    name: "M. Amirul Ramli, S.Pd, M.Pd",
    image: "/images/avatar-manager-area.jpg",
  };

  const staffList: StaffItem[] = [
    { role: "Staff Keuangan", name: "Tuti Nurhayati, S. Ak.", image: "/images/tuti.jpg" },
    { role: "Staff Program", name: "Adv. Arva Dekri, S.H.", image: "/images/dekri.jpg" },
    { role: "Staff Program", name: "Miki Rinaldi", image: "/images/miki-rinaldi.jpg" },
    { role: "Staff Administrasi", name: "Roza Rahmadani, S.Sos", image: "/images/oca.jpg" },
    { role: "Staff Fundraising", name: "IdilPutra, S.Pd", image: "/images/idil.jpg" },
    { role: "Staff Fundraising", name: "Ade Syahputra", image: "/images/ade.jpg" },
  ];


  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Struktur"
        subtitle="Program donasi pilihan untuk kebaikan bersama"
        imageSrc="/images/logo-zis.png"
      />

      {/* Struktur Organisasi */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        <div className="mb-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {/* Title */}
          <motion.div
            variants={fadeRight}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative max-w-7xl mx-auto"
          >
            <h2 className="font-bold uppercase text-xl text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 mr-3 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                STRUKTUR KEPENGURUSAN
              </span>
            </h2>
          </motion.div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-8"></div>

          {/* Dewan Pengawas Syariah */}
          <div className="transform transition duration-300 hover:scale-[1.01]">
            <motion.h3
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-bold text-gray-800 text-lg mb-3 flex items-center"
            >
              <span className="w-2 h-8 bg-amber-400 rounded-r-md mr-2"></span>
              Dewan Pengawas Syariah
            </motion.h3>
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-sm p-5 border border-amber-100"
            >
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dewanPengawas.map((member, index) => (
                  <motion.li
                    key={member.name}
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden shadow-sm">
                      <Image src={member.image} alt={member.name} width={128} height={128} className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{member.name}</p>
                      <p className="text-sm font-medium text-amber-600">{member.role}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Ketua dan Sekretaris */}
          <div className="grid md:grid-cols-2 gap-6 mb-3 pt-10">
            {leaders.map((leader, index) => (
              <div key={index} className="transform transition duration-300 hover:scale-[1.01]">
                <motion.h3
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="font-bold text-gray-800 text-lg mb-3 flex items-center"
                >
                  <span className="w-2 h-8 bg-orange-400 rounded-r-md mr-2"></span>
                  {leader.title}
                </motion.h3>
                <motion.div
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-5 border border-orange-100 h-full flex items-center"
                >
                  <div className="bg-white p-4 rounded-lg shadow-sm w-full flex items-center space-x-4">
                    <div className="w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm mb-4 flex-shrink-0">
                      <Image src={leader.image} alt={leader.name} width={128} height={128} className="object-cover" />
                    </div>
                    <p className="font-bold text-gray-800 text-lg">{leader.name}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Wakil Sekretaris */}
          <div className="transform transition duration-300 pt-14 hover:scale-[1.01]">
            <motion.h3
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-bold text-gray-800 text-lg mb-3 flex items-center justify-center"
            >
              Wakil Sekretaris
            </motion.h3>
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-8 border border-orange-100 flex md:flex-col items-center"
            >
              <div className="w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm mb-4 flex-shrink-0">
                <Image
                  src={wakilSekretaris.image}
                  alt={wakilSekretaris.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-gray-800 text-lg text-center">{wakilSekretaris.name}</p>
            </motion.div>
          </div>

          {/* Wakil Ketua Bidang */}
          <div className="transform transition duration-300 pt-8 hover:scale-[1.01]">
            <motion.h3
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-bold text-gray-800 text-lg mb-3 flex items-center"
            >
              <span className="w-2 h-8 bg-blue-400 rounded-r-md mr-2"></span>
              Wakil Ketua Bidang
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-4">
              {wakilKetuaBidang.map((field, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-5 border border-blue-100`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-sm mr-3 flex-shrink-0">
                      <Image src={field.image} alt={field.name} width={128} height={128} className="object-cover" />
                    </div>
                    <h4 className={`font-bold text-black text-sm uppercase`}>
                      {field.title}
                    </h4>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-800">{field.name}</p>
                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wider mb-3">Ketua</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Manager Area */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm p-5 border border-orange-100 mb-5 mt-10"
          >
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                <Image src={managerArea.image} alt={managerArea.name} width={128} height={128} className="object-cover" />
              </div>
              <div className="text-center">
                <h4 className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Manager Area</h4>
                <p className="font-bold text-gray-800 text-lg">{managerArea.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Staff */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staffList.map((staff, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl shadow p-5 border border-gray-200"
              >
                <div className="flex items-center mb-4 space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                    <Image
                      src={staff.image || "/images/avatar-profil.png"}
                      alt={staff.name || staff.role}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg uppercase">{staff.role}</h4>
                </div>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-gray-800 font-medium">{staff.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Volunteer Section */}
        </div>
          <div className="">
            <motion.h3
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-bold text-gray-800 text-lg mb-3 flex items-center pt-10"
            >
              <span className="w-2 h-8 bg-teal-400 rounded-r-md mr-2"></span>
              Volunteer
            </motion.h3>
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-sm p-4 sm:p-6 border border-amber-100 text-center overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-amber-200 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-36 h-36 bg-amber-200 rounded-full opacity-30"></div>

              <Image
                src="/images/valounteer.jpg"
                alt={wakilSekretaris.name}
                width={720}
                height={480}
                className="w-full h-auto max-h-[400px] md:max-h-[500px] object-cover rounded-lg mb-4"
              />

              <div className="relative bg-white rounded-lg shadow-sm md:py-6 md:px-4">
                <p className="font-bold text-amber-600 text-lg tracking-wider">
                  VOLUNTEER LAZISMU SUMATERA BARAT
                </p>
              </div>
            </motion.div>
          </div>
      </div>
    </div>
  );
};

export default Struktur;
