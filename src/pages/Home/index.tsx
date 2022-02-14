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

import styles from './home.module.css';

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
          const response = await (await fetchTopRated(activeTab)).json();

          if (response.results) {
            dispatch(setItems(response.results));
          } else {
            // messages are not relevant for the users
            dispatch(setError('Something went wrong'));
          }
        } catch (err) {
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
        const response = await (await search(term)).json();
        dispatch(toggleSearchActive(true));

        if (response.results) {
          dispatch(setSearchResults(response.results));
        } else {
          dispatch(setError('Something went wrong'));
        }
      } catch (err) {
        dispatch(setError('Something went wrong'));
      }
    },
    [dispatch]
  );

  return (
    <div>
      <Header onSearch={onSearch} />
      <div className="content">
        <div className="container">
          {loading && <Loading />}
          {error && <Error message={error} />}

          <div className={styles.grid}>
            {(active as Array<Show | Movie | SearchItem>).map((item) => {
              return <Item key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
