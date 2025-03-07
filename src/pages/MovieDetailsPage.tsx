import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Star, Clock, Calendar, Film } from 'lucide-react';
import { getMovieDetails } from '../api/omdb';
import { MovieDetails } from '../types';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const details = await getMovieDetails(id);
        if (details) {
          setMovie(details);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-400 text-xl mb-4">{error || 'Movie not found'}</p>
        <Link to="/" className="text-yellow-400 hover:text-yellow-300 flex items-center justify-center">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const posterUrl = movie.Poster === 'N/A' 
    ? 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' 
    : movie.Poster;

  const favorite = isFavorite(movie.imdbID);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </Link>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={posterUrl} 
              alt={movie.Title} 
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-white">{movie.Title}</h1>
              <button 
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full ${favorite ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <Heart size={24} className={favorite ? 'fill-white text-white' : 'text-white'} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center text-yellow-400">
                <Star size={18} className="mr-1 fill-yellow-400" />
                <span>{movie.imdbRating}/10</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <Calendar size={18} className="mr-1" />
                <span>{movie.Released}</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <Clock size={18} className="mr-1" />
                <span>{movie.Runtime}</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <Film size={18} className="mr-1" />
                <span>{movie.Genre}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-2">Plot</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Director</h2>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Actors</h2>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Language</h2>
                <p className="text-gray-300">{movie.Language}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Country</h2>
                <p className="text-gray-300">{movie.Country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;