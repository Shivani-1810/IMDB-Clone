import axios from 'axios';

// Replace with your own API key
const API_KEY = '189ff158';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
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

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    
    if (response.data.Response === 'True') {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};