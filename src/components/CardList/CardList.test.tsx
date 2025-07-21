import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import CardList from './CardList';

describe('CardList component', () => {
  it('renders a list of Card components with correct props', () => {
    const items = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        image: 'rick.jpg',
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        image: 'morty.jpg',
      },
    ];

    render(<CardList items={items} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();

    const statuses = screen.getAllByText('Status: Alive');
    expect(statuses).toHaveLength(2);

    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'src',
      'rick.jpg'
    );
    expect(screen.getByRole('img', { name: 'Morty Smith' })).toHaveAttribute(
      'src',
      'morty.jpg'
    );
  });
});
