import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  const KEY = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with value from localStorage if present', () => {
    localStorage.setItem(KEY, 'stored value');

    const { result } = renderHook(() => useLocalStorage(KEY, 'default value'));

    expect(result.current.value).toBe('stored value');
  });

  it('initializes with defaultValue if no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'default value'));

    expect(result.current.value).toBe('default value');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'default value'));

    act(() => {
      result.current.setValue('new value');
    });

    expect(localStorage.getItem(KEY)).toBe('new value');
    expect(result.current.value).toBe('new value');
  });
});
