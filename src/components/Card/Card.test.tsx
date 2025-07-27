import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './card';

describe('Card component', () => {
  it('renders passed name, status and image correctly', () => {
    const name = 'Any Name';
    const status = 'Any Status';
    const image = 'any-image-url.jpg';

    render(<Card name={name} status={status} image={image} />);

    expect(screen.getByText(name)).toBeInTheDocument();

    expect(screen.getByText(`Status: ${status}`)).toBeInTheDocument();

    const img = screen.getByRole('img', { name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
    expect(img).toHaveAttribute('alt', name);
  });
});
