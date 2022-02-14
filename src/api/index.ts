import { Tab } from '../types';

export const fetchTopRated = async (type: Tab): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_TMDB_URL}${type}/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
};

export const search = async (term: string): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_TMDB_URL}search/multi?query=${term}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
};

export const fetchSingle = async (type: string, id: string): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_TMDB_URL}${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos`
  );
};
