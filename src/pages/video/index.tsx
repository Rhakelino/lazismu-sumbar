import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import InstagramEmbed from '@/components/InstagramEmbed'
import HeroSection from '@/components/HeroSection'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

const Video = () => {
  return (
    <div className="max-w-full mx-auto">
      <HeroSection title="Vidio Profil"
        subtitle="Program donasi pilihan untuk kebaikan bersama"
        imageSrc="/images/logo-zis.png">
        <div className='pb-12 lg:mx-auto md:mx-4 mx-4'>
          <div className="flex justify-center">
            <video controls autoPlay className="w-full max-w-4xl rounded-lg shadow-lg">
              <source src="/vidio/profil-lazismu.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </HeroSection>

      <div className='max-w-6xl mx-auto'>
        <InstagramEmbed />
      </div>
    </div>
  )
}

export default Video
