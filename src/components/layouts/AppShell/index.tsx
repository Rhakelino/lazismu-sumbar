import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full border-t-2 border-b-2 border-orange-500 h-12 w-12"></div>
  </div>
);

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
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once 
    });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

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