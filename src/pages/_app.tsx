import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Progress Bar Configuration
NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

// Default SEO Configuration
const DEFAULT_SEO = {
  title: "LAZISMU Sumatera Barat - Zakat & Donasi Kemanusiaan di Padang",
  description:
    "LAZISMU Sumatera Barat melayani donasi zakat, infak, sedekah, dan program kemanusiaan di Padang dan sekitarnya. Lembaga zakat terpercaya dan amanah.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.lazismusumaterabarat.org",
    site_name: "LAZISMU Sumatera Barat",
    images: [
      {
        url: "https://www.websiteanda.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LAZISMU Sumbar Open Graph",
      },
    ],
  },
  twitter: {
    handle: "@lazismu",
    site: "@lazismu",
    cardType: "summary_large_image",
  },
};

// Structured Data JSON-LD
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: "LAZISMU Sumatera Barat",
  description:
    "Platform donasi, zakat, dan program kemanusiaan di wilayah Padang dan Sumatera Barat.",
  url: "https://www.lazismusumaterabarat.org/",
  logo: "https://www.websiteanda.com/logo.png",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Bundo Kanduang No.1, Padang",
    addressLocality: "Padang",
    postalCode: "25119",
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
      <Head>
        {/* Meta Umum */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#FF6B00" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="lazismu, lazismu sumatera barat, lazismu padang, lazismu sumbar, lazismusumaterabarat, zakat padang, donasi kemanusiaan sumbar"
        />
        <meta
          name="google-site-verification"
          content="eezmSu1gXKOKRykbbMTeNoQARrKs3fm_Q5cOdMbVWH8"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Font Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="canonical" href="https://www.lazismusumaterabarat.org" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
      </Head>

      {/* Default SEO */}
      <DefaultSeo {...DEFAULT_SEO} />

      <AppShell>
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
