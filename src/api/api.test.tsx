import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchCharacterById } from './api';
import { fetchCharacters } from './api';

describe('fetchCharacters', () => {
  const baseUrl = 'https://rickandmortyapi.com/api/character/?';
  const searchTerm1 = 'rick';
  const searchTerm2 = '  morty  ';
  const trimmedTerm2 = 'morty';
  const errorStatus = 500;

  const mockData1 = {
    results: [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'rick.jpg' },
    ],
    info: { pages: 3 },
  };

  const mockDataEmpty = {
    results: [],
    info: { pages: 1 },
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls fetch with correct URL and returns data on success', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockData1,
    });

    const result = await fetchCharacters({ name: searchTerm1, page: 1 });

    expect(fetch).toHaveBeenCalledWith(
      `${baseUrl}page=1&name=${encodeURIComponent(searchTerm1)}`
    );
    expect(result).toEqual(mockData1);
  });

  it('trims the search term before calling fetch', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockDataEmpty,
    });

    await fetchCharacters({ name: searchTerm2, page: 1 });

    expect(fetch).toHaveBeenCalledWith(
      `${baseUrl}page=1&name=${encodeURIComponent(trimmedTerm2)}`
    );
  });

  it('sets only page param when name is empty', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockDataEmpty,
    });

    await fetchCharacters({ page: 2 });

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}page=2`);
  });

  it('returns empty results and one page on 404', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchCharacters({ name: 'nonexistent', page: 1 });

    expect(result).toEqual({ results: [], info: { pages: 1 } });
  });

  it('throws error when response is not ok and not 404', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: errorStatus,
    });

    await expect(
      fetchCharacters({ name: searchTerm1, page: 1 })
    ).rejects.toThrow(`API error: ${errorStatus}`);
  });
});

describe('fetchCharacterById', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    image: 'rick.jpg',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    episode: [],
    url: '',
    created: '',
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches character by ID successfully', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockCharacter,
    });

    const result = await fetchCharacterById(1);

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
    expect(result).toEqual(mockCharacter);
  });

  it('throws an error if fetch fails (not ok)', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
    });

    await expect(fetchCharacterById(999)).rejects.toThrow(
      'Failed to fetch character details'
    );
  });
});
