'use client';

import Image from 'next/image';
import styles from './page.module.css';

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

        <div className={styles.charactersContainer}></div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
