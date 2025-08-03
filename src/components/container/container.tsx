import type { ReactNode } from 'react';

interface LimitContainerProps {
  children: ReactNode;
  className?: string;
}

export function LimitContainer({
  children,
  className = '',
}: LimitContainerProps) {
  return (
    <div
      className={`w-full min-w-[360px] max-w-[1440px] mx-auto px-2 sm:px-2 lg:px-8 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}
