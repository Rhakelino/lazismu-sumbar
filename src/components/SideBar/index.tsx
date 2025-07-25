import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void; }> = ({ isOpen, toggleSidebar }) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Optionally, redirect to login page or do other logout-related actions
        window.location.href = '/admin'; // Change this to your login route
    };

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-black border border-neutral-700 text-white transition-all ease-in-out duration-300 ${isOpen ? 'w-64 ' : 'w-20 '} shadow-lg`}
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
                        {['Berita', 'Pesan', 'Foto'].map((text, index) => (
                            <li key={index}>
                                <Link
                                    href={`/admin/${text.toLowerCase()}`}
                                    className={`block transition duration-200 rounded p-2 ${isOpen ? 'text-gray-300 hover:bg-neutral-800' : 'text-gray-500'}`}
                                >
                                    {isOpen && text}
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
    );
};

export default Sidebar;