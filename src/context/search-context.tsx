import { createContext, useContext } from 'react';

export type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
