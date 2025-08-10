import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Error404Page() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="p-4 font-bold">
      <h1 className="flex justify-center mb-12 text-red-600 h1-app">
        404 - Page not found
      </h1>
      <h2 className="flex justify-center mb-2 text-gray-700 h2-app">
        You will be automatically redirected to the Home Page in 5 seconds.
      </h2>
      <h3 className="flex justify-center mb-2 text-gray-700 h3-app">
        Or you can{' '}
        <Link to="/" className="text-blue-500 underline">
          go to Home Page now
        </Link>
        .
      </h3>
    </div>
  );
}
