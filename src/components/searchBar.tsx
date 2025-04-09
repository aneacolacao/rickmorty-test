'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm } from '@/features/charactersSlice';
import styles from '@/styles/charactersManagement.module.css';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.characters.searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className={styles.charactersSearch}>
      <svg
        className={styles.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className={styles.searchInput}
        type="text"
        value={searchTerm}
        placeholder="Find your character..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
