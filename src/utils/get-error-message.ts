import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error;

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const err = error as FetchBaseQueryError;

    if ('error' in err && typeof err.error === 'string') {
      return err.error;
    }

    if ('data' in err) {
      if (typeof err.data === 'string') return err.data;
      if (typeof err.data === 'object' && err.data !== null) {
        if ('message' in err.data && typeof err.data.message === 'string') {
          return err.data.message;
        }
      }
    }

    return JSON.stringify(err.data);
  }

  if (error instanceof Error) return error.message;

  return 'Unknown error';
}
