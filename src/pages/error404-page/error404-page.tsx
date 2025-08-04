import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      <h1 className="h1-app flex mb-12 justify-center text-red-600">
        404 - Page not found
      </h1>
      <h2 className="h2-app flex mb-2 justify-center text-gray-700">
        You will be automatically redirected to the Home Page in 5 seconds.
      </h2>
      <h3 className="h3-app flex mb-2 justify-center text-gray-700">
        Or you can{' '}
        <Link to="/" className="text-blue-500 underline">
          go to Home Page now
        </Link>
        .
      </h3>
    </div>
  );
}
