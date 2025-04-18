import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import {
  MovieContext,
  setItems,
  setSearchResults,
  setError,
  start,
  toggleSearchActive
} from 'context/Movie';

import { Movie, SearchItem, Show } from 'types';

import { fetchTopRated, search } from 'api';

import { Loading, Header, Error, Item } from 'components';

const Home = () => {
  const {
    state: { searchResults, searchActive, activeTab, loading, error, meta, ...state },
    dispatch
  } = useContext(MovieContext);

  const activeItems = useMemo(
    () => (searchActive ? searchResults : state[activeTab]),
    [activeTab, searchResults, searchActive, state]
  );

  const fetchData = async (page?: number) => {
    if (!searchActive) {
      dispatch(start());

      try {
        const response = await fetchTopRated(activeTab, page);

        if (response?.data) {
          dispatch(
            setItems({
              ...response.data,
              reset: !page
            })
          );
        } else {
          // messages are not relevant for the users
          dispatch(setError('Failed to load data. Please reload the page'));
        }
      } catch (err) {
        console.log(err);

        dispatch(setError('Failed to load data. Please reload the page'));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, searchActive, dispatch]);

  const onSearch = useCallback(
    async (term: string) => {
      dispatch(start());

      try {
        const response = await search(term);
        dispatch(toggleSearchActive(true));

        if (response?.data) {
          dispatch(setSearchResults({ ...response.data, reset: true }));
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

  const onLoadMore = () => {
    if (meta.page <= meta.total_pages) {
      fetchData(meta.page + 1);
    }
  };

  return (
    <div className="container p-4">
      <Header onSearch={onSearch} />
      <div>
        {loading && <Loading />}
        {error && <Error message={error} />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {((activeItems as Array<Show | Movie | SearchItem>) || []).map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
        {activeItems.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-black text-white px-12 py-2 rounded cursor-pointer"
              onClick={onLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
