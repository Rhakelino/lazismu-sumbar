import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownItem = {
    href: string;
    label: string;
};

type DropdownMenus = {
    [key: string]: DropdownItem[];
};

const dropdownMenus: DropdownMenus = {
    "tentang": [
        { href: "/latar-belakang", label: "Latar Belakang" },
        { href: "/visi-misi", label: "Visi & Misi" },
        { href: "/struktur", label: "Struktur" },
        { href: "/laporan-keuangan", label: "Laporan Keuangan" },
    ],
    "info": [
        { href: "/berita", label: "Berita" },
        { href: "/artikel", label: "Artikel" },
        { href: "/video", label: "Video" },
    ],
};

interface MobileDropdownProps {
    dropdownKey: keyof typeof dropdownMenus;
    textColor: string; // Prop to set the text color
    children: React.ReactNode; // Label for the dropdown toggle
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
    dropdownKey,
    textColor,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex justify-between items-center w-full text-left font-medium py-2 text-${textColor} hover:text-orange-600 transition-colors`}
                aria-expanded={isOpen}
            >
                {children}
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 pl-4 space-y-1 border-l-2 border-orange-300"
                    >
                        {dropdownMenus[dropdownKey].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="block text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileDropdown;