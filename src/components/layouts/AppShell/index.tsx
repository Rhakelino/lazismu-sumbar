import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const router = useRouter();

  // Cek jika halaman yang aktif adalah halaman admin
  const isAdminPage = router.pathname.includes('/admin');

  return (
    <main className='h-full'>
      {/* Menyembunyikan Navbar hanya pada halaman admin */}
      {!isAdminPage && <Navbar />}
      
      <div>
        {children}
      </div>  
      {!isAdminPage && <Footer />}
    </main>
  );
};

export default AppShell;
