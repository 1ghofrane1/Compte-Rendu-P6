import "@/styles/globals.css";
import Header from '@/components/Header';
import { Provider as JotaiProvider } from 'jotai';
import { appWithTranslation } from 'next-i18next'; // ImportappWithTranslation
import nextI18nConfig  from '../../next-i18next.config'; // Import config

function App({ Component, pageProps }) {
  return (
    <JotaiProvider>
      <Header />
      <Component {...pageProps} />;
    </JotaiProvider>
);
}
export default appWithTranslation(App, nextI18nConfig ); // WrapApp with appWithTranslation and pass config
