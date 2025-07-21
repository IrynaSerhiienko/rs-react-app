import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Search from './Search';

describe('Search component', () => {
  const setup = (initialValue = '') => {
    localStorage.setItem('searchTerm', initialValue);
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);
    return onSearch;
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders input with stored value from localStorage', () => {
    const initial = 'stored term';
    localStorage.setItem('searchTerm', initial);
    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(input.value).toBe(initial);
  });

  it('updates input value on change', () => {
    setup();
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'React' } });
    expect(input.value).toBe('React');
  });

  it('calls onSearch with trimmed input and saves to localStorage', () => {
    const onSearch = setup();
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  vite  ' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('vite');
    expect(localStorage.getItem('searchTerm')).toBe('vite');
  });
});
