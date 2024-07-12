import React, { useEffect } from 'react';

const Loading = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-pink-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-gray-600">Please wait while we load the content.</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
