import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="spinner mb-4"></div>
      <p className="text-gray-600 font-semibold">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
