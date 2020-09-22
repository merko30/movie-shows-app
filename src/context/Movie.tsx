import React, { createContext, useReducer } from "react";

import reducer, { State, initialState } from "./reducer";
export * from "./actions";

export interface MovieContextI {
  state: State;
  dispatch: ({ type }: { type: string; payload?: any }) => void;
}

export const MovieContext = createContext({} as MovieContextI);

const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
