import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error;

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const err = error as FetchBaseQueryError;

    if (err.status === 404) {
      return 'Error... Resource not found!';
    }
    if (err.status === 500) {
      return 'Error... Server error, please try again later.';
    }

    if ('error' in err && typeof err.error === 'string') {
      return `Error... ${err.error}!`;
    }

    if ('data' in err) {
      if (typeof err.data === 'string') return `Error... ${err.data}!`;

      if (typeof err.data === 'object' && err.data !== null) {
        const dataObj = err.data as Record<string, unknown>;

        if ('message' in dataObj && typeof dataObj.message === 'string') {
          return `Error... ${dataObj.message}!`;
        }

        if ('error' in dataObj && typeof dataObj.error === 'string') {
          return `Error... ${dataObj.error}!`;
        }
      }
    }

    return `Error... ${JSON.stringify(err.data)}!`;
  }

  if (typeof error === 'string') return `Error... ${error}!`;

  if (error instanceof Error) return `Error... ${error.message}!`;

  return 'Error... Unknown error occurred!';
}
