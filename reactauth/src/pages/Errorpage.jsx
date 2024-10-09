import React from 'react';

const Errorpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page not found.</h2>
      <p className="text-lg mt-2 text-center">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go back home
      </a>
    </div>
  );
};

export default Errorpage;
