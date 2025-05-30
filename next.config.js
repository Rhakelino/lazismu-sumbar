/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  images: {
    domains: ['picsum.photos'], // Tambahkan hostname yang ingin Anda izinkan
  },
};
