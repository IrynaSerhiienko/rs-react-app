'use server';

import { Character } from '../types/types';

export async function generateCSV(items: Character[]): Promise<string> {
  if (!items.length) return '';

  const headers = Object.keys(items[0]) as (keyof Character)[];
  const rows = items.map((item) =>
    headers
      .map((key) => `"${String(item[key] ?? '').replace(/"/g, '""')}"`)
      .join(';')
  );

  const csvContent = [headers.join(';'), ...rows].join('\r\n');
  const bom = '\uFEFF';

  return bom + csvContent;
}
