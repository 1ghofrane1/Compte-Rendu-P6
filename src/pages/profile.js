import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import styles from '@/styles/Profile.module.css';
import { userAtom } from '@/atoms/authAtoms';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProfilePage = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>{t('loginRedirect')}...</p>; // Ensure this translation exists in your JSON files
  }

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>{t('profilePageTitle')}</h1>
        <p>{t('profileWelcome')}</p>
        {/* Display user profile details here */}
      </main>
    </div>
  );
};

// Use getServerSideProps for SSR and i18n
/*export const getStaticProps = async (context) => {
  const locale = context?.locale || 'fr'; // Default to 'fr' if locale is undefined
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};*/

/*
export const getServerSideProps = async({locale}) => ({
  props:{
    ...(await serverSideTranslations(locale, ['common'])),
  },});
*/

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])), // Load translations for 'common' namespace
    },
  };
};

export default ProfilePage;