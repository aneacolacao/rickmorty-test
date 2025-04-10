'use client';

import Image from 'next/image';
import type { Character } from '@/types/character';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedCharacter } from '@/features/selectedCharacterSlice';
import { toggleFavorite } from '@/features/favoritesSlice';
import styles from '@/styles/charactersManagement.module.css';

type CharacterCardProps = {
  character: Character;
};

const CharacterCard = ({ character }: CharacterCardProps) => {
  const isFavorite = useAppSelector((state) =>
    state.favorites.favorites.some((fav) => fav.id === character.id)
  );

  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.selectedCharacter.selected);
  const isSelected = selected?.id === character.id;
  return (
    <div
      className={`${styles.noSelectedCard} ${isSelected ? styles.selectedCard : ''}`}
      onClick={() => dispatch(setSelectedCharacter(character))}
    >
      <h2>{character.name}</h2>
      <Image src={character.image} alt={character.name} width={100} height={100} />
      <button
        onClick={async (e) => {
          e.stopPropagation();
          await dispatch(toggleFavorite(character));
        }}
        className={styles.favoriteButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          fill="currentColor"
          viewBox="0 0 16 16"
          className={isFavorite ? styles.favHeart : styles.heart}
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
        </svg>
        <p>Like</p>
      </button>
    </div>
  );
};

export default CharacterCard;
