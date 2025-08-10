import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGetCharacterByIdQuery } from '../../store/api/characters-api';
import { getErrorMessage } from '../../utils/get-error-message';
import CharacterDetails from './character-details';

vi.mock('../../store/api/characters-api', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

const characterMock = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'rick.jpg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
};

describe('CharacterDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading initially', () => {
    (
      useGetCharacterByIdQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders character details after fetch', async () => {
    (
      useGetCharacterByIdQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: characterMock,
      error: undefined,
      isLoading: false,
    });

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    expect(
      await screen.findByRole('img', { name: characterMock.name })
    ).toBeInTheDocument();
    expect(screen.getByText(characterMock.name)).toBeInTheDocument();
  });

  it('shows error message if fetch fails', async () => {
    const error = { status: 500, data: 'fail' };

    (
      useGetCharacterByIdQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: undefined,
      error,
      isLoading: false,
    });

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    const errorMessage = getErrorMessage(error);

    expect(
      await screen.findByText(new RegExp(errorMessage, 'i'))
    ).toBeInTheDocument();
  });

  it('shows "No character found" if character is empty', async () => {
    (
      useGetCharacterByIdQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: { id: 0, name: '', image: '', status: '', species: '', gender: '' },
      error: undefined,
      isLoading: false,
    });

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    expect(await screen.findByText(/no character found/i)).toBeInTheDocument();
  });

  it('calls onClose when Close button clicked', async () => {
    const onCloseMock = vi.fn();

    (
      useGetCharacterByIdQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: characterMock,
      error: undefined,
      isLoading: false,
    });

    render(<CharacterDetails id="1" onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders nothing if id is empty', () => {
    render(<CharacterDetails id="" onClose={vi.fn()} />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
