import React from 'react';
import {
  RenderOptions,
  render,
  Queries,
  RenderResult,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import { MovieContext, MovieContextI } from '../context/Movie';
import { initialState } from '../context/reducer';

export type Props = {
  value?: MovieContextI;
  options?: Pick<
    RenderOptions<Queries>,
    'container' | 'baseElement' | 'hydrate' | 'wrapper'
  >;
  route?: string;
  history?: MemoryHistory;
};

type Value = {
  value: MovieContextI;
  history: MemoryHistory;
};

type Render = Omit<RenderResult, 'rerender'> &
  Value & {
    rerender: (ui: React.ReactElement, props: Props) => void;
  };

export const initialValue: MovieContextI = {
  state: initialState,
  dispatch: jest.fn(),
};

export const history = (route: string) =>
  createMemoryHistory({ initialEntries: [route] });

const customRender = (
  ui: React.ReactElement,
  {
    value = initialValue,
    options = {},
    history = createMemoryHistory({ initialEntries: ['/'] }),
  }: Props
): Render => {
  const rendered = render(
    <Router history={history}>
      <MovieContext.Provider value={value}>{ui}</MovieContext.Provider>,
    </Router>,
    options
  );
  const { rerender, ...rest } = rendered;

  return {
    ...rest,
    rerender: (ui, props) => {
      return customRender(ui, {
        ...props,
        options: { container: rendered.container },
      });
    },
    value,
    history,
  };
};

export default customRender;
