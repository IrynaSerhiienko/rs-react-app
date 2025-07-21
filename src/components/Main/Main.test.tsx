import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Main from './Main';
import { charactersMock } from '../../tests/mocks';

describe('Main component', () => {
  it('renders loading message when loading is true', () => {
    render(<Main loading={true} error={null} data={[]} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error is not null', () => {
    const errorMessage = 'Something went wrong';
    render(<Main loading={false} error={errorMessage} data={[]} />);
    const errorElem = screen.getByText(errorMessage);
    expect(errorElem).toBeInTheDocument();
    expect(errorElem).toHaveClass('text-red-500');
  });

  it('renders CardList component with data when not loading and no error', () => {
    render(<Main loading={false} error={null} data={charactersMock} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
