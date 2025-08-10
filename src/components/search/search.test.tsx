import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Search } from './search';

describe('Search', () => {
  const setSearchTermMock = vi.fn();
  const onSearchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders input and button', () => {
    render(
      <Search
        searchTerm=""
        setSearchTerm={setSearchTermMock}
        onSearch={onSearchMock}
      />
    );
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('initializes input value from searchTerm prop', () => {
    render(
      <Search
        searchTerm="test value"
        setSearchTerm={setSearchTermMock}
        onSearch={onSearchMock}
      />
    );
    expect(screen.getByPlaceholderText(/search.../i)).toHaveValue('test value');
  });

  it('updates input value on change', () => {
    render(
      <Search
        searchTerm=""
        setSearchTerm={setSearchTermMock}
        onSearch={onSearchMock}
      />
    );
    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');
  });

  it('calls setSearchTerm and onSearch with trimmed value on button click', () => {
    render(
      <Search
        searchTerm=""
        setSearchTerm={setSearchTermMock}
        onSearch={onSearchMock}
      />
    );

    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  search term  ' } });
    fireEvent.click(button);

    expect(setSearchTermMock).toHaveBeenCalledWith('search term');
    expect(onSearchMock).toHaveBeenCalledWith('search term');
  });

  it('calls setSearchTerm and onSearch with trimmed value on Enter key press', () => {
    render(
      <Search
        searchTerm=""
        setSearchTerm={setSearchTermMock}
        onSearch={onSearchMock}
      />
    );

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: '  enter term  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setSearchTermMock).toHaveBeenCalledWith('enter term');
    expect(onSearchMock).toHaveBeenCalledWith('enter term');
  });
});
