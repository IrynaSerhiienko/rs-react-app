import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Search } from './search';

const setSearchTermMock = vi.fn();

let mockedSearchTerm = '';

vi.mock('../../context/search-context.tsx', () => ({
  useSearch: () => ({
    get searchTerm() {
      return mockedSearchTerm;
    },
    setSearchTerm: setSearchTermMock,
  }),
}));

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockedSearchTerm = '';
  });

  it('renders input and button', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('initializes input value from localStorage', () => {
    mockedSearchTerm = 'test value';
    localStorage.setItem('searchTerm', 'test value');
    render(<Search />);
    expect(screen.getByPlaceholderText(/search.../i)).toHaveValue('test value');
  });

  it('updates input value on change', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');
  });

  it('calls setSearchTerm and updates localStorage on button click', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(button);

    expect(setSearchTermMock).toHaveBeenCalledWith('search term');
    expect(localStorage.getItem('searchTerm')).toBe('search term');
  });

  it('calls setSearchTerm and updates localStorage on Enter key press', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search.../i);

    fireEvent.change(input, { target: { value: 'enter term' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setSearchTermMock).toHaveBeenCalledWith('enter term');
    expect(localStorage.getItem('searchTerm')).toBe('enter term');
  });

  it('trims the input value before setting search term and localStorage', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  spaced term  ' } });
    fireEvent.click(button);

    expect(setSearchTermMock).toHaveBeenCalledWith('spaced term');
    expect(localStorage.getItem('searchTerm')).toBe('spaced term');
  });
});
