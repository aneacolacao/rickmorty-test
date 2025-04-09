'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCharacters } from '@/features/charactersSlice';
import { setSelectedCharacter } from '@/features/selectedCharacterSlice';
import CharacterCard from '@/components/characterCard';
import styles from '@/styles/charactersManagement.module.css';

const CharactersManagement = () => {

  // Scrollbar
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };

  //Characters list
  const dispatch = useAppDispatch();
  const { characters, loading, error} = useAppSelector(
    (state) => state.characters
  );
  const selected = useAppSelector((state) => state.selectedCharacter.selected);

  //Preselect first character in the initial pageload
  useEffect(() => {
    if (!selected && characters.length > 0) {
      dispatch(setSelectedCharacter(characters[0]));
    }
  }, [characters, selected, dispatch]);

  //Get characters
  useEffect(() => {
    if (!characters || characters.length === 0) {
      dispatch(fetchCharacters());
    }
  }, [characters, dispatch]);

  const searchTerm = useAppSelector((state) => state.characters.searchTerm);
  const charactersToShow = searchTerm
    ? characters.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : characters;

  return (
    <div className={styles.charactersManagement}>
      <div className={styles.charactersSearch}>

      </div>
      
        <button onClick={() => scrollBy(-100)} className={styles.scrollButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-icon"
          >
            <path d="M6 14 L12 8 L18 14" />
          </svg>
        </button>
        <div 
          ref={scrollRef}
          className={`${styles.charactersImageList} ${styles.scrollContent}`}
        >
          {error && <p>Error: {error}</p>}
          {charactersToShow.map((char) => {
            return (
              <div
              key={char.id}
              className={styles.characterCard}
              >
                <CharacterCard character={char} />
              </div>
            );
          })}
          {loading && <p className={styles.loadingText}>Cargando más personajes...</p>}
        </div>
        <button onClick={() => scrollBy(100)} className={styles.scrollButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-icon"
          >
            <path d="M6 10 L12 16 L18 10" />
          </svg>
        </button>
      
    </div>
  );
};

export default CharactersManagement;
