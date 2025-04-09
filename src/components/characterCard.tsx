'use client';

import Image from 'next/image';
import type { Character } from '@/types/character';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedCharacter } from '@/features/selectedCharacterSlice';
import styles from '@/styles/charactersManagement.module.css';

type CharacterCardProps = {
  character: Character;
};

const CharacterCard = ({ character }: CharacterCardProps) => {
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
    </div>
  );
};

export default CharacterCard;
