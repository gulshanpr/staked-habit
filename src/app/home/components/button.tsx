import React from 'react';

const CircularPlusButton = ({ onClick, className = '' }: { onClick: () => void; className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 bg-black text-white rounded-full flex items-center justify-center focus:outline-none transition-colors ${className}`}
      aria-label="Add"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
};



export default CircularPlusButton;