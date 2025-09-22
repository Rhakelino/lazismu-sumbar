import React, { useEffect, useState } from 'react';
import { Edit, Trash, PlusCircle, Menu } from 'lucide-react';
import Image from 'next/image';
import Sidebar from '@/components/SideBar';
import supabase from '@/lib/db';
import { useRouter } from 'next/router';


interface NewsItem {
    id: string;
    title: string;
    description: string;
    image: string;
    created_at: string;
}

const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
    initialData: any;
}> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [localFormData, setLocalFormData] = useState(initialData);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        setLocalFormData(initialData);
        setSelectedFile(null);
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalFormData({
            ...localFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Upload the new file to Supabase storage
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('news-images')
                    .upload(fileName, file, { upsert: true });

                if (uploadError) {
                    console.error('Gagal upload gambar:', uploadError.message);
                    return;
                }

                const { data: publicUrlData } = supabase.storage
                    .from('news-images')
                    .getPublicUrl(fileName);

                const newImageUrl = publicUrlData?.publicUrl;

                if (newImageUrl) {
                    // Update the form data with the new image URL
                    setLocalFormData((prev: any) => ({
                        ...prev,
                        image: newImageUrl
                    }));
                    setSelectedFile(file);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(localFormData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-black border border-neutral-500 text-white p-5 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Berita</h2>
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
                    />
                    <div className="flex flex-col items-center">
                        {localFormData.image && (
                            <Image
                                src={localFormData.image}
                                alt="Preview"
                                width={200}
                                height={200}
                                className="mb-4 rounded"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="p-2 w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!localFormData.image}
                        className="bg-white text-black hover:bg-gray-200 p-2 rounded-lg w-full font-semibold disabled:opacity-50"
                    >
                        Update Berita
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 text-white border border-neutral-500 hover:bg-neutral-800 px-2 py-1 rounded-lg"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

const AdminBerita: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [formData, setFormData] = useState<Omit<NewsItem, 'id' | 'created_at'>>({
        title: '',
        description: '',
        image: '',
    });
    const [editId, setEditId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin'); // Redirect to your login page
                return;
            }
            fetchNews();
        };
        checkUser();
    }, [router]);

    const fetchNews = async () => {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Gagal mengambil berita:', error.message);
        } else {
            setNews(data || []);
        }
    };

    const handleAddNews = async () => {
        if (!formData.image) {
            setNotification('Silakan upload gambar terlebih dahulu.');
            return;
        }

        const { error } = await supabase.from('news').insert({ ...formData });

        if (error) {
            console.error('Gagal menambahkan berita:', error.message);
            setNotification('Gagal menambahkan berita.');
        } else {
            setNotification('Berita berhasil ditambahkan!');
            setFormData({ title: '', description: '', image: '' });
            fetchNews();
        }

        setTimeout(() => setNotification(null), 3000);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            try {
                // Cari item yang akan dihapus untuk mendapatkan URL gambar
                const { data: newsItem, error: fetchError } = await supabase
                    .from('news')
                    .select('image')
                    .eq('id', id)
                    .single();

                if (fetchError) {
                    console.error('Gagal mengambil data berita:', fetchError.message);
                    setNotification('Gagal mengambil data berita.');
                    return;
                }

                // Ekstrak nama file dari URL gambar
                if (newsItem?.image) {
                    const fileName = newsItem.image.split('/').pop();

                    if (fileName) {
                        // Hapus file dari storage
                        const { error: storageError } = await supabase.storage
                            .from('news-images')
                            .remove([fileName]);

                        if (storageError) {
                            console.error('Gagal menghapus file dari storage:', storageError.message);
                            setNotification('Gagal menghapus file dari storage.');
                            return;
                        }
                    }
                }

                // Hapus data dari database
                const { error: deleteError } = await supabase
                    .from('news')
                    .delete()
                    .eq('id', id);

                if (deleteError) {
                    console.error('Gagal menghapus berita:', deleteError.message);
                    setNotification('Gagal menghapus berita.');
                    return;
                }

                // Refresh daftar berita
                fetchNews();

                // Tampilkan notifikasi
                setNotification('Berita berhasil dihapus!');
            } catch (error) {
                console.error('Error saat menghapus berita:', error);
                setNotification('Terjadi kesalahan saat menghapus berita.');
            } finally {
                // Sembunyikan notifikasi setelah 3 detik
                setTimeout(() => setNotification(null), 3000);
            }
        }
    };

    const handleEdit = (item: NewsItem) => {
        setFormData({
            title: item.title,
            description: item.description,
            image: item.image,
        });
        setEditId(item.id);
        setIsModalOpen(true);
    };

    const handleUpdate = async (data: {
        title: string,
        description: string,
        image: string
    }) => {
        if (editId) {
            try {
                // Cari item lama untuk mendapatkan URL gambar sebelumnya
                const { data: oldItem, error: fetchError } = await supabase
                    .from('news')
                    .select('image')
                    .eq('id', editId)
                    .single();

                if (fetchError) {
                    console.error('Gagal mengambil data lama:', fetchError.message);
                    setNotification('Gagal mengambil data lama.');
                    return;
                }

                // Hapus foto lama dari storage jika ada
                if (oldItem?.image) {
                    const oldFileName = oldItem.image.split('/').pop();
                    if (oldFileName) {
                        const { error: storageDeleteError } = await supabase.storage
                            .from('news-images')
                            .remove([oldFileName]);

                        if (storageDeleteError) {
                            console.error('Gagal menghapus foto lama:', storageDeleteError.message);
                        }
                    }
                }

                // Update data di database
                const { error: updateError } = await supabase
                    .from('news')
                    .update(data)
                    .eq('id', editId);

                if (updateError) {
                    console.error('Gagal memperbarui Berita:', updateError.message);
                    setNotification('Gagal memperbarui Berita.');
                    return;
                }

                // Proses berhasil
                setNotification('Berita berhasil diperbarui!');
                fetchNews();
                setEditId(null);
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error updating news:', error);
                setNotification('Terjadi kesalahan saat memperbarui Berita.');
            } finally {
                setTimeout(() => setNotification(null), 3000);
            }
        }
    };


    const handleImageUpload = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
            .from('news-images')
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            console.error('Gagal upload gambar:', uploadError.message);
            setNotification(`Gagal upload gambar: ${uploadError.message}`);
            return null;
        }

        const { data: publicUrlData } = supabase.storage
            .from('news-images')
            .getPublicUrl(filePath);

        return publicUrlData?.publicUrl ?? null;
    };

    const formatTanggal = (created_at: string) => {
        if (!created_at) return '-';
        const date = new Date(created_at);
        return date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Mobile Header */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            {/* Main Content */}
            <div className="pt-20 px-4 pb-4">
                {notification && (
                    <div className="bg-green-500 text-white p-2 rounded text-center mb-4">
                        {notification}
                    </div>
                )}

                {/* Tambah Berita Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddNews();
                    }}
                    className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-md space-y-4"
                >
                    <h2 className="text-xl font-semibold mb-4">Tambah Berita</h2>

                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul Berita"
                        className="p-2 w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                        required
                    />
                    <textarea
                        name="description"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Deskripsi Berita"
                        className="p-2 w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white h-32"
                        required
                    />
                    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const url = await handleImageUpload(file);
                                if (url) {
                                    setFormData((prev) => ({ ...prev, image: url }));
                                    setNotification('Gambar berhasil diupload!');
                                    setTimeout(() => setNotification(null), 3000);
                                }
                            }}
                            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-neutral-700 file:text-white hover:file:bg-neutral-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-medium rounded-lg flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200"
                    >
                        <PlusCircle size={20} />
                        Tambah Berita
                    </button>
                </form>

                {/* Daftar Berita */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Daftar Berita</h2>
                <div className="space-y-4">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className="bg-neutral-900 border border-neutral-700 rounded-lg p-4"
                        >
                            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-neutral-400 mb-2">
                                {item.description.length > 100
                                    ? item.description.slice(0, 100) + '...'
                                    : item.description}
                            </p>
                            <Image
                                src={item.image}
                                alt="News"
                                width={720}
                                height={240}
                                className="w-full rounded-lg mb-2"
                            />
                            <p className="text-sm text-neutral-500 mb-2">
                                {formatTanggal(item.created_at)}
                            </p>
                            <div className="flex space-x-2 justify-end">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-neutral-700 hover:bg-neutral-600 text-neutral-400 p-2 rounded-lg"
                                >
                                    <Edit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-neutral-700 hover:bg-red-600 text-neutral-400 p-2 rounded-lg"
                                >
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                initialData={formData}
            />
        </div>
    );
};

export default AdminBerita;