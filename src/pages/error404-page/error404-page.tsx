import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Title } from '@/components/title/title';

export function Error404Page() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="p-4 font-bold">
      <Title
        level={1}
        className="text-2xl md:text-3xl flex mb-12 justify-center text-red-600"
      >
        404 - Page not found
      </Title>

      <Title level={2} className="mt-2 flex justify-center text-gray-700">
        You will be automatically redirected to the Home Page in 5 seconds.
      </Title>

      <Title level={3} className="mt-2 flex justify-center text-gray-700">
        Or you can{' '}
        <Link to="/" className="text-blue-500 underline">
          go to Home Page now
        </Link>
        .
      </Title>
    </div>
  );
}
