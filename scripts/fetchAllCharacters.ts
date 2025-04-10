import { readFile, writeFile } from 'fs/promises';
import { getCharacters } from 'rickmortyapi';
import { Character } from '@/types/character';

interface DBStructure {
  characters: Character[];
  favorites: Character[];
  [key: string]: unknown;
}

async function fetchAllCharacters() {
  let allCharacters: Character[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await getCharacters({ page });
    const results = response.data.results;
    if (!results || results.length === 0) {
      hasMore = false;
    } else {
      allCharacters = allCharacters.concat(results);
      page++;
    }
  }

  let currentDb: DBStructure = { characters: [], favorites: [] };

  try {
    const existingData = await readFile('db.json', 'utf-8');
    currentDb = JSON.parse(existingData);
  } catch {
    console.warn('⚠️ No se pudo leer db.json actual. Se creará uno nuevo.');
  }

  if (!Array.isArray(currentDb.favorites)) {
    currentDb.favorites = [];
  }

  const updatedDb = {
    ...currentDb,
    characters: allCharacters,
  };

  await writeFile('db.json', JSON.stringify(updatedDb, null, 2));
  console.log(`✅ Guardados ${allCharacters.length} personajes y conservados favoritos`);
}

fetchAllCharacters().catch((error) => {
  console.error('❌ Error al obtener personajes:', error);
});
