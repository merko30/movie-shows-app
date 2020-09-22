import {
  Tab,
  SearchItem,
  Movie,
  Show,
  MovieDetail,
  ShowDetail,
} from '../types';

import {
  START_ACTION,
  SET_ACTIVE_TAB,
  SET_ITEMS,
  SET_SEARCH_RESULTS,
  TOGGLE_SEARCH_ACTIVE,
  SET_SINGLE,
  SET_ERROR,
} from './actions';

export type State = {
  activeTab: Tab;
  searchResults: SearchItem[];
  searchActive: boolean;
  movie: Movie[];
  tv: Show[];
  single: MovieDetail | ShowDetail | null;
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  activeTab: Tab.SHOWS,
  searchActive: false,
  single: null,
  searchResults: [],
  movie: [],
  tv: [],
  loading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case START_ACTION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case SET_ITEMS:
      return {
        ...state,
        [state.activeTab]: action.payload,
        loading: false,
        error: null,
      };

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
      };
    case TOGGLE_SEARCH_ACTIVE:
      return {
        ...state,
        searchActive: action.payload,
      };
    case SET_SINGLE:
      return {
        ...state,
        loading: false,
        single: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
