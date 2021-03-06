import React, { useContext } from 'react';

import { MovieContext, setActiveTab } from '../../context/Movie';
import { Tab } from '../../types';

import styles from './header.module.css';

const Header = () => {
  const {
    dispatch,
    state: { activeTab },
  } = useContext(MovieContext);

  const areMoviesSelected = activeTab === Tab.MOVIES;

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          <li
            className={!areMoviesSelected ? styles.active : undefined}
            onClick={() => dispatch(setActiveTab(Tab.SHOWS))}
          >
            TV shows
          </li>
          <li
            className={areMoviesSelected ? styles.active : undefined}
            onClick={() => dispatch(setActiveTab(Tab.MOVIES))}
          >
            Movies
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
