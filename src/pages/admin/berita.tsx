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

const AdminBerita: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [formData, setFormData] = useState<Pick<NewsItem, 'title' | 'description' | 'image'>>({
        title: '',
        description: '',
        image: ''
    });
    const [editId, setEditId] = useState<string | null>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editId) {
            const newsRef = doc(db, 'news', editId);
            await updateDoc(newsRef, { 
                ...formData,
                created_at: new Date().toISOString(),
            });
            setEditId(null);
        } else {
            await addDoc(collection(db, 'news'), { 
                ...formData,
                created_at: new Date().toISOString(),
            });
        }
        setFormData({ title: '', description: '', image: '' });
        fetchNews(); 
    };

    const handleEdit = (item: NewsItem) => {
        setFormData({
            title: item.title,
            description: item.description,
            image: item.image
        });
        setEditId(item.id); 
    };

    const handleDelete = async (id: string) => {
        const newsRef = doc(db, 'news', id);
        await deleteDoc(newsRef);
        fetchNews(); 
    };

    return (
        <div className="flex flex-col items-center max-w-6xl mx-auto px-4 py-16 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Admin Berita</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editId ? 'Edit Berita' : 'Tambah Berita'}</h2>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Judul Berita"
                    className="border p-2 w-full rounded"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Deskripsi Berita"
                    className="border p-2 w-full rounded"
                    required
                ></textarea>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="URL Gambar"
                    className="border p-2 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    {editId ? 'Update Berita' : 'Tambah Berita'}
                </button>
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
        </div>
    );
};

export default AdminBerita;