import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Title } from './title';

describe('Title component', () => {
  const levels = [1, 2, 3, 4, 5, 6] as const;

  levels.forEach((level) => {
    it(`renders correct heading level h${level} with children`, () => {
      const text = `Heading ${level}`;
      render(<Title level={level}>{text}</Title>);
      const heading = screen.getByRole('heading', { level });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(text);
    });
  });

  it('adds custom className to the element', () => {
    const className = 'custom-class';
    render(
      <Title level={1} className={className}>
        Custom Class
      </Title>
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass(className);
  });
});
