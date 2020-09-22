import React, { useContext, useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tab } from '../../types';
import { MovieContext, toggleSearchActive } from '../../context/Movie';

import styles from './search.module.css';

type SearchProps = {
  onSearch: (term: string) => Promise<void>;
  tab: Tab;
};

const Search = ({ onSearch, tab }: SearchProps) => {
  const [term, setTerm] = useState('');
  const { dispatch } = useContext(MovieContext);

  useEffect(() => {
    const term = localStorage.getItem('term') || '';
    setTerm(term);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (term.length > 2) {
        onSearch(term);
        localStorage.setItem('term', term);
      } else {
        localStorage.removeItem('term');
        dispatch(toggleSearchActive(false));
      }
    }, 1000);

    return () => clearTimeout(timeout);
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
