import AppShell from '@/components/layouts/AppShell';
import '@/styles/globals.css';          // <- Import Tailwind dan custom style dulu
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';   

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

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
      <script src="https://cdn.jsdelivr.net/npm/alpinejs" defer></script>
      <Component {...pageProps} />
    </AppShell>
  );
}
