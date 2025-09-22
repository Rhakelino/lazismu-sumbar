import React, { useEffect, useState } from 'react';
import { Edit, Trash, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Sidebar from '@/components/SideBar';
import supabase from '@/lib/db';
import { useRouter } from 'next/router';

interface PhotoItem {
    id: string;
    image: string;
    created_at: string;
}

const AdminFoto: React.FC = () => {
    const [news, setNews] = useState<PhotoItem[]>([]);
    const [formData, setFormData] = useState<Omit<PhotoItem, 'id' | 'created_at'>>({
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
            fetchPhotos();
        };
        checkUser();
    }, [router]);

    const fetchPhotos = async () => {
        const { data, error } = await supabase
            .from('album')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Gagal mengambil Foto:', error.message);
        } else {
            setNews(data || []);
        }
    };

    const handleAddNews = async () => {
        if (!formData.image) {
            setNotification('Silakan upload gambar terlebih dahulu.');
            return;
        }

        const { error } = await supabase.from('album').insert({ ...formData });

        if (error) {
            console.error('Gagal menambahkan Foto:', error.message);
            setNotification('Gagal menambahkan Foto.');
        } else {
            setNotification('Foto berhasil ditambahkan!');
            setFormData({ image: '' });
            fetchPhotos();
        }

        setTimeout(() => setNotification(null), 3000);
    };

    const handleDelete = async (item: PhotoItem) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus Foto ini?')) {
            try {
                // Extract the filename from the image URL
                const fileName = item.image.split('/').pop();

                // First, delete the file from storage
                if (fileName) {
                    const { error: storageError } = await supabase.storage
                        .from('photos')
                        .remove([fileName]);

                    if (storageError) {
                        console.error('Gagal menghapus file dari storage:', storageError.message);
                        setNotification('Gagal menghapus file dari storage.');
                        return;
                    }
                }

                // Then, delete the record from the database
                const { error: dbError } = await supabase
                    .from('album')
                    .delete()
                    .eq('id', item.id);

                if (dbError) {
                    console.error('Gagal menghapus Foto dari database:', dbError.message);
                    setNotification('Gagal menghapus Foto.');
                    return;
                }

                // If both storage and database deletions are successful
                setNotification('Foto berhasil dihapus!');
                fetchPhotos();
            } catch (error) {
                console.error('Error deleting photo:', error);
                setNotification('Terjadi kesalahan saat menghapus Foto.');
            }

            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleEdit = (item: PhotoItem) => {
        setFormData({
            image: item.image,
        });
        setEditId(item.id);
        setIsModalOpen(true);
    };

    const handleUpdate = async (data: { image: string }) => {
        if (editId) {
            try {
                // Cari item lama untuk mendapatkan URL gambar sebelumnya
                const { data: oldItem, error: fetchError } = await supabase
                    .from('album')
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
                            .from('photos')
                            .remove([oldFileName]);

                        if (storageDeleteError) {
                            console.error('Gagal menghapus foto lama:', storageDeleteError.message);
                        }
                    }
                }

                // Update data di database
                const { error: updateError } = await supabase
                    .from('album')
                    .update(data)
                    .eq('id', editId);

                if (updateError) {
                    console.error('Gagal memperbarui Foto:', updateError.message);
                    setNotification('Gagal memperbarui Foto.');
                    return;
                }

                // Proses berhasil
                setNotification('Foto berhasil diperbarui!');
                fetchPhotos();
                setEditId(null);
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error updating photo:', error);
                setNotification('Terjadi kesalahan saat memperbarui Foto.');
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
            .from('photos')
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            console.error('Gagal upload gambar:', uploadError.message);
            setNotification(`Gagal upload gambar: ${uploadError.message}`);
            return null;
        }

        const { data: publicUrlData } = supabase.storage
            .from('photos')
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
        <div className="min-h-screen bg-black text-white md:ml-20">
            {/* Mobile Header */}
           <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Main Content */}
            <div className="pt-20 px-4 pb-4">
                {notification && (
                    <div className="bg-green-500 text-white p-2 rounded text-center mb-4">
                        {notification}
                    </div>
                )}
                {/* Tambah Foto Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddNews();
                    }}
                    className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-md space-y-4"
                >
                    <h2 className="text-xl font-semibold mb-4">Tambah Foto</h2>
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
                        Tambah Foto
                    </button>
                </form>

                {/* Daftar Foto */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Daftar Foto</h2>
                <div className="space-y-4">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className="bg-neutral-900 border border-neutral-700 rounded-lg p-4"
                        >
                            <Image
                                src={item.image}
                                alt="Foto"
                                width={720}
                                height={240}
                                className="w-full rounded-lg mb-2 object-cover"
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
                                    onClick={() => handleDelete(item)}
                                    className="bg-neutral-700 hover:bg-red-600 text-neutral-400 p-2 rounded-lg"
                                >
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdate}
                    initialData={formData}
                />
            </div>
        </div>
    );
};

export default AdminFoto;

const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
    initialData: any;
}> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [localFormData, setLocalFormData] = useState<{
        image: string;
    }>(initialData);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        setLocalFormData(initialData);
        setSelectedFile(null);
    }, [initialData, isOpen]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Upload the new file to Supabase storage
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('photos')
                    .upload(fileName, file, { upsert: true });

                if (uploadError) {
                    console.error('Gagal upload gambar:', uploadError.message);
                    return;
                }

                const { data: publicUrlData } = supabase.storage
                    .from('photos')
                    .getPublicUrl(fileName);

                const newImageUrl = publicUrlData?.publicUrl;

                if (newImageUrl) {
                    // If there's an existing image, delete it from storage
                    if (localFormData.image) {
                        const oldFileName = localFormData.image.split('/').pop();
                        if (oldFileName) {
                            await supabase.storage
                                .from('photos')
                                .remove([oldFileName]);
                        }
                    }

                    // Update the form data with the new image URL
                    setLocalFormData((prev: { image: string }) => ({
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
                <h2 className="text-xl font-semibold mb-4">Edit Foto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Update Foto
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