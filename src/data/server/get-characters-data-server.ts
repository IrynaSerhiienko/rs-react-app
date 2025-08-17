import type { Character } from '../../types/types';
import { CHARACTERS_API } from '../app-data';

interface FetchCharactersParams {
  name?: string;
  page?: number;
}

export async function getCharactersDataServer({
  name = CHARACTERS_API.DEFAULT_NAME,
  page = CHARACTERS_API.DEFAULT_PAGE,
}: FetchCharactersParams) {
  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  if (name.trim()) {
    searchParams.set('name', name.trim());
  }

  const url = `${CHARACTERS_API.BASE_URL}${CHARACTERS_API.PATH_CHARACTER}/?${searchParams.toString()}`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }

  return res.json() as Promise<{
    results: Character[];
    info: { pages: number };
  }>;
}
