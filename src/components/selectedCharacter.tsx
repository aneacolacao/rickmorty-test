'use client';

import { useAppSelector } from '@/store/hooks';
import styles from '@/styles/charactersManagement.module.css';

const SelectedCharacter = () => {
  const character = useAppSelector((state) => state.selectedCharacter.selected);

  if (!character) return null;

  return (
    <div
      className={styles.selectedCharacter}
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className={styles.selCharacterLive}>
        <span
          className={`${styles.statusDot} ${
            character.status === 'Alive' ? styles.alive : styles.dead
          }`}
        ></span>
        <span>{`${character.status === 'Alive' ? 'VIVO' : 'MUERTO'}`}</span>
      </div>

      <div className={styles.selCharacteroverlay}>
        <div className={styles.selCharacternameSection}>
          <h2>{character.name}</h2>
          <div className={styles.selCharacterData}>
            <p>{character.species}</p>
            {character.type && <p>{character.type}</p>}
          </div>
        </div>

        <div className={styles.selCharacterinfoRow}>
          <div className={styles.selCharacterinfoBlock}>
            <span className={styles.selCharacterlabel}>Origin</span>
            <span>{character.origin.name}</span>
          </div>
          <div className={styles.selCharacterinfoBlock}>
            <span className={styles.selCharacterlabel}>Location</span>
            <span>{character.location.name}</span>
          </div>
          <div className={styles.selCharacterinfoBlock}>
            <span className={styles.selCharacterlabel}>Gender</span>
            <span>{character.gender}</span>
          </div>
          <div className={styles.selCharacterinfoBlock}>
            <span className={styles.selCharacterlabel}>Episodes</span>
            <span>{character.episode.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCharacter;
