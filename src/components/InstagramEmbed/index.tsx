import React, { useEffect } from 'react';

const InstagramEmbed = () => {
  useEffect(() => {
    // Memuat skrip Instagram setelah komponen dimounting
    const script = document.createElement('script');
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div className='md:mt-12 mb-12 px-4 border'>
      {/* Tombol Instagram (mobile only) */}
      <div className="flex justify-center mt-8 md:hidden">
        <a
          href="https://www.instagram.com/lazismusumaterabarat/"
          className="neumorphic-btn bg-white py-2 px-6 rounded-full text-orange-500 flex items-center space-x-2 text-sm font-medium"
        >
          <div className="instagram-gradient">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"
              />
            </svg>
          </div>
          <span>Lihat Semua Konten Instagram</span>
        </a>
      </div>

      {/* Card Instagram Embed */}
      <div className="shadow-lg md:mt-8 duration-300 overflow-hidden flex flex-col items-center gap-4">
        <div className="pt-4 -mt-4 w-full">
            {/* Instagram Embed */}
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/lazismusumaterabarat/"
              data-instgrm-version="14"
              style={{ width: '100%', minHeight: '300px' }}
            />
          </div>
        </div>
      </div>
  );
};

export default InstagramEmbed;
