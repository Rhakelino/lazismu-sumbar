import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

// Loading Spinner Component


type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate loading time for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Simulate a loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out-cubic',
    });
  }, []);
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