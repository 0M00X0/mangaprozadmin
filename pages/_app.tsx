import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import i18n, { changeLanguage } from '@/lib/i18n';

type AppProps = {
  Component: React.ComponentType<{ changeLanguage: (lng: string) => void }>,
  pageProps: { session: any },
};

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const language = savedLanguage || 'en';
    i18n.changeLanguage(language);
  }, []);


  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} changeLanguage={changeLanguage} />
    </SessionProvider>
  )
}

export default appWithTranslation(App);
