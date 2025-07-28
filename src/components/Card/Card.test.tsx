import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Card } from './card';

describe('Card', () => {
  const mockProps = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    image: 'https://example.com/rick.png',
  };

  it('renders correctly with given props', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockProps.status}`)).toBeInTheDocument();

    const img = screen.getByAltText(mockProps.name) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockProps.image);
  });

  it('calls onClick with id when clicked', () => {
    const onClickMock = vi.fn();
    render(<Card {...mockProps} onClick={onClickMock} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(mockProps.id);
  });

  it('calls onClick with id when Enter key is pressed', () => {
    const onClickMock = vi.fn();
    render(<Card {...mockProps} onClick={onClickMock} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(mockProps.id);
  });

  it('does not throw or call onClick if onClick prop is not provided', () => {
    render(<Card {...mockProps} />);

    const card = screen.getByRole('button');

    expect(() => fireEvent.click(card)).not.toThrow();

    expect(() =>
      fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' })
    ).not.toThrow();
  });
});
