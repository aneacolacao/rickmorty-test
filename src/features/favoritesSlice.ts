// src/features/favorites/favoritesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Character } from '@/types/character';
import type { RootState } from '@/store';

export const fetchFavorites = createAsyncThunk('favorites/fetch', async () => {
  const res = await fetch('http://localhost:3001/favorites');
  return await res.json();
});

export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async (character: Character, { getState }) => {
    const state = getState() as RootState;
    const exists = state.favorites.favorites.find((fav: Character) => fav.id === character.id);

    if (exists) {
      await fetch(`http://localhost:3001/favorites/${character.id}`, {
        method: 'DELETE',
      });
      return character.id;
    } else {
      const res = await fetch('http://localhost:3001/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character),
      });
      return await res.json();
    }
  }
);

interface FavoritesState {
  favorites: Character[];
  loading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (typeof action.payload === 'number' || typeof action.payload === 'string') {
          state.favorites = state.favorites.filter(fav => String(fav.id) !== String(action.payload));
        } else {
          //Check favorite character isn't duplicated
          const exists = state.favorites.find(fav => fav.id === action.payload.id);
          if (!exists) {
            state.favorites.push(action.payload);
          }
        }
      });
  },
});

export default favoritesSlice.reducer;