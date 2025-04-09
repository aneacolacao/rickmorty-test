import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '@/types/character';

interface SelectedCharacterState {
  selected: Character | null;
}

const initialState: SelectedCharacterState = {
  selected: null,
};

const selectedCharacterSlice = createSlice({
  name: 'selectedCharacter',
  initialState,
  reducers: {
    setSelectedCharacter(state, action: PayloadAction<Character>) {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedCharacter } = selectedCharacterSlice.actions;
export default selectedCharacterSlice.reducer;
