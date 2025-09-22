import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import Sidebar from '@/components/SideBar';
import supabase from '@/lib/db';
import { IMessage } from '@/types/messages';
import { useRouter } from 'next/router';

const AdminPesan: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Sidebar state
    const [notification, setNotification] = useState<string | null>(null); // Notification state
    const router = useRouter();


     useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin'); // Redirect to your login page
                return; 
            }
            fetchMessages();
        };
        checkUser();
    }, [router]);

    // Fetch messages from the database
    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('messages')
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
                .from('messages')
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
        <div className="min-h-screen bg-black text-white md:ml-20">
    {/* Mobile Header */}
   <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

    {/* Main Content */}
    <div className="pt-20 px-4 pb-4">
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
            <div className="space-y-4">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-white">{message.nama_lengkap}</h3>
                            <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => deleteMessage(message.id)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                        
                        <div className="text-neutral-400">
                            <p className="text-sm">Email: {message.email}</p>
                            <p className="text-sm">Subjek: {message.subjek}</p>
                        </div>

                        <p className="text-neutral-300 bg-neutral-800 p-2 rounded">
                            {message.pesan}
                        </p>

                        <div className="text-neutral-500 text-xs">
                            {new Date(message.created_at).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-neutral-500">Tidak ada pesan.</p>
        )}
    </div>
</div>
    );
};

export default AdminPesan;
