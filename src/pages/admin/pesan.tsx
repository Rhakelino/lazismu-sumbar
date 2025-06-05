import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; // Adjust the import based on your project structure
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Trash } from 'lucide-react';
import Sidebar from '@/components/SideBar';

interface Message {
    id: string;
    email: string;
    nama_lengkap: string;
    subjek: string;
    created_at: string;
    pesan: string;
}

const AdminPesan: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
    const [notification, setNotification] = useState<string | null>(null); // Notification state

    const fetchMessages = async () => {
        setLoading(true);
        const msgsCollection = collection(db, 'pesan'); // Adjust collection name if needed
        const querySnapshot = await getDocs(msgsCollection);
        const msgData: Message[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<Message, 'id'>
        }));
        setMessages(msgData);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            const messageRef = doc(db, 'pesan', id);
            await deleteDoc(messageRef);
            setNotification('Pesan berhasil dihapus!'); // Set notification message
            fetchMessages();
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex'>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 h-full p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} bg-black text-white`}>
                <h1 className="text-2xl font-semibold mb-8">Pesan Masuk</h1>
                {/* Display notification if exists */}
                {notification && (
                    <div className="bg-green-500 text-white p-3 rounded mb-4">
                        {notification}
                    </div>
                )}
                
                {loading ? (
                    <p>Loading messages...</p>
                ) : messages.length > 0 ? (
                    <div className="bg-black text-white rounded-lg shadow-md border border-neutral-700">
                        <table className="min-w-full divide-y divide-neutral-700">
                            <thead className="bg-black">
                                <tr>
                                    <th className="px-4 py-2 text-left">Nama Lengkap</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Subjek</th>
                                    <th className="px-4 py-2 text-left">Pesan</th>
                                    <th className="px-4 py-2 text-left">Tanggal Dikirim</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700">
                                {messages.map((message) => (
                                    <tr key={message.id}>
                                        <td className="px-4 py-2">{message.nama_lengkap}</td>
                                        <td className="px-4 py-2">{message.email}</td>
                                        <td className="px-4 py-2">{message.subjek}</td>
                                        <td className="px-4 py-2">{message.pesan}</td>
                                        <td className="px-4 py-2">{new Date(message.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-2">
                                            <button onClick={() => handleDelete(message.id)} className="text-red-600 hover:text-red-800">
                                                <Trash size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPesan;