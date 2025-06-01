import Image from 'next/image';  
import React from 'react';  
import { motion } from 'framer-motion';  
import { Phone, MessageCircle, Mail, MapPin, Camera, Ambulance, BadgeInfo } from 'lucide-react';

const fadeUp = {  
    initial: { opacity: 0, y: 40 },  
    animate: { opacity: 1, y: 0 },  
};  

const fadeRight = {  
    initial: { opacity: 0, x: -40 },  
    animate: { opacity: 1, x: 0 },  
};  

const Kontak = () => {  
    return (  
        <div>  
            {/* Header Section */}  
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 overflow-hidden">  
                <div className="absolute inset-0 bg-black opacity-10"></div>  
                <motion.div  
                    variants={fadeUp}  
                    initial="initial"  
                    whileInView="animate"  
                    transition={{ duration: 0.8 }}  
                    viewport={{ once: true, amount: 0.3 }}  
                    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"  
                >  
                    <div className="text-center">  
                        <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">  
                            <Image src="/images/logo-zis.png" width={100} height={100} alt="Logo ZIS" />  
                        </div>  
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">  
                            <span className="bg-clip-text text-transparent bg-yellow-400">Kontak Kami</span>  
                        </h1>  
                        <p className="text-base text-blue-100 max-w-2xl mx-auto">  
                            Program donasi pilihan untuk kebaikan bersama  
                        </p>  
                    </div>  
                </motion.div>  
            </div>  

            {/* Struktur Organisasi */}  
            <div className='max-w-6xl mx-auto px-4 py-16 space-y-16'>  
                <div>   
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">  
                        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">  
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">  
                                 <Phone className="h-5 w-5 mr-2 text-orange-500" /> 
                                Tentang LAZISMU Sumatera Barat  
                            </h2>  

                            <div className="space-y-4 text-gray-600">  
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
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">  
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />  
                                        </svg>  
                                    </a>  
                                    <a href="https://www.instagram.com/lazismusumaterabarat/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">  
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">  
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />  
                                        </svg>  
                                    </a>  
                                    <a href="https://www.twitter.com/lazismusumbar" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">  
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">  
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />  
                                        </svg>  
                                    </a>  
                                    <a href="https://www.youtube.com/lazismusumbar" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">  
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">  
                                            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />  
                                        </svg>  
                                    </a>  
                                </div>  
                                <span className="ml-4 text-sm text-gray-500">Ikuti kami di sosial media</span>  
                            </div>  
                        </div>  
                        <div className="bg-white rounded-lg shadow-sm p-6 border h-full border-gray-100 mb-8 max-w-xl mx-auto">  
                            <h2 className="text-lg font-bold text-gray-800 mb-6 gap-4 flex items-center">  
                                <BadgeInfo className="w-10 h-10 text-orange-500"/>
                                Informasi Kontak  
                            </h2>  

                            <div className="space-y-6">  
                                <div className="flex items-center">  
                                    <div className="flex-shrink-0 bg-orange-50 rounded-full p-3 w-14 h-14 flex items-center justify-center">  
                                     <Ambulance className="w-10 h-10 text-orange-500"/>
                                    </div>  
                                    <div className="ml-5 flex-grow">  
                                        <h3 className="text-base font-semibold text-gray-800">Layanan Ambulans Gratis</h3>  
                                        <p className="text-gray-600 mt-1">0823 8746 2887 (Pak Nal)</p>  
                                    </div>  
                                </div>  

                                <div className="flex items-center">  
                                    <div className="flex-shrink-0 bg-orange-50 rounded-full p-3 w-14 h-14 flex items-center justify-center">  
                                         <Phone className="h-10 w-10 text-orange-500" />
                                    </div>  
                                    <div className="ml-5 flex-grow">  
                                        <h3 className="text-base font-semibold text-gray-800">Whatsapp Kantor</h3>  
                                        <p className="text-gray-600 mt-1">0823 9170 7227</p>  
                                    </div>  
                                </div>  

                                <div className="flex items-center">  
                                    <div className="flex-shrink-0 bg-orange-50 rounded-full p-3 w-14 h-14 flex items-center justify-center">  
                                        <Camera className="h-10 w-10 text-orange-500"/> 
                                    </div>  
                                    <div className="ml-5 flex-grow"><h3 className="text-base font-semibold text-gray-800">Media Lazismu</h3>
                                        <p className="text-gray-600 mt-1">0821 6212 8403</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-orange-50 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                                        <Mail className="h-10 w-10 text-orange-500"/>
                                    </div>
                                    <div className="ml-5 flex-grow">
                                        <h3 className="text-base font-semibold text-gray-800">Email</h3>
                                        <p className="text-gray-600 mt-1 break-all">lazismusumaterabarat@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-orange-500"/>
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
                </div>
            </div>
        </div>
    );
}

export default Kontak;