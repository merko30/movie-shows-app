import React, { useContext, useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tab } from '../../types';
import {
  handleTermChange,
  MovieContext,
  toggleSearchActive,
} from '../../context/Movie';

import styles from './search.module.css';

type SearchProps = {
  onSearch: (term: string) => Promise<void>;
  tab: Tab;
};

const Search = ({ onSearch, tab }: SearchProps) => {
  const {
    dispatch,
    state: { term: searchTerm },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, term]);

  return (
    <div className={styles['search-container']}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        className={styles.input}
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
