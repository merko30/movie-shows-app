import React, { useContext, useEffect, useState } from 'react';

import { Tab } from 'types';
import { handleTermChange, MovieContext, toggleSearchActive } from 'context/Movie';

type SearchProps = {
  onSearch: (term: string) => Promise<void>;
  tab: Tab;
};

const Search = ({ onSearch, tab }: SearchProps) => {
  const {
    dispatch,
    state: { term: searchTerm }
  } = useContext(MovieContext);
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (term.length > 2) {
        onSearch(term);
      } else {
        dispatch(toggleSearchActive(false));
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      dispatch(handleTermChange(term));
    };
  }, [dispatch, onSearch, tab, term]);

  return (
    <>
      <div className="flex items-center">
        <i className="fa fa-search" style={{ fontSize: '1.2rem' }} />
        <input
          className="border-none outline-none text-lg ml-4"
          placeholder="Search..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
