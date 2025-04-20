import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import styles from '@/styles/AuthForms.module.css';
import { userAtom, authLoadingAtom } from '@/atoms/authAtoms';
import Link from 'next/link';
import { useTranslation } from 'next-i18next'; // Import useTranslation
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // Import serverSideTranslations

export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useAtom(authLoadingAtom);
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { t } = useTranslation('common'); // Initialize useTranslation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setUser({ authenticated: true });
        router.push('/profile');
      } else {
        const errorData = await response.json();
        console.error('Login échoué:', errorData);
        alert(t('loginFailed')); // Use translation for alert - generic failure message is better
      }
    } catch (error) {
      console.error('Erreur lors du login:', error);
      alert(t('loginError')); // Use translation for alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.formContainer}>
        <h1>{t('login')}</h1> {/* Use translation */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('email')}</label> {/* Use translation */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">{t('password')}</label> {/* Use translation */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {t('loginButton')} {/* Use translation */}
          </button>
        </form>
        <p className={styles.formFooter}>
          {t('noAccount')} <Link href="/register" className={styles.link}>{t('signUp')}</Link> {/* Use translation */}
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

/*export const getStaticProps = async ({locale}) => ({
  
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },

});*/

export const getStaticProps = async ({ locale = 'en' }) => { // Définit 'en' comme valeur par défaut
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Charge les traductions pour le namespace 'common'
    },
  };
};