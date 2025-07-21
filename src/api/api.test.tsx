import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchCharacters } from './api';

describe('fetchCharacters', () => {
  const baseUrl = 'https://rickandmortyapi.com/api/character/?page=1&name=';
  const searchTerm1 = 'rick';
  const searchTerm2 = '  morty  ';
  const trimmedTerm2 = 'morty';
  const errorStatus = 500;

  const mockData1 = {
    results: [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'rick.jpg' },
    ],
  };

  const mockDataEmpty = { results: [] };

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

    const result = await fetchCharacters(searchTerm1);

    expect(fetch).toHaveBeenCalledWith(baseUrl + searchTerm1);
    expect(result).toEqual(mockData1);
  });

  it('trims the search term before calling fetch', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockDataEmpty,
    });

    await fetchCharacters(searchTerm2);

    expect(fetch).toHaveBeenCalledWith(baseUrl + trimmedTerm2);
  });

  it('throws error when response is not ok', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: errorStatus,
    });

    await expect(fetchCharacters(searchTerm1)).rejects.toThrow(
      `API error: ${errorStatus}`
    );
  });
});
