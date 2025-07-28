import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchCharacters } from '../../api/api';
import { useSearch } from '../../context/search-context';
import { HomePage } from './home-page';

vi.mock('../../api/api', () => ({
  fetchCharacters: vi.fn(),
}));

const setSearchTermMock = vi.fn();

vi.mock('../../context/search-context', () => ({
  useSearch: vi.fn(),
}));

vi.mock('../../components/search/search', () => ({
  Search: () => <div data-testid="search-mock" />,
}));

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

vi.mock('../../components/pagination/pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <div data-testid="pagination-mock">
      <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  ),
}));

interface Card {
  id: number;
  name: string;
  status?: string;
  image?: string;
}

interface CardListProps {
  items: Card[];
  onCardClick: (id: number) => void;
}

vi.mock('../../components/card-list/card-list', () => ({
  CardList: ({ items, onCardClick }: CardListProps) => (
    <ul data-testid="card-list">
      {items.map((item) => (
        <li key={item.id} onClick={() => onCardClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  ),
}));

interface CharacterDetailsProps {
  id: string | null;
  onClose: () => void;
}

vi.mock('../../components/character-details/character-details', () => ({
  CharacterDetails: ({ id, onClose }: CharacterDetailsProps) => (
    <div data-testid="character-details">
      Details for {id}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (fetchCharacters as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [
        { id: 1, name: 'Rick', status: 'Alive', image: 'img1' },
        { id: 2, name: 'Morty', status: 'Alive', image: 'img2' },
      ],
      info: { pages: 3 },
    });

    (useSearch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      searchTerm: '',
      setSearchTerm: setSearchTermMock,
    });
  });

  it('renders title and Search component', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick and Morty Search/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-mock')).toBeInTheDocument();
  });

  it('fetches and displays characters', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Rick');
    expect(items[1]).toHaveTextContent('Morty');
  });

  it('handles pagination onPageChange', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith({ name: '', page: 2 });
    });
  });

  it('opens and closes CharacterDetails when detailsId is in URL', async () => {
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());

    expect(screen.getByTestId('character-details')).toHaveTextContent(
      'Details for 1'
    );

    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByTestId('character-details')).toBeNull();
    });
  });

  it('shows error message on fetch failure', async () => {
    (fetchCharacters as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('API Error')
    );

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());

    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
  });
});
