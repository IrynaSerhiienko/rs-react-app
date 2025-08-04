import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, defaultValue = '') {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) ?? defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
}
