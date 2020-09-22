export interface Show {
  original_name: string;
  name: string;
  vote_count: number;
  backdrop_path?: string;
  id: number;
  vote_average: number;
}

export interface Movie extends Partial<Show> {
  original_title: string;
  title: string;
}

export interface SearchItem extends Partial<Movie>, Partial<Show> {
  media_type: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ShowDetail {
  backdrop_path?: string;
  first_air_date: string;
  genres: Genre[];
  id: number;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  overview: string;
  poster_path?: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: { results: Video[] };
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Video {
  id: string;
  key: string;
  site: string;
}

export interface MovieDetail extends Partial<ShowDetail> {
  adult: boolean;
  belongs_to_collection?: object;
  budget: number;
  genres: Genre[];
  homepage?: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  popularity?: number;
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  videos: { results: Video[] };
}

export enum Tab {
  MOVIES = "movie",
  SHOWS = "tv",
}
