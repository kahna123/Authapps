import React from 'react';

const Errorpage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Page not found</p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.history.back()}>Go back</button>
      </div>
    </div>
  );
};

export default Errorpage;