import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Info } from 'lucide-react';
import { Movie } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  const posterUrl = movie.Poster === 'N/A' 
    ? 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' 
    : movie.Poster;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="relative h-80">
          <img 
            src={posterUrl} 
            alt={movie.Title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80';
            }}
          />
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full ${favorite ? 'bg-red-500' : 'bg-gray-900/80 hover:bg-gray-800'}`}
          >
            <Heart size={20} className={favorite ? 'fill-white text-white' : 'text-white'} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">{movie.Title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">{movie.Year}</span>
            <Link 
              to={`/movie/${movie.imdbID}`} 
              className="flex items-center text-yellow-400 hover:text-yellow-300"
            >
              <Info size={16} className="mr-1" />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;