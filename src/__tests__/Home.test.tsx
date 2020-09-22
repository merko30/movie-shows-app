import { wait } from '@testing-library/react';
import React from 'react';

import { fetchTopRated } from '../api';
import { initialState } from '../context/reducer';
import { Home } from '../pages';
import { Tab } from '../types';
import customRender, { initialValue as value } from '../utils/customRender';

const setup = () => {
  const utils = customRender(<Home />, { value });

  return {
    ...utils,
  };
};

jest.mock('../api/index');

describe('Home', () => {
  test('should fetch top rated movies/tv', async () => {
    setup();

    await wait();

    expect(fetchTopRated).toHaveBeenCalled();
    expect(fetchTopRated).toHaveBeenCalledWith(Tab.SHOWS);
  });

  test('should render appropriate list based on active tab', async () => {
    const vl = {
      ...value,
      state: {
        ...initialState,
        movie: new Array(10).fill(0).map((_, i) => ({
          title: `title_${i}`,
          original_title: `title_${i}`,
          vote_average: 4.5,
          backdrop_path: `backdrop_${i}`,
          id: i,
        })),
        activeTab: Tab.SHOWS,
      },
    };

    const { getByTestId, getAllByText, queryByTestId, rerender } = customRender(
      <Home />,
      {
        value: vl,
      }
    );

    expect(queryByTestId(/grid/i)).toBeNull();

    // SWITCH TAB TO MOVIES
    rerender(<Home />, {
      value: {
        ...vl,
        state: {
          ...vl.state,
          activeTab: Tab.MOVIES,
        },
      },
    });

    expect(getAllByText(/title/i)).toHaveLength(10);
    expect(getByTestId(/grid/i)).toBeVisible();
  });

  test('it shows "no results" if no search results', () => {
    const { getByText } = customRender(<Home />, {
      value: {
        ...value,
        state: { ...initialState, searchActive: true, searchResults: [] },
      },
    });

    expect(getByText(/no results/i)).toBeVisible();
  });

  test('should show loading spinner if data is being fetched', () => {
    const { getByTestId } = customRender(<Home />, {
      value: {
        ...value,
        state: { ...initialState, loading: true },
      },
    });

    expect(getByTestId('loading')).toBeVisible();
  });

  test('should show error message if error occurres', () => {
    const error = 'Something went wrong';
    const { getByText } = customRender(<Home />, {
      value: {
        ...value,
        state: { ...initialState, error },
      },
    });

    expect(getByText(error)).toBeVisible();
  });
});
