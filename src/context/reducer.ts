import { Tab, SearchItem, Movie, Show, MovieDetail, ShowDetail } from '../types';

import {
  START_ACTION,
  SET_ACTIVE_TAB,
  SET_ITEMS,
  SET_SEARCH_RESULTS,
  TOGGLE_SEARCH_ACTIVE,
  SET_SINGLE,
  SET_ERROR,
  CHANGE_TERM
} from './actions';

export type State = {
  term: string;
  activeTab: Tab;
  searchResults: SearchItem[];
  searchActive: boolean;
  meta: {
    page: number;
    total_pages: number;
  };
  movie: Movie[];
  tv: Show[];
  single: MovieDetail | ShowDetail | null;
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  term: '',
  activeTab: Tab.SHOWS,
  searchActive: false,
  single: null,
  searchResults: [],
  movie: [],
  meta: {
    page: 1,
    total_pages: 1
  },
  tv: [],
  loading: false,
  error: null
};

export type Payload = any;

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: State, action: { type: string; payload?: Payload }) => {
  switch (action.type) {
    case START_ACTION:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload as Tab
      };
    case SET_ITEMS: {
      const { results: _results, reset = false, ...meta } = action.payload;
      // extend or replace the current state with the new results
      const results = reset ? _results : [...state[state.activeTab], ..._results];
      return {
        ...state,
        [state.activeTab]: results,
        meta,
        loading: false,
        error: null
      };
    }
    case SET_SEARCH_RESULTS: {
      const { results: _results, reset = false, ...meta } = action.payload;
      // extend or replace the current state with the new results
      const results = reset ? _results : [...state[state.activeTab], ..._results];
      return {
        ...state,
        searchResults: results,
        meta,
        loading: false
      };
    }
    case TOGGLE_SEARCH_ACTIVE:
      return {
        ...state,
        searchActive: action.payload
      };
    case SET_SINGLE:
      return {
        ...state,
        loading: false,
        single: action.payload
      };
    case CHANGE_TERM:
      return {
        ...state,
        term: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
