import AppShell from '@/components/layouts/AppShell';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
      setIsLoading(true);
    };

    const handleStop = () => {
      NProgress.done();
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return (
    <AppShell>
      {/* Spinner Tengah */}
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-orange-500 h-12 w-12"></div>
        </div>
      )}

      <script src="https://cdn.jsdelivr.net/npm/alpinejs" defer></script>
      <Component {...pageProps} />
    </AppShell>
  );
}
