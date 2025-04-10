'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFavorites } from '@/features/favoritesSlice';
import { toggleFavorite } from '@/features/favoritesSlice';
import styles from '@/styles/favoritesTab.module.css';

const FavoritesTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={styles.favsContainer}>
      <div className={`${styles.favsTab} ${isOpen ? styles.open : ''}`} onClick={toggleOpen}>
        <span className={styles.favsLabel}>FAVS</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {favorites.length === 0 ? (
            <p className={styles.noFavs}>No hay personajes favoritos aún.</p>
          ) : (
            favorites.map((char) => (
              <div key={char.id} className={styles.favItem}>
                {char.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavorite(char));
                  }}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesTab;
