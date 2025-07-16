import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

// Konfigurasi SEO Default
const DEFAULT_SEO = {
  title: "LAZISMU - Berbagi Kebaikan, Membangun Harapan",
  description:
    "Platform donasi dan layanan kemanusiaan LAZISMU. Kami berkomitmen membantu masyarakat melalui program pendidikan, kesehatan, dan pemberdayaan ekonomi.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.lazismusumaterabarat.org",
    site_name: "LAZISMU SUMATERA BARAT",
    images: [
      {
        url: "https://www.websiteanda.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LAZISMU Open Graph Image",
      },
    ],
  },
  twitter: {
    handle: "@lazismu",
    site: "@lazismu",
    cardType: "summary_large_image",
  },
};

// Structured Data untuk Organisasi
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: "LAZISMU SUMATERA BARAT",
  description: "Platform donasi dan layanan kemanusiaan",
  url: "https://www.lazismusumaterabarat.org/",
  logo: "https://www.websiteanda.com/logo.png",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alamat Lengkap Anda",
    addressLocality: "Kota",
    postalCode: "Kode Pos",
    addressCountry: "ID",
  },
};

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

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return (
    <>
      {/* Global Head Configurations */}
      <Head>
        {/* Viewport untuk responsiveness */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Optimasi Performa */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Web App Capabilities */}
        <meta name="theme-color" content="#FF6B00" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Robots meta tag untuk kontrol SEO */}
        <meta name="robots" content="index, follow" />

        {/* Kata Kunci Tambahan */}
        <meta
          name="keywords"
          content="donasi, zakat, sedekah, lazismu, kemanusiaan, pendidikan, kesehatan, ekonomi"
        />

        <meta
          name="google-site-verification"
          content="eezmSu1gXKOKRykbbMTeNoQARrKs3fm_Q5cOdMbVWH8"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />

        {/* Performance dan Accessibility Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Default SEO Configuration */}
      <DefaultSeo {...DEFAULT_SEO} />

      <AppShell>
        {/* Spinner Tengah */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full border-t-2 border-b-2 border-orange-500 h-12 w-12"></div>
          </div>
        )}
        <Component {...pageProps} />
      </AppShell>
    </>
  );
}
