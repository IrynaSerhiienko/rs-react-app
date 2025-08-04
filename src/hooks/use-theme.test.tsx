import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useTheme } from './use-theme';

describe('useTheme hook', () => {
  it('throws error when used outside ThemeProvider', () => {
    const callRenderHook = () => renderHook(() => useTheme());

    expect(callRenderHook).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });
});
