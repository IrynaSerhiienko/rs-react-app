import type { Character } from '../types/types';

interface FetchCharactersParams {
  name?: string;
  page?: number;
}

export async function fetchCharacters(
  params: FetchCharactersParams = {}
): Promise<{ results: Character[]; info: { pages: number } }> {
  const { name = '', page = 1 } = params;

  const searchParams = new URLSearchParams();

  searchParams.set('page', String(page));

  if (name.trim()) {
    searchParams.set('name', name.trim());
  }

  const url = `https://rickandmortyapi.com/api/character/?${searchParams.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      return { results: [], info: { pages: 1 } };
    }
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch character details');
  }

  return res.json();
}
