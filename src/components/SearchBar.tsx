import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchMovies } from '../api/omdb';
import { Movie } from '../types';

interface SearchBarProps {
  onResultsChange: (results: Movie[], query?: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotalResults: (total: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onResultsChange, 
  setIsLoading, 
  setError,
  setTotalResults 
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery.trim()) {
        onResultsChange([], '');
        setError(null);
        setTotalResults(0);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await searchMovies(debouncedQuery);
        
        if (response.Response === 'True' && response.Search) {
          onResultsChange(response.Search, debouncedQuery);
          setTotalResults(parseInt(response.totalResults, 10));
        } else {
          onResultsChange([], debouncedQuery);
          setTotalResults(0);
          if (response.Error) {
            setError(response.Error);
          }
        }
      } catch (error) {
        setError('An error occurred while searching for movies');
        onResultsChange([], debouncedQuery);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [debouncedQuery, onResultsChange, setIsLoading, setError, setTotalResults]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  );
};

export default SearchBar;