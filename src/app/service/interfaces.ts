export interface ApiMovieResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genre[];
  homepage: string;
  mdb_id: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
interface Genre {
  id: number;
  name: string;
}
