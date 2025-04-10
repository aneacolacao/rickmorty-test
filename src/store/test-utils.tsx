import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import charactersReducer from '@/features/charactersSlice';
import favoritesReducer from '@/features/favoritesSlice';
import selectedCharacterReducer from '@/features/selectedCharacterSlice';
import type { RootState } from '@/store';

export function renderWithStore(
  ui: ReactElement,
  preloadedState?: Partial<RootState>
) {
  const store = configureStore({
    reducer: {
      characters: charactersReducer,
      favorites: favoritesReducer,
      selectedCharacter: selectedCharacterReducer,
    },

    preloadedState: preloadedState as RootState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
