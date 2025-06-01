import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;

  return (
    <main className='h-full'>
      <Navbar />
      <div> {/* Add AOS attribute */}
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default AppShell;