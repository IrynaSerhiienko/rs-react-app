import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Character } from '../types/types';
import { createCSVBlob } from './download-csv';

interface MockBlob {
  text(): Promise<string>;
}

function mockBlob(parts: string[]): MockBlob {
  const content = parts.join('');
  return {
    text: () => Promise.resolve(content),
  };
}

describe('createCSVBlob', () => {
  beforeEach(() => {
    vi.stubGlobal('Blob', mockBlob as unknown as typeof Blob);
  });

  it('returns null if items array is empty', () => {
    const result = createCSVBlob([]);
    expect(result).toBeNull();
  });

  it('creates a Blob with correct CSV content for one item', async () => {
    const items: Character[] = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        species: 'Human',
        gender: 'Male',
      },
    ];

    const blob = createCSVBlob(items);
    expect(blob).toBeDefined();

    if (!blob) throw new Error('Blob is null');

    const text = await blob.text();

    expect(text.startsWith('\uFEFF')).toBe(true);
    expect(text).toContain('id;name;status;image;species;gender');
    expect(text).toContain(
      '"1";"Rick Sanchez";"Alive";"https://rickandmortyapi.com/api/character/avatar/1.jpeg";"Human";"Male"'
    );
  });

  it('escapes double quotes in values correctly', async () => {
    const items: Character[] = [
      {
        id: 2,
        name: 'Test "Quote"',
        status: 'Alive',
        image: '',
        species: 'Alien',
        gender: 'Male',
      },
    ];

    const blob = createCSVBlob(items);
    expect(blob).toBeDefined();

    if (!blob) throw new Error('Blob is null');

    const text = await blob.text();

    expect(text).toContain('"Test ""Quote"""');
  });
});
