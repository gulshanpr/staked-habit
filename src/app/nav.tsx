import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or brand */}
        <NavLink to="/" className="text-white text-2xl font-bold">
          Your App Name
        </NavLink>

        {/* Navigation links */}
        <div className="space-x-4">
        <NavLink
                to="/"
                className="text-white hover:text-yellow-400"
        >
                Home
        </NavLink>
            <NavLink
                to="/leaderboard"
                className="text-white hover:text-yellow-400"
            >
                Leaderboard
            </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;