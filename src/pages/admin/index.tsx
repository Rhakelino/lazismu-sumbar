import supabase from '@/lib/db';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("lah lu siapa bjir");
    } else {
      setSuccess(true);
      console.log('Login berhasil:', data);
      if (data?.user) {
        // Misalnya, setelah login berhasil, arahkan ke halaman admin
        setTimeout(() => {
          setSuccess(true);
          // Redirect to the admin dashboard after 3 seconds
          window.location.href = '/admin/berita'; // Ganti dengan URL dashboard Anda
        }, 3000); // Delay of 3 seconds
      }


    }
  };

  return (
    <div className="flex min-h-screen justify-center flex-col items-center w-full border border-black">
      <h2 className="text-2xl font-bold mb-4">Login Admin</h2>
      <form onSubmit={handleSignIn} className="space-y-4 w-full px-4 lg:w-1/2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Masukkan email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Masukkan password"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className='flex gap-2'>
          <div className="text-green-500 text-sm">Halo Ganteng!</div>
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-orange-500 h-4 w-4"></div>
        </div>}
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
