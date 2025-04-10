'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/page.module.css';
import CharactersManagement from '@/components/charactersManagement';
import SelectedCharacter from '@/components/selectedCharacter';
import { useAppDispatch } from '@/store/hooks';
import { fetchCharacters } from '@/features/charactersSlice';
import { fetchFavorites } from '@/features/favoritesSlice';
import FavoritesTab from '@/components/favoriteTab';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchFavorites());
  }, [dispatch]);

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
          <SelectedCharacter />
          <CharactersManagement />
          <FavoritesTab />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
