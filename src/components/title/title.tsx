type TitleProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
};

export function Title({ level, className = '', children }: TitleProps) {
  const baseClass = '';
  const combinedClass = `${baseClass} ${className}`.trim();

  if (level === 1) return <h1 className={combinedClass}>{children}</h1>;
  if (level === 2) return <h2 className={combinedClass}>{children}</h2>;
  if (level === 3) return <h3 className={combinedClass}>{children}</h3>;
  if (level === 4) return <h4 className={combinedClass}>{children}</h4>;
  if (level === 5) return <h5 className={combinedClass}>{children}</h5>;
  return <h6 className={combinedClass}>{children}</h6>;
}
