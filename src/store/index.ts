import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '@/features/charactersSlice';
import selectedCharacterReducer from '@/features/selectedCharacterSlice';
import favoritesReducer from '@/features/favoritesSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedCharacter: selectedCharacterReducer,
    favorites: favoritesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
