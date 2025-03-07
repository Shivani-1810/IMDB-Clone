export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Released: string;
  Runtime: string;
  imdbRating: string;
  Language: string;
  Country: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieResponse {
  Response: string;
  Error?: string;
}