import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { usePageWithLocalStorage } from './use-page-with-local-storage';

describe('usePageWithLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize page with value from localStorage if it exists', () => {
    localStorage.setItem('page', '5');
    const { result } = renderHook(() => usePageWithLocalStorage());

    expect(result.current.page).toBe(5);
  });

  test('should initialize page with default value 1 if localStorage is empty', () => {
    const { result } = renderHook(() => usePageWithLocalStorage());

    expect(result.current.page).toBe(1);
  });

  test('should update localStorage when page changes', () => {
    const { result } = renderHook(() => usePageWithLocalStorage());

    act(() => {
      result.current.setPage(3);
    });

    expect(localStorage.getItem('page')).toBe('3');
    expect(result.current.page).toBe(3);
  });
});
