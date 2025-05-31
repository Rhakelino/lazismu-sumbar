import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileDropdown from "../MobileDropdown"; // Pastikan path-nya sesuai
import DropdownTrigger from "../DropDownTrigger";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔁 Handle scroll background
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBgColor("white");
      setTextColor("black");
    } else {
      setBgColor("transparent");
      setTextColor("white");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ✅ Auto-close saat route berubah
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  // ✅ Auto-close saat klik di luar menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 bg-${bgColor}`}
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              className="rounded-md p-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-start ml-4 lg:ml-0">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center space-x-8">
            <Link
              href="/"
              className={`text-${textColor} font-semibold text-sm hover:text-orange-600 transition-colors`}
            >
              Beranda
            </Link>
            <DropdownTrigger dropdownKey="tentang" textColor={textColor}>
              Tentang Kami
            </DropdownTrigger>
            <Link
              href="/program"
              className={`text-${textColor} font-semibold text-sm hover:text-orange-600 transition-colors`}
            >
              Program
            </Link>
            <Link
              href="/contact"
              className={`text-${textColor} font-semibold text-sm hover:text-orange-600 transition-colors`}
            >
              Kontak Kami
            </Link>
            <DropdownTrigger dropdownKey="info" textColor={textColor}>
              Info
            </DropdownTrigger>
            <Link
              href="/rekening"
              className={`text-${textColor} font-semibold text-sm hover:text-orange-600 transition-colors`}
            >
              Daftar Rekening
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="ml-3 hidden lg:flex gap-4">
            {["instagram", "facebook", "youtube"].map((platform) => (
              <Link
                key={platform}
                href={`https://www.${platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                <i className={`fa-brands fa-${platform} text-2xl`}></i>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="flex flex-col bg-white px-4 py-4 space-y-2 shadow-lg rounded-b-lg">
              <Link
                href="/"
                className="text-gray-900 hover:text-orange-600 font-medium transition-colors py-2"
              >
                Beranda
              </Link>
              <MobileDropdown dropdownKey="tentang" textColor="gray-900">
                Tentang Kami
              </MobileDropdown>
              <Link
                href="/program"
                className="text-gray-900 hover:text-orange-600 font-medium transition-colors py-2"
              >
                Program
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-orange-600 font-medium transition-colors py-2"
              >
                Kontak Kami
              </Link>
              <MobileDropdown dropdownKey="info" textColor="gray-900">
                Info
              </MobileDropdown>
              <Link
                href="/rekening"
                className="text-gray-900 hover:text-orange-600 font-medium transition-colors py-2"
              >
                Daftar Rekening
              </Link>
              <div className="flex gap-3 py-2">
                {["instagram", "facebook", "youtube"].map((platform) => (
                  <Link
                    key={platform}
                    href={`https://www.${platform}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <i className={`fa-brands fa-${platform} text-2xl`}></i>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
