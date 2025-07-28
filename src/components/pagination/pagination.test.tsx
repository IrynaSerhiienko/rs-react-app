import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Pagination } from './pagination';

describe('Pagination', () => {
  const onPageChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders current page and total pages', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    expect(screen.getByText(/Page 3 of 5/i)).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with previous page when Prev clicked and not on first page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange when Prev clicked on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('calls onPageChange with next page when Next clicked and not on last page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when Next clicked on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
