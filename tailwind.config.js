/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^bg-(orange|amber|emerald|indigo|cyan|violet|green)-(50|100|200|500|600)$/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /^text-(orange|amber|emerald|indigo|cyan|violet|green)-(500|600)$/,
      variants: ['hover', 'focus'],
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}