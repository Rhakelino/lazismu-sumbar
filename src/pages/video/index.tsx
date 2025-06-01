import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import InstagramEmbed from '@/components/InstagramEmbed'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

const Video = () => {
  return (
    <div className="max-w-full mx-auto">
      <div className="relative bg-gradient-to-br from-yellow-400 to-orange-600 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Image src="/images/logo-zis.png" width={100} height={100} alt="Logo ZIS" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-yellow-400">Vidio</span>
            </h1>
            <p className="text-base text-blue-100 max-w-2xl mx-auto">
              vidio Profil Lazismu Sumatera Barat
            </p>
          </div>
        </motion.div>
        <div className='pb-12 lg:mx-auto md:mx-4 mx-4'>
          <div className="flex justify-center">
            <video controls className="w-full max-w-4xl rounded-lg shadow-lg">
              <source src="/vidio/profil-lazismu.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className='max-w-6xl mx-auto'>
        <InstagramEmbed />
      </div>
    </div>
  )
}

export default Video
