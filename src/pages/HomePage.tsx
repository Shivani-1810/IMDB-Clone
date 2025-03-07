import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import { Movie } from '../types';
import { searchMovies } from '../api/omdb';

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  const handleResultsChange = useCallback((results: Movie[], query: string = '') => {
    setSearchResults(results);
    setCurrentPage(1);
    setCurrentQuery(query);
  }, []);

  const loadMoreMovies = async () => {
    if (!currentQuery || loadingMore) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const response = await searchMovies(currentQuery, nextPage);
      
      if (response.Response === 'True' && response.Search) {
        setSearchResults(prev => [...prev, ...response.Search]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 100 &&
        searchResults.length > 0 &&
        searchResults.length < totalResults &&
        !loadingMore &&
        !isLoading
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchResults.length, totalResults, loadingMore, isLoading, currentQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Find Your Favorite Movies</h1>
        <SearchBar 
          onResultsChange={handleResultsChange} 
          setIsLoading={setIsLoading}
          setError={setError}
          setTotalResults={setTotalResults}
        />
      </div>
      
      <MovieGrid 
        movies={searchResults} 
        isLoading={isLoading} 
        error={error} 
      />
      
      {searchResults.length > 0 && searchResults.length < totalResults && !isLoading && (
        <div className="mt-8 text-center">
          <button 
            onClick={loadMoreMovies}
            disabled={loadingMore}
            className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More Movies'}
          </button>
        </div>
      )}
      
      {loadingMore && (
        <div className="flex justify-center mt-6 mb-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      )}
      
      {searchResults.length > 0 && (
        <div className="mt-4 text-center text-gray-400">
          Showing {searchResults.length} of {totalResults} results
        </div>
      )}
    </div>
  );
};

export default HomePage;