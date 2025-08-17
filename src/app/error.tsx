'use client';

import ErrorContent from '../components/error-content/error-content';

export default function Error({ error }: { error: Error }) {
  return <ErrorContent error={error} />;
}
