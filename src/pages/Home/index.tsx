import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import {
  MovieContext,
  setItems,
  setSearchResults,
  setError,
  start,
  toggleSearchActive
} from 'context/Movie';

import { Movie, SearchItem, Show, Tab } from 'types';

import { fetchTopRated, search } from 'api';

import { Loading, Header, Error, Item } from 'components';

const Home = () => {
  const {
    state: { searchResults, searchActive, activeTab, movie: movies, tv: shows, loading, error },
    dispatch
  } = useContext(MovieContext);

  const active = useMemo(() => {
    if (searchActive) {
      return searchResults;
    }

    if (activeTab === Tab.MOVIES) {
      return movies;
    }

    return shows;
  }, [activeTab, movies, shows, searchResults, searchActive]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchActive) {
        dispatch(start());

        try {
          const response = await fetchTopRated(activeTab);

          if (response.data) {
            console.log(response.data.results);

            dispatch(setItems(response.data.results));
          } else {
            // messages are not relevant for the users
            dispatch(setError('Something went wrong'));
          }
        } catch (err) {
          console.log(err);

          dispatch(setError('Something went wrong'));
        }
      }
    };

    fetchData();
  }, [activeTab, searchActive, dispatch]);

  const onSearch = useCallback(
    async (term: string) => {
      dispatch(start());

      try {
        const response = await search(term);
        dispatch(toggleSearchActive(true));

        if (response.data?.results) {
          dispatch(setSearchResults(response.data.results));
        } else {
          dispatch(setError('Something went wrong'));
        }
      } catch (err) {
        console.log(err);

        dispatch(setError('Something went wrong'));
      }
    },
    [dispatch]
  );

  return (
    <div className="container p-4">
      <Header onSearch={onSearch} />
      <div>
        <div>
          {loading && <Loading />}
          {error && <Error message={error} />}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {((active as Array<Show | Movie | SearchItem>) || []).map((item) => {
              return <Item key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
