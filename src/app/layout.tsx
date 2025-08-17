import './index.css';

export const metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
