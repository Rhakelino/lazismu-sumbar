import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void; }> = ({ isOpen, toggleSidebar }) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/admin';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const menuItems = [
        { text: 'Berita', href: '/admin/berita' },
        { text: 'Pesan', href: '/admin/pesan' },
        { text: 'Foto', href: '/admin/foto' },
        { text: 'Himpunan', href: '/admin/admin-dashboard' }
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-black z-50 p-4 flex justify-between items-center">
                <button 
                    onClick={toggleMobileMenu}
                    className="text-white"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h1 className="text-xl font-semibold">Admin Panel</h1>
                <div>{/* Placeholder for potential right-side actions */}</div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-80 z-40"
                    onClick={toggleMobileMenu}
                >
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-neutral-900 rounded-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav>
                            <ul className="space-y-4">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={toggleMobileMenu}
                                            className="block text-white text-center py-3 hover:bg-neutral-800 rounded-md transition"
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-600 hover:bg-red-500 text-white rounded p-3 transition duration-200"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div
                ref={sidebarRef}
                className={`hidden md:block fixed top-0 left-0 h-full bg-black border border-neutral-700 text-white transition-all ease-in-out duration-300 ${isOpen ? 'w-64' : 'w-20'} shadow-lg z-50`}
            >
                <div className="p-4 flex flex-col h-full">
                    <button
                        onClick={toggleSidebar}
                        className="text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 mb-4 ml-auto transition duration-200"
                    >
                        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                    </button>

                    <h2 className={`text-xl font-semibold mb-6 ${isOpen ? 'block' : 'hidden'}`}>Admin Panel</h2>
                    <nav className="flex-1">
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className={`block transition duration-200 rounded p-2 ${isOpen ? 'text-gray-300 hover:bg-neutral-800' : 'text-gray-500'}`}
                                    >
                                        {isOpen && item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button
                        onClick={handleLogout}
                        className={`mt-auto bg-red-600 hover:bg-red-500 text-white rounded p-2 transition duration-200 ${isOpen ? 'block' : 'hidden'}`}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;