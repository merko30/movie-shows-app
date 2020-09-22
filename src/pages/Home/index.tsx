import React, { useContext, useEffect } from "react";

import {
  MovieContext,
  setItems,
  setSearchResults,
  setError,
  start,
  toggleSearchActive,
} from "../../context/Movie";

import { Tab } from "../../types";

import { fetchTopRated, search } from "../../api";

import { Grid, Search, Loading, Header, Error } from "../../components";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const {
    state: {
      searchResults,
      searchActive,
      activeTab,
      movie: movies,
      tv: shows,
      loading,
      error,
    },
    dispatch,
  } = useContext(MovieContext);

  useEffect(() => {
    (async () => {
      if (!searchActive) {
        dispatch(start());
        try {
          const response = await (await fetchTopRated(activeTab)).json();
          if (response.results) {
            dispatch(setItems(response.results));
          } else {
            // messages are not relevant for the users
            dispatch(setError("Something went wrong"));
          }
        } catch (error) {
          dispatch(setError("Something went wrong"));
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchActive]);

  const onSearch = async (term: string) => {
    dispatch(start());
    try {
      const response = await (await search(term)).json();
      dispatch(toggleSearchActive(true));
      if (response.results) {
        dispatch(setSearchResults(response.results));
      } else {
        dispatch(setError("Something went wrong"));
      }
    } catch (error) {
      dispatch(setError("Something went wrong"));
    }
  };

  return (
    <div className={`container`} style={{ paddingBottom: "2em" }}>
      <Header />
      <Search onSearch={onSearch} tab={activeTab} />
      {loading && <Loading />}
      {error && <Error message={error} />}

      {searchActive &&
        !error &&
        (searchResults.length > 0 ? (
          <Grid searchResults={searchResults} />
        ) : (
          <h1>No results</h1>
        ))}

      {!searchActive && activeTab === Tab.MOVIES && movies.length > 0 && (
        <Grid movies={movies} />
      )}
      {!searchActive && activeTab === Tab.SHOWS && shows.length > 0 && (
        <Grid shows={shows} />
      )}
    </div>
  );
};

export default Home;
