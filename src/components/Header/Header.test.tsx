import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header component', () => {
  it('renders the heading text', () => {
    render(<Header />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Rick and Morty Search');
  });
});
