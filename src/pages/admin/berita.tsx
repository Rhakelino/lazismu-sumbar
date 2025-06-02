import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Edit Berita</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={localFormData.title}
                        onChange={handleChange}
                        placeholder="Judul Berita"
                        className="border p-2 w-full rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={localFormData.description}
                        onChange={handleChange}
                        placeholder="Deskripsi Berita"
                        className="border p-2 w-full rounded"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="image"
                        value={localFormData.image}
                        onChange={handleChange}
                        placeholder="URL Gambar"
                        className="border p-2 w-full rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Update Berita</button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500">Tutup</button>
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

    return (
        <div className="flex flex-col items-center max-w-6xl mx-auto px-4 py-16 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Admin Berita</h1>
            
            {notification && <div className="bg-green-500 text-white p-2 rounded w-full text-center">{notification}</div>}

            <form onSubmit={(e) => { e.preventDefault(); handleAddNews(); }} className="bg-white p-6 rounded-lg shadow-md w-full space-y-4">
                <h2 className="text-xl font-semibold mb-4">Tambah Berita</h2>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Judul Berita"
                    className="border p-2 w-full rounded"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Deskripsi Berita"
                    className="border p-2 w-full rounded"
                    required
                ></textarea>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL Gambar"
                    className="border p-2 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Tambah Berita</button>
            </form>

            <h2 className="text-xl font-semibold mt-8">Daftar Berita</h2>
            <div className="bg-white mt-4 rounded-lg shadow-md p-4 w-full">
                <ul className="space-y-4">
                    {news.map((item) => (
                        <li key={item.id} className="border-b pb-4 flex justify-between items-center">
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p>{item.description}</p>
                                <img src={item.image} alt={`News Image`} className="mt-2 w-48 rounded" />
                                <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal for Editing */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleUpdate} initialData={formData} />
        </div>
    );
};

export default AdminBerita;