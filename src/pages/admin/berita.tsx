// pages/admin/berita.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Edit, Trash, PlusCircle } from 'lucide-react'; // Import ikon dari Lucide React
import Image from 'next/image';
import Sidebar from '@/components/SideBar';

interface NewsItem {
    id: string;
    title: string;
    description: string;
    image: string;
    created_at: string;
}

// Modal component for editing news
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (formData: any) => void; initialData: any; }> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [localFormData, setLocalFormData] = useState(initialData);

    useEffect(() => {
        setLocalFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalFormData({
            ...localFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(localFormData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black border border-neutral-500 text-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Edit Berita</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={localFormData.title}
                        onChange={handleChange}
                        placeholder="Judul Berita"
                        className="border p-2 w-full rounded-lg bg-neutral-900 border-neutral-700 text-white"
                        required
                    />
                    <textarea
                        name="description"
                        value={localFormData.description}
                        onChange={handleChange}
                        placeholder="Deskripsi Berita"
                        className="border p-2 w-full rounded-lg bg-neutral-900 border-neutral-700 text-white"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="image"
                        value={localFormData.image}
                        onChange={handleChange}
                        placeholder="URL Gambar"
                        className="border p-2 w-full rounded-lg bg-neutral-900 border-neutral-700 text-white"
                        required
                    />
                    <button type="submit" className="bg-black text-white border border-neutral-700 hover:bg-neutral-800 p-2 rounded-lg w-full">Update Berita</button>
                </form>
                <button onClick={onClose} className="mt-4 text-white border border-neutral-500 hover:bg-neutral-800 px-2 py-1 rounded-lg">Tutup</button>
            </div>
        </div>
    );
};

const AdminBerita: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [formData, setFormData] = useState<Pick<NewsItem, 'title' | 'description' | 'image'>>({
        title: '',
        description: '',
        image: ''
    });
    const [editId, setEditId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

    const fetchNews = async () => {
        const querySnapshot = await getDocs(collection(db, 'news'));
        const newsData: NewsItem[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<NewsItem, 'id'>
        }));
        setNews(newsData);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleAddNews = async () => {
        if (window.confirm('Apakah Anda yakin ingin menambahkan berita ini?')) {
            await addDoc(collection(db, 'news'), {
                ...formData,
                created_at: new Date().toISOString(),
            });
            setFormData({ title: '', description: '', image: '' });
            setNotification('Berita berhasil ditambahkan!');
            fetchNews();
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            const newsRef = doc(db, 'news', id);
            await deleteDoc(newsRef);
            setNotification('Berita berhasil dihapus!');
            fetchNews();
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleEdit = (item: NewsItem) => {
        setFormData({
            title: item.title,
            description: item.description,
            image: item.image
        });
        setEditId(item.id);
        setIsModalOpen(true);
    };

    const handleUpdate = async (data: any) => {
        if (editId) {
            const newsRef = doc(db, 'news', editId);
            await updateDoc(newsRef, {
                ...data,
                created_at: new Date().toISOString(),
            });
            setEditId(null);
            setNotification('Berita berhasil diperbarui!');
            fetchNews();
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} bg-black text-white`}>
                <h1 className="text-2xl font-semibold mb-4">Admin Berita</h1>
                {notification && <div className="bg-green-500 text-white p-2 rounded w-full text-center">{notification}</div>}
                <form onSubmit={(e) => { e.preventDefault(); handleAddNews(); }} className="bg-neutral-900 border border-neutral-700 p-6 rounded-lg shadow-md w-full space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Tambah Berita</h2>
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul Berita"
                        className="p-2 w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder:opacity-50"
                        required
                    />
                    <textarea
                        name="description"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Deskripsi Berita"
                        className="p-2 w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder:opacity-50"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="URL Gambar"
                        className="p-2 w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder:opacity-50"
                        required
                    />
                    <button type="submit" className="px-4 sm:px-6 py-2.5 sm:py-3 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base bg-white text-black hover:bg-neutral-200">
                        <PlusCircle size={20} />
                        Tambah Berita
                    </button>
                </form>

                <h2 className="text-xl font-semibold mt-8">Daftar Berita</h2>
                <div className="bg-neutral-900 border border-neutral-700 mt-4 rounded-lg shadow-md p-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {news.map((item, key) => (
                            <div key={key} className="border border-neutral-700 rounded-lg p-4 bg-neutral-800">
                                <h3 className="font-semibold text-white">{item.title}</h3>
                                <p className="text-neutral-400">{item.description}</p>
                                <Image src={item.image} alt={`News Image`} width={720} height={240} className="mt-2 rounded" />
                                <p className="text-sm text-neutral-500">{new Date(item.created_at).toLocaleString()}</p>

                                <div className="flex space-x-2 justify-end mt-4">
                                    <button onClick={() => handleEdit(item)} className="bg-neutral-700 hover:bg-neutral-600 text-neutral-400 border border-neutral-600 px-2 py-1 rounded">
                                        <Edit size={24} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="bg-neutral-700 hover:bg-red-600 text-neutral-400 border border-neutral-600 px-2 py-1 rounded">
                                        <Trash size={24} />
                                    </button>
                                   
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Modal for Editing */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleUpdate} initialData={formData} />
            </div>
        </div>
    );
};

export default AdminBerita;
