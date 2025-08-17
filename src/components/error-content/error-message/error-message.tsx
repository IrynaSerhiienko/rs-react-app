import { useErrorData } from '../../../data/app-data';

type ErrorProps = {
  message?: string;
};

export function ErrorMessage({ message }: ErrorProps) {
  const { DEFAULT_ERROR_TEXT } = useErrorData();
  return (
    <p className="text-[var(--color-red-600)] text-sm md:text-base">
      {message || DEFAULT_ERROR_TEXT}
    </p>
  );
}
