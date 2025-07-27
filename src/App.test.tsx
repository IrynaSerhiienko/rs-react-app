import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as api from './api/api';
import App from './app';

describe('App component', () => {
  const fetchCharactersMock = vi.spyOn(api, 'fetchCharacters');

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders Header, Search and ErrorBoundary with Main', () => {
    render(<App />);
    expect(screen.getByText(/rick and morty search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls handleSearch on mount if localStorage has searchTerm', async () => {
    const term = 'rick';
    localStorage.setItem('searchTerm', term);

    fetchCharactersMock.mockResolvedValue({
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'rick.jpg' },
      ],
    });

    render(<App />);

    await waitFor(() => {
      expect(fetchCharactersMock).toHaveBeenCalledWith(term);
    });

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('updates data after search triggered by Search component', async () => {
    fetchCharactersMock.mockResolvedValue({
      results: [
        { id: 2, name: 'Morty Smith', status: 'Alive', image: 'morty.jpg' },
      ],
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'morty');
    await userEvent.click(button);

    await waitFor(() => {
      expect(fetchCharactersMock).toHaveBeenCalledWith('morty');
    });

    expect(await screen.findByText('Morty Smith')).toBeInTheDocument();

    expect(localStorage.getItem('searchTerm')).toBe('morty');
  });

  it('handles fetchCharacters error and shows error message', async () => {
    fetchCharactersMock.mockRejectedValue(new Error('API failure'));

    render(<App />);

    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'fail');
    await userEvent.click(button);

    expect(await screen.findByText('API failure')).toBeInTheDocument();
  });
  it('handles non-Error rejection and shows default error message', async () => {
    fetchCharactersMock.mockRejectedValue('unexpected error'); // не-Error

    render(<App />);

    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'fail');
    await userEvent.click(button);

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
