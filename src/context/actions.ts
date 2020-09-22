import { Tab, Movie, Show } from "../types";

export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const SET_ITEMS = "SET_ITEMS";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const TOGGLE_SEARCH_ACTIVE = "TOGGLE_SEARCH_ACTIVE";
export const START_ACTION = "START_ACTION";
export const SET_ERROR = "SET_ERROR";
export const SET_SINGLE = "SET_SINGLE";

export const start = () => ({
  type: START_ACTION,
});

export const setActiveTab = (tab: Tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const setItems = (items: Movie[] | Show[]) => ({
  type: SET_ITEMS,
  payload: items,
});

export const setSearchResults = (items: (Movie | Show)[]) => ({
  type: SET_SEARCH_RESULTS,
  payload: items,
});

export const toggleSearchActive = (value: boolean) => ({
  type: TOGGLE_SEARCH_ACTIVE,
  payload: value,
});

export const setError = (error: string) => ({
  type: SET_ERROR,
  payload: error,
});

export const setSingle = (single: Show | Movie) => ({
  type: SET_SINGLE,
  payload: single,
});
