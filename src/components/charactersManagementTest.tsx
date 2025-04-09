'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function CharactersManagement() {
  const state = useSelector((state: RootState) => state);

  return (
    <div>
      <h2>Test de estado</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
