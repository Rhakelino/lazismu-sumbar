import AppShell from '@/components/layouts/AppShell'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <script src="https://cdn.jsdelivr.net/npm/alpinejs" defer></script>
      <Component {...pageProps} />
    </AppShell>
  )

}
