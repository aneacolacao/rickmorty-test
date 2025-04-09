'use client';

import Image from 'next/image';
import styles from '@/styles/page.module.css';
import CharactersManagement from '@/components/charactersManagement';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/rm_logo.svg"
            alt="Rick & Morty logo"
            width={200}
            height={0}
            style={{ height: 'auto' }}
            priority
          />
        </div>

        <div className={styles.charactersContainer}>
          <CharactersManagement />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
