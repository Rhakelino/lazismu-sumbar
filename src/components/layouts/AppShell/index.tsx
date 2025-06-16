import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const router = useRouter();

  // Cek jika halaman yang aktif adalah halaman admin atau donasi-form
  const isAdminPage = router.pathname.includes('/admin');
  const isDonasiForm = router.pathname.includes('/donasi-form');
  
  // Hide both on either admin or donasi-form pages
  const hideNavAndFooter = isAdminPage || isDonasiForm;

  return (
    <main className='h-full'>
      {/* Menyembunyikan Navbar pada halaman admin dan donasi-form */}
      {!hideNavAndFooter && <Navbar />}
      <div>
        {children}
      </div>  
      {!hideNavAndFooter && <Footer />}
    </main>
  );
};

export default AppShell;