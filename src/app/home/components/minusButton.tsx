import React from 'react';

const CircularMinusButton = ({ onClick, className = '' }: { onClick: () => void; className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 bg-black text-white rounded-full flex items-center justify-center focus:outline-none  transition-colors ${className}`}
      aria-label="Remove"
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
          d="M20 12H4"
        />
      </svg>
    </button>
  );
};

export default CircularMinusButton;