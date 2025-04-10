import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/features/favoritesSlice';
import FavoritesTab from '@/components/favoriteTab';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: '',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
  type: '',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  episode: [],
};

test('Show message if no favorites', () => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: { favorites: [], loading: false },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <FavoritesTab />
    </Provider>
  );

  fireEvent.click(getByText('FAVS'));

  expect(getByText(/No hay personajes favoritos aún/i)).toBeInTheDocument();
});

test('Render favorites if data exists', () => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: { favorites: [mockCharacter], loading: false },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <FavoritesTab />
    </Provider>
  );

  fireEvent.click(getByText('FAVS'));

  expect(getByText(/Rick Sanchez/i)).toBeInTheDocument();
});
