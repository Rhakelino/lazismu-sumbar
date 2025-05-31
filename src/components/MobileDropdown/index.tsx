import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type DropdownItem = {
  href: string;
  label: string;
};

type DropdownMenus = {
  [key: string]: DropdownItem[];
};

const dropdownMenus: DropdownMenus = {
  tentang: [
    { href: "/latar-belakang", label: "Latar Belakang" },
    { href: "/visi-misi", label: "Visi & Misi" },
    { href: "/struktur", label: "Struktur" },
    { href: "/laporan-keuangan", label: "Laporan Keuangan" },
  ],
  info: [
    { href: "/berita", label: "Berita" },
    { href: "/artikel", label: "Artikel" },
    { href: "/video", label: "Video" },
  ],
};

interface MobileDropdownProps {
  dropdownKey: keyof typeof dropdownMenus;
  textColor: string;
  children: React.ReactNode;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
  dropdownKey,
  textColor,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 🔄 Tutup dropdown saat berpindah halaman
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between items-center w-full text-left font-medium py-2 text-${textColor} hover:text-orange-600 transition-colors`}
        aria-expanded={isOpen}
      >
        {children}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 pl-4 space-y-1 border-l-2 border-orange-300">
          {dropdownMenus[dropdownKey].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;
