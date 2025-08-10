import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '../../store';
import { HomePage } from './home-page';

let pageValue = 1;
let currentSearchTerm = '';

const setPageMock = vi.fn((newPage) => {
  pageValue = newPage;
});
const setSearchTermMock = vi.fn((newTerm: string) => {
  currentSearchTerm = newTerm;
});

vi.mock('../../hooks/use-search-term-with-local-storage', () => ({
  useSearchTermWithLocalStorage: () => ({
    searchTerm: currentSearchTerm,
    setSearchTerm: setSearchTermMock,
  }),
}));

vi.mock('../../hooks/use-page-with-local-storage', () => ({
  usePageWithLocalStorage: () => ({
    get page() {
      return pageValue;
    },
    setPage: setPageMock,
  }),
}));

vi.mock('../../store/api/characters-api', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../store/api/characters-api')>();
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
  };
});
import { useGetCharactersQuery } from '../../store/api/characters-api';

vi.mock('../../components/search/search', () => ({
  Search: () => <div data-testid="search-mock" />,
}));

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

vi.mock('../../components/pagination/pagination', () => ({
  Pagination: (({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <div data-testid="pagination-mock">
      <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  )) as FC<PaginationProps>,
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
  CardList: (({ items, onCardClick }: CardListProps) => (
    <ul data-testid="card-list">
      {items.map((item) => (
        <li key={item.id} onClick={() => onCardClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  )) as FC<CardListProps>,
}));

// interface CharacterDetailsProps {
//   id: string | null;
//   onClose: () => void;
// }

vi.mock('../../components/character-details/character-details', () => {
  return {
    __esModule: true,
    default: ({ id, onClose }: { id: string | null; onClose: () => void }) => (
      <div data-testid="character-details">
        Details for {id}
        <button onClick={onClose}>Close</button>
      </div>
    ),
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pageValue = 1;
    currentSearchTerm = '';

    (
      useGetCharactersQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: {
        results: [
          { id: 1, name: 'Rick', status: 'Alive', image: 'img1' },
          { id: 2, name: 'Morty', status: 'Alive', image: 'img2' },
        ],
        info: { pages: 3 },
      },
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it('renders title and Search component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Rick and Morty Search/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-mock')).toBeInTheDocument();
  });

  it('fetches and displays characters', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(useGetCharactersQuery).toHaveBeenCalled());

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Rick');
    expect(items[1]).toHaveTextContent('Morty');
  });

  it('handles pagination onPageChange', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(useGetCharactersQuery).toHaveBeenCalled());

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => expect(setPageMock).toHaveBeenCalledWith(2));
  });

  it('opens and closes CharacterDetails when detailsId is in URL', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(useGetCharactersQuery).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.getByTestId('character-details')).toHaveTextContent(
        'Details for 1'
      );
    });

    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByTestId('character-details')).toBeNull();
    });
  });

  it('shows error message on fetch failure', async () => {
    (
      useGetCharactersQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValueOnce({
      data: undefined,
      error: new Error('API Error'),
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(useGetCharactersQuery).toHaveBeenCalled());

    expect(screen.getByText(/Error... API Error!/i)).toBeInTheDocument();
  });

  it('does not render CharacterDetails when detailsId is missing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('character-details')).toBeNull();
  });

  it('renders CharacterDetails when detailsId is present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=5']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('character-details')).toHaveTextContent(
      'Details for 5'
    );
  });

  it('resets page to 1 when searchTerm changes and current page is not 1', async () => {
    pageValue = 2;
    currentSearchTerm = 'initial';

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    currentSearchTerm = 'newTerm';
    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(setPageMock).toHaveBeenCalledWith(1);
    });
  });
});
