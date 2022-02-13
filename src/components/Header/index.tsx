import React, { useContext } from 'react'

import { MovieContext, setActiveTab } from 'context/Movie'

import { Tab } from 'types'

import Search from 'components/Search'

import styles from './header.module.css'

interface HeaderProps {
  onSearch: (term: string) => any
}

const Header = ({ onSearch }: HeaderProps) => {
  const {
    dispatch,
    state: { activeTab },
  } = useContext(MovieContext)

  const areMoviesSelected = activeTab === Tab.MOVIES

  return (
    <header>
      <Search tab={activeTab} onSearch={onSearch} />
      <nav className="flex itemsEnd">
        <ul>
          <li
            className={!areMoviesSelected ? styles.active : ''}
            onClick={() => dispatch(setActiveTab(Tab.SHOWS))}
          >
            TV shows
          </li>
          <li
            className={areMoviesSelected ? styles.active : ''}
            onClick={() => dispatch(setActiveTab(Tab.MOVIES))}
          >
            Movies
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
