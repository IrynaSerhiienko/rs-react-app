import { THEMES } from '../data/app-data';
export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species?: string;
  gender?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  throwError: boolean;
}

export type Theme = (typeof THEMES)[keyof typeof THEMES];
