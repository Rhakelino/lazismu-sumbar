import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
        { href: "/foto", label: "Foto" },
        { href: "/video", label: "Video" },
    ],
};

interface DropdownTriggerProps {
    children: React.ReactNode;
    dropdownKey: keyof typeof dropdownMenus;
    textColor: string; // Expecting the text color here
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
    children,
    dropdownKey,
    textColor,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center text-${textColor} font-semibold text-sm hover:text-orange-600 transition-colors`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {children}
                <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
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
                        className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
                    >
                        <div className="py-1">
                            {dropdownMenus[dropdownKey].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownTrigger;