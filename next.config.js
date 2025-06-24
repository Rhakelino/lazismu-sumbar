/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "emchfippjpavibdpoppb.supabase.co"],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/google5ac9ab3f46a5fc30.html",
        destination: "/google5ac9ab3f46a5fc30.html",
      },
    ];
  },
};

module.exports = nextConfig;
