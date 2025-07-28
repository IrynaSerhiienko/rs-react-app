import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorBoundary from './error-boundary';

describe('ErrorBoundary component', () => {
  it('renders children and error button initially', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /error button/i })
    ).toBeInTheDocument();
  });

  it('shows error message and button when error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /error button/i });
    fireEvent.click(button);

    expect(screen.getByText(/non-successful response/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /error button/i })
    ).toBeInTheDocument();

    expect(screen.queryByText('Child content')).toBeNull();
  });

  it('resets error state and shows children again on clicking Try again button', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /error button/i }));

    expect(screen.getByText(/non-successful response/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(screen.queryByText(/non-successful response/i)).toBeNull();
  });
});
