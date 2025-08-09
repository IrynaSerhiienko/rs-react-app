import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CHARACTERS_API } from '../../data/app-data';
import type { Character } from '../../types/types';

interface FetchCharactersParams {
  name?: string;
  page: number;
}

export const charactersApi = createApi({
  reducerPath: CHARACTERS_API.REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: CHARACTERS_API.BASE_URL,
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { results: Character[]; info: { pages: number } },
      FetchCharactersParams
    >({
      query: ({
        name = CHARACTERS_API.DEFAULT_NAME,
        page = CHARACTERS_API.DEFAULT_PAGE,
      }) => {
        const searchParams = new URLSearchParams();
        searchParams.set('page', String(page));
        if (name.trim()) {
          searchParams.set('name', name.trim());
        }
        const url = `${CHARACTERS_API.PATH_CHARACTER}/?${searchParams.toString()}`;
        return url;
      },
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => {
        const url = `${CHARACTERS_API.PATH_CHARACTER}/${id}`;

        return url;
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  charactersApi;
