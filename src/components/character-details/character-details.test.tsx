import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as api from '../../api/api';
import { CharacterDetails } from './character-details';

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
    vi.restoreAllMocks();
  });

  it('shows loading initially', () => {
    vi.spyOn(api, 'fetchCharacterById').mockReturnValue(new Promise(() => {}));
    render(<CharacterDetails id="1" onClose={vi.fn()} />);
    expect(screen.getByText(/loading details/i)).toBeInTheDocument();
  });

  it('renders character details after fetch', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(characterMock);

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(
        screen.getByRole('img', { name: characterMock.name })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(characterMock.name)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toHaveTextContent(
      `Status: ${characterMock.status}`
    );
    expect(screen.getByText(/species/i)).toHaveTextContent(
      `Species: ${characterMock.species}`
    );
    expect(screen.getByText(/gender/i)).toHaveTextContent(
      `Gender: ${characterMock.gender}`
    );
  });

  it('shows error message if fetch fails', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockRejectedValue(new Error('fail'));

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load character details/i)
      ).toBeInTheDocument();
    });
  });

  it('shows "No character found" if character is empty after loading', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue({
      id: 0,
      name: '',
      image: '',
      status: '',
      species: '',
      gender: '',
    });

    render(<CharacterDetails id="1" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/no character found/i)).toBeInTheDocument();
    });
  });

  it('calls onClose when Close button clicked', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(characterMock);
    const onCloseMock = vi.fn();

    render(<CharacterDetails id="1" onClose={onCloseMock} />);

    await waitFor(() => screen.getByRole('button', { name: /close/i }));

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it('does nothing if id is empty', () => {
    render(<CharacterDetails id="" onClose={vi.fn()} />);
    expect(screen.queryByText(/loading details/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
