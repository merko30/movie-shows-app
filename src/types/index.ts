export type Show = {
  original_name: string;
  name: string;
  vote_count: number;
  backdrop_path?: string;
  id: number;
  vote_average: number;
};

export type Movie = {
  original_title: string;
  title: string;
} & Partial<Show>;

export type SearchItem = {
  media_type: string;
} & Partial<Movie> &
  Partial<Show>;

export type Genre = {
  id: number;
  name: string;
};

export type ShowDetail = {
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
};

type SpokenLanguage = {
  iso_639_1: string;
  name: string;
};

type Video = {
  id: string;
  key: string;
  site: string;
};

export type MovieDetail = {
  adult: boolean;
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
} & Partial<ShowDetail>;

export enum Tab {
  MOVIES = 'movie',
  SHOWS = 'tv'
}
