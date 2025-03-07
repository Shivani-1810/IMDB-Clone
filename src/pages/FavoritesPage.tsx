import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold text-white mb-8">My Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-lg mb-4">You haven't added any favorites yet.</p>
          <Link to="/" className="text-yellow-400 hover:text-yellow-300">
            Go back to search for movies
          </Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} isLoading={false} error={null} />
      )}
    </div>
  );
};

export default FavoritesPage;