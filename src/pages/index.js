import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { useAtom } from 'jotai'; // Import useAtom
import { userAtom } from '@/atoms/authAtoms'; // Import userAtom
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
//import nextI18NextConfig from '../../next-i18next.config';



export default function Home() {
  const [user] = useAtom(userAtom); // Use userAtom
  const {t} = useTranslation('common');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {t('welcome')}
        </h1>

        <p className={styles.description}>
          {user ? (
            <>
              {t('loggedInMessage')} <Link href="/profile" className={styles.link}>profile</Link>.
            </>
          ) : (
            <>
              {t('please')} <Link href="/login" className={styles.link}>{t('login')}</Link> {t('or')} <Link href="/register" className={styles.link}>{t('register')}</Link> {t('toContinue')}
            </>
          )}
        </p>
      </main>
    </div>
  );
}

/*export async function getStaticProps({locale}){
  return{
    props:{
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}*/
export const getStaticProps = async ({ locale = 'en' }) => { // Définit 'en' comme valeur par défaut
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Charge les traductions pour le namespace 'common'
    },
  };
};
