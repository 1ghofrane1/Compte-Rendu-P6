import React from 'react';
import Link from 'next/link';
import styles from '@/components/Header.module.css';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/authAtoms';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';


const Header = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      Cookies.remove('authToken');
      router.push('/');
    } catch (error) {
      console.error(t('logoutError'), error);
      alert(t('logoutGenericError'));
    }
  };

  const changeLanguage = (lng) => { 
    i18n.changeLanguage(lng); // Function to change language 
  };
  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          {t('authDemo')}
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              {t('home')}
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile" className={styles.navLink}>
                  {t('profile')}
                </Link>
              </li>
              <li>
                <button onClick={logout} className={styles.logoutButton}>
                  {t('logout')}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className={styles.navLink}>
                  {t('login')}
                </Link>
              </li>
              <li>
                <Link href="/register" className={styles.navLink}>
                  {t('register')}
                </Link>
              </li>
            </>
          )}
          <li>
          <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)} 
              className={styles.languageSwitcher} 
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
