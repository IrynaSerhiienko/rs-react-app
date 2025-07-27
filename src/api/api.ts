import type { Character } from '../types/types';

export async function fetchCharacters(
  name: string = ''
): Promise<{ results: Character[] }> {
  const search = name.trim();
  const baseUrl = `https://rickandmortyapi.com/api/character/?page=1`;
  const url = search
    ? `${baseUrl}&name=${encodeURIComponent(search)}`
    : baseUrl;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();

  return data;
}
