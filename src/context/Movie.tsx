import React, { createContext, useReducer } from 'react';

import reducer, { State, initialState } from './reducer';

export * from './actions';

export type MovieContextI = {
  state: State;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ({ type }: { type: string; payload?: any }) => void;
};

export const MovieContext = createContext({} as MovieContextI);

const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>;
};

export default MovieProvider;
