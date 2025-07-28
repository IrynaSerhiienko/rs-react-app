import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { useSearchTermWithLocalStorage } from './use-search-term-with-local-storage';

describe('useSearchTermWithLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize searchTerm with value from localStorage if it exists', () => {
    localStorage.setItem('searchTerm', 'hello');
    const { result } = renderHook(() => useSearchTermWithLocalStorage());

    expect(result.current.searchTerm).toBe('hello');
  });

  test('should initialize searchTerm with empty string if localStorage is empty', () => {
    const { result } = renderHook(() => useSearchTermWithLocalStorage());

    expect(result.current.searchTerm).toBe('');
  });

  test('should update localStorage when searchTerm changes', () => {
    const { result } = renderHook(() => useSearchTermWithLocalStorage());

    act(() => {
      result.current.setSearchTerm('test');
    });

    expect(localStorage.getItem('searchTerm')).toBe('test');
    expect(result.current.searchTerm).toBe('test');
  });
});
