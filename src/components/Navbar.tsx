import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Film size={24} className="text-yellow-400" />
            <span>IMDB Clone</span>
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-yellow-400 transition-colors">
              My Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;