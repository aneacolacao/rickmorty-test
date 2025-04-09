import { writeFile } from 'fs/promises';
import { getCharacters } from 'rickmortyapi';
import { Character } from '@/types/character';

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

  const db = {
    characters: allCharacters,
  };

  await writeFile('db.json', JSON.stringify(db, null, 2));
  console.log(`✅ Guardados ${allCharacters.length} personajes en db.json`);
}

fetchAllCharacters().catch((error) => {
  console.error('❌ Error al obtener personajes:', error);
});
