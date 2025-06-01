import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const fadeRight = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
};

const Struktur = () => {
    return (
        <div>
            {/* Header Section */}
            <HeroSection
                title="Struktur"
                subtitle="Program donasi pilihan untuk kebaikan bersama"
                imageSrc="/images/logo-zis.png"
            />

            {/* Struktur Organisasi */}
            <div className='max-w-6xl mx-auto px-4 py-16 space-y-16'>
                <div className="mb-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <motion.div
                        variants={fadeRight}
                        initial="initial"
                        whileInView="animate"
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative max-w-7xl mx-auto"
                    >
                        <h2 className="font-bold uppercase text-xl text-gray-800 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mr-3 text-blue-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">STRUKTUR
                                KEPENGURUSAN</span>
                        </h2>
                    </motion.div>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-8"></div>

                    <div className="space-y-8">
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
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: "Dr. Dadang Syaripudin, M.A", role: "Ketua" },
                                        { name: "Dr. Zaman Sari, M.Ag", role: "Anggota" },
                                        { name: "B. Farid Wazdi, S.P, M.B.A", role: "Anggota" },
                                        { name: "Muhib Rosyidi, S.Th.I, M.A.Hum", role: "Anggota" },
                                        { name: "Dr. Ayi Yunus Rusyana, M.Ag", role: "Anggota" },
                                        { name: "Dr. Hamin Ilyas", role: "Anggota" },
                                        { name: "Dr. Izza Rohman, M.A", role: "Anggota" },
                                    ].map((member, index) => (
                                        <motion.li
                                            key={member.name} // Use a unique identifier  
                                            variants={fadeUp}
                                            initial="initial"
                                            whileInView="animate"
                                            transition={{ duration: 0.8 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                                        >
                                            <span className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-sm">{index + 1}</span>
                                            <div>
                                                <p className="font-semibold text-gray-800">{member.name}</p>
                                                <p className="text-sm font-medium text-amber-600">{member.role}</p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-3">
                            {[
                                {
                                    title: "Ketua Badan Pengurus",
                                    name: "Ahmand Imam Mujadid Rais. M.IR.",
                                    role: "Ex Office Bidang Riset & Pengembangan",
                                },
                                {
                                    title: "Sekretaris",
                                    name: "Gunawan Hidayat, ST, MT",
                                    role: "",
                                },
                            ].map((leader, index) => (
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
                                        <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-3 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <p className="font-bold text-gray-800 text-lg">{leader.name}</p>
                                                <p className="text-sm font-medium text-orange-600 mt-1">{leader.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

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
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "Himpunan & Kerjasama",
                                        name: "Arif Jamali Muis, S.Pd, M.Pd",
                                        members: [
                                            "Nur Sigit Nugroho, S.I",
                                            "Ninik Annisa, M.A",
                                            "M Ihsan Tanjung, S.Ag, SH, MH, M.Si",
                                        ],
                                    },
                                    {
                                        title: "Audit Kepatuhan",
                                        name: "Dr. Emmil Juliana Al Hasanah Nasution, S.E, M.Ak",
                                        members: [
                                            "Muhyil Qoyyim, S.E.I, M.Si",
                                            "Elviera Mualimin, S.Psi, M.M",
                                        ],
                                    },
                                    {
                                        title: "Kelembagaan & SDM",
                                        name: "Dr. Nurhayadi Wijhardjono, SE, M.M",
                                        members: [
                                            "Mustiawan, M.I.Kom",
                                            "Shira Sahira, A.md.Keb.",
                                        ],
                                    },
                                    {
                                        title: "Pendayagunaan",
                                        name: "Muarawati Nur Malinda, M.P.A. (M)",
                                        members: [
                                            "Artati Haris, M.Si",
                                            "Masmulyadi, SP, SH, M.Sc",
                                        ],
                                    },
                                    {
                                        title: "Transformasi Digital",
                                        name: "Barry Adhitya, S.Psi",
                                        members: [
                                            "Dodong Priyambodo",
                                            "Erry Ahmad Sunandar, ST.",
                                        ],
                                    },
                                ].map((field, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeUp}
                                        initial="initial"
                                        whileInView="animate"
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        className={`bg-gradient-to-br from-${index % 2 === 0 ? "blue" : "amber"}-50 to-white rounded-xl shadow-sm p-5 border border-${index % 2 === 0 ? "blue" : "amber"}-100`}
                                    >
                                        <div className="flex items-center mb-3">
                                            <div className={`bg-gradient-to-r from-${index % 2 === 0 ? "blue" : "amber"}-500 to-${index % 2 === 0 ? "blue-600" : "amber-600"} rounded-lg p-2 mr-3`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    {/* Placeholder for Icon */}
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13h14v2H5z" />
                                                </svg>
                                            </div>
                                            <h4 className={`font-bold text-${index % 2 === 0 ? "blue" : "amber"}-700 text-sm uppercase`}>
                                                {field.title}
                                            </h4>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg shadow-sm">
                                            <p className="font-semibold text-gray-800">{field.name}</p>
                                            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-3">Ketua</p>
                                            <div className="border-t border-gray-100 pt-3 mt-1">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Anggota:</p>
                                                <ul className="space-y-2">
                                                    {field.members.map((member, idx) => (
                                                        <li key={idx} className="flex items-center text-sm">
                                                            <span className={`flex-shrink-0 bg-${index % 2 === 0 ? "blue" : "amber"}-100 text-${index % 2 === 0 ? "blue" : "amber"}-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2`}>
                                                                {idx + 1}
                                                            </span>
                                                            <p className="text-gray-700">{member}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="transform transition duration-300 hover:scale-[1.01]">
                            <motion.h3
                                variants={fadeUp}
                                initial="initial"
                                whileInView="animate"
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="font-bold text-gray-800 text-lg mb-3 flex items-center"
                            >
                                <span className="w-2 h-8 bg-teal-400 rounded-r-md mr-2"></span>
                                Manager & Staff
                            </motion.h3>
                            <motion.div
                                variants={fadeUp}
                                initial="initial"
                                whileInView="animate"
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-sm p-5 border border-teal-100 mb-5"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start p-4 bg-white rounded-lg shadow-sm">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-400 rounded-full mb-3 md:mb-0 md:mr-4 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Manager
                                            Area</h4>
                                        <p className="font-bold text-gray-800 text-lg">M. Amirul Ramli, S.Pd, M.Pd</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { role: "Staff Keuangan", name: "Tuti Nurhayati, S. Ak." },
                                    {
                                        role: "Staff Program",
                                        members: [
                                            "Adv. Arva Dekri, S.H.",
                                            "Miki Rinaldi",
                                        ],
                                    },
                                    { role: "Staff Administrasi", name: "Roza Rahmadani, S.Sos" },
                                    {
                                        role: "Staff Fundraising",
                                        members: [
                                            "IdilPutra, S.Pd",
                                            "Ade Syahputra",
                                        ],
                                    },].map((staff, index) => (
                                        <motion.div
                                            key={index}
                                            variants={fadeUp}
                                            initial="initial"
                                            whileInView="animate"
                                            transition={{ duration: 0.8 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-4 border border-gray-100"
                                        >
                                            <div className="flex items-center mb-3">
                                                <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-2 mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none"
                                                        viewBox="0 0 24 24" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-bold text-gray-700 text-sm uppercase">{staff.role}</h4>
                                            </div>
                                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                                {staff.members ? (
                                                    <ul className="space-y-2">
                                                        {staff.members.map((member, idx) => (
                                                            <li key={idx} className="flex items-center text-sm">
                                                                <span className="flex-shrink-0 bg-gray-200 text-gray-600 rounded-md w-5 h-5 flex items-center justify-center text-xs mr-2">{idx + 1}</span>
                                                                <p className="text-gray-700">{member}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="font-medium text-gray-800">{staff.name}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>

                        <div className="transform transition duration-300 hover:scale-[1.01]">
                            <motion.h3
                                variants={fadeUp}
                                initial="initial"
                                whileInView="animate"
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="font-bold text-gray-800 text-lg mb-3 flex items-center"
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
                                className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-sm p-6 border border-amber-100 text-center overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-amber-200 rounded-full opacity-50"></div>
                                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-36 h-36 bg-amber-200 rounded-full opacity-30"></div>

                                <div className="relative bg-white rounded-lg shadow-sm py-6 px-4">
                                    <p className="font-bold text-amber-600 text-lg tracking-wider">VOLUNTEER LAZIMU SUMATERA BARAT</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Struktur;