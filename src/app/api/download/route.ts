import { NextResponse } from 'next/server';

import { Character } from '../../../types/types';
import { generateCSV } from '../../actions';

export async function POST(req: Request) {
  const items: Character[] = await req.json();
  const csv = await generateCSV(items);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="items.csv"`,
    },
  });
}
