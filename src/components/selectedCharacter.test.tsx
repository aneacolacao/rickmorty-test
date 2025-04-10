import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import SelectedCharacter from '@/components/selectedCharacter';
import selectedCharacterReducer from '@/features/selectedCharacterSlice';

// Personaje de prueba
const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
  type: '',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  episode: [],
};

test('Show data of selected character', () => {
  const store = configureStore({
    reducer: {
      selectedCharacter: selectedCharacterReducer,
    },
    preloadedState: {
      selectedCharacter: { selected: mockCharacter },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <SelectedCharacter />
    </Provider>
  );

  expect(getByText(/Rick Sanchez/)).toBeInTheDocument();
  expect(getByText(/Human/)).toBeInTheDocument();
});
