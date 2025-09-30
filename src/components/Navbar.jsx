import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-cross-blue rounded-full">
              <i className="fas fa-heart text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-red-cross-blue">
              Red Cross Philippines
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/')
                  ? 'bg-red-cross-light-blue text-red-cross-blue'
                  : 'text-gray-600 hover:text-red-cross-blue hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/login')
                  ? 'bg-red-cross-light-blue text-red-cross-blue'
                  : 'text-gray-600 hover:text-red-cross-blue hover:bg-gray-100'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/register')
                  ? 'bg-red-cross-light-blue text-red-cross-blue'
                  : 'text-gray-600 hover:text-red-cross-blue hover:bg-gray-100'
              }`}
            >
              Register
            </Link>
            <Link
              to="/payment"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/payment')
                  ? 'bg-red-cross-light-blue text-red-cross-blue'
                  : 'text-gray-600 hover:text-red-cross-blue hover:bg-gray-100'
              }`}
            >
              Payment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-red-cross-blue focus:outline-none focus:text-red-cross-blue"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
