import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import Sidebar from '@/components/SideBar';
import supabase from '@/lib/db';
import { IMessage } from '@/types/messages';

const AdminPesan: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Sidebar state
    const [notification, setNotification] = useState<string | null>(null); // Notification state

    // Fetch messages from the database
    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('message')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error.message);
            setNotification('Failed to load messages.');
        } else {
            console.log('Fetched messages:', data);
            setMessages(data || []);
        }

        setLoading(false);  // Set loading state to false once done
    };

    // Function to handle message deletion
    const deleteMessage = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            const { error } = await supabase
                .from('message')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting message:', error.message);
                setNotification('Failed to delete the message.');
            } else {
                setNotification('Message deleted successfully.');
                fetchMessages();  // Refresh the messages list after deletion
            }

            // Clear the notification after 3 seconds
            setTimeout(() => setNotification(null), 3000);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen"> {/* Ensure the container takes the full height of the screen */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div
                className={`flex-1 h-full p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} bg-black text-white`}
            >
                <h1 className="text-2xl font-semibold mb-8">Pesan Masuk</h1>

                {/* Display notification if exists */}
                {notification && (
                    <div className="bg-green-500 text-white p-3 rounded mb-4">
                        {notification}
                    </div>
                )}

                {/* Display loading state */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary"></div>
                    </div>
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
                                        <td className="px-4 py-2">
                                            {new Date(message.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => deleteMessage(message.id)}
                                            >
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
