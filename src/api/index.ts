import { AxiosResponse } from 'axios';
import axios from 'lib/axios';

import { Tab } from '../types';

export const fetchTopRated = async (type: Tab): Promise<AxiosResponse> => {
  return axios.get(`${type}/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
};

export const search = async (term: string): Promise<AxiosResponse> => {
  return axios.get(`search/multi?query=${term}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
};

export const fetchSingle = async (type: string, id: string): Promise<AxiosResponse> => {
  return axios.get(
    `${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos`
  );
};

export const TMDB_IMAGE_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original';
export const TMDB_IMAGE_W500_URL = 'https://image.tmdb.org/t/p/w500';
