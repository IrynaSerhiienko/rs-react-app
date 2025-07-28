import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LimitContainer } from './container';

describe('LimitContainer component', () => {
  it('renders children correctly', () => {
    const text = 'Test content';

    render(
      <LimitContainer>
        <p>{text}</p>
      </LimitContainer>
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';

    const { container } = render(
      <LimitContainer className={customClass}>
        <div>Child</div>
      </LimitContainer>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });
});
