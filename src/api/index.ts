import { AxiosResponse } from 'axios';
import axios from 'lib/axios';

import { Tab } from '../types';

export const fetchTopRated = async (type: Tab, page?: number): Promise<AxiosResponse> => {
  return axios.get(`${type}/top_rated`, {
    params: {
      page: page || 1
    }
  });
};

export const search = async (term: string): Promise<AxiosResponse> => {
  return axios.get(`search/multi`, {
    params: {
      query: term
    }
  });
};

export const fetchSingle = async (type: string, id: string): Promise<AxiosResponse> => {
  return axios.get(`${type}/${id}`, {
    params: {
      append_to_response: 'videos'
    }
  });
};

export const TMDB_IMAGE_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original';
export const TMDB_IMAGE_W500_URL = 'https://image.tmdb.org/t/p/w500';
