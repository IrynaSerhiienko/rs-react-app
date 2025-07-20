export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

export interface CardListProps {
  items: Character[];
}

export type CardProps = Pick<Character, 'name' | 'status' | 'image'>;

export interface MainState {
  loading: boolean;
  error: string | null;
  data: Character[];
}

export interface MainProps {
  loading: boolean;
  error: string | null;
  data: Character[];
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  // searchTerm: string;
  // onSearch: (term: string) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  throwError: boolean;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  data: Character[];
  searchTerm: string;
}
