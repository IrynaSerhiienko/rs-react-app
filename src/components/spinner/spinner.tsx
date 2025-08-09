import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-gray-600 dark:text-gray-300 size={40}" />
      <span className="text-gray-600 text-app dark:text-gray-300">
        Loading...
      </span>
    </div>
  );
}
