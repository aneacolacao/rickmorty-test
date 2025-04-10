import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import CharacterCard from '@/components/characterCard';
import { configureStore } from '@reduxjs/toolkit';
import selectedCharacterReducer from '@/features/selectedCharacterSlice';
import favoritesReducer from '@/features/favoritesSlice';

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

test('Show border green if character is selected', () => {
  const store = configureStore({
    reducer: {
      selectedCharacter: selectedCharacterReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      selectedCharacter: { selected: mockCharacter },
      favorites: { favorites: [], loading: false },
    },
  });

  const { container } = render(
    <Provider store={store}>
      <CharacterCard character={mockCharacter} />
    </Provider>
  );

  const cardDiv = container.querySelector('div');
  expect(cardDiv?.className).toMatch(/selectedCard/);
});

test('show red heart if character is favorite', () => {
  const store = configureStore({
    reducer: {
      selectedCharacter: selectedCharacterReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      selectedCharacter: { selected: null },
      favorites: { favorites: [mockCharacter], loading: false },
    },
  });

  const { container } = render(
    <Provider store={store}>
      <CharacterCard character={mockCharacter} />
    </Provider>
  );

  const heartIcon = container.querySelector('svg');
  expect(heartIcon?.className.baseVal).toMatch(/favHeart/);
});
