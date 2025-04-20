import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import styles from '@/styles/AuthForms.module.css';
import { authLoadingAtom } from '@/atoms/authAtoms';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useAtom(authLoadingAtom);
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert(t('registerSuccess'));
        router.push('/login');
      } else {
        const errorData = await response.json();
        console.error('Register failed:', errorData);

        if (response.status === 409) {
          alert(t('registerFailedEmailExists'));
        } else if (response.status === 400) {
          alert(t('registerInvalidInput'));
        } else {
          alert(t('registerFailedGeneric'));
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert(t('registerFailedGeneric'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.formContainer}>
        <h1>{t('register')}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {t('registerButton')}
          </button>
        </form>
        <p className={styles.formFooter}>
          {t('alreadyAccount')}{' '}
          <Link href="/login" className={styles.link}>
            {t('signIn')}
          </Link>
        </p>
      </main>
    </div>
  );
}
/*export const getStaticProps = async (context) => {
  const locale = context?.locale || 'fr'; // Default to 'fr' if locale is undefined
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};*/


//export const getStaticProps = async ({ locale }) => ({
//  props: {
//    ...(await serverSideTranslations(locale, ['common'])),
//  },
//});

export const getStaticProps = async ({ locale = 'en' }) => { // Définit 'en' comme valeur par défaut
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Charge les traductions pour le namespace 'common'
    },
  };
};
