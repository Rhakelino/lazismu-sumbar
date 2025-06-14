/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  images: {
  domains: [
      'picsum.photos',
      'emchfippjpavibdpoppb.supabase.co'
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

};
