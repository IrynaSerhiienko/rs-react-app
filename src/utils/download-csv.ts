import type { Character } from '../types/types';

export function createCSVBlob(items: Character[]): Blob | null {
  if (!items.length) return null;

  const headers = Object.keys(items[0]) as (keyof Character)[];
  const rows = items.map((item) =>
    headers
      .map((key) => `"${String(item[key] ?? '').replace(/"/g, '""')}"`)
      .join(';')
  );

  const csvContent = [headers.join(';'), ...rows].join('\r\n');
  const bom = '\uFEFF';

  return new Blob([bom + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
}
