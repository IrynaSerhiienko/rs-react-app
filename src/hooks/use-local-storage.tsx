import { useEffect, useState } from 'react';

const IS_BROWSER = typeof window !== 'undefined';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<string>(() => {
    if (!IS_BROWSER) return defaultValue as string;
    return localStorage.getItem(key) || (defaultValue as string);
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
}
