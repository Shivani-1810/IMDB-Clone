import axios from 'axios';
import { SearchResponse, MovieDetails, MovieResponse } from '../types';

// Replace with your own API key
const API_KEY = '3a3ef4e';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query: string, page = 1): Promise<SearchResponse> => {
  try {
    if (!query.trim()) {
      return { Search: [], totalResults: '0', Response: 'False' };
    }
    
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { Search: [], totalResults: '0', Response: 'False', Error: 'Failed to fetch movies' };
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get<MovieDetails & MovieResponse>(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    
    if (response.data.Response === 'True') {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};