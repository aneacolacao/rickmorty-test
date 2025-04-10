import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Character } from '@/types/character';

interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
  searchTerm: '',
};

// Thunk para obtener personajes
export const fetchCharacters = createAsyncThunk<Character[], void, { rejectValue: string }>(
  'characters/fetchCharacters',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/characters');
      if (!response.ok) {
        return thunkAPI.rejectWithValue(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      let message = 'Error desconocido';
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error desconocido';
      });
  },
});

export const { setSearchTerm } = charactersSlice.actions;
export default charactersSlice.reducer;
