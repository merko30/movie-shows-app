import React, { useContext } from 'react';

import { MovieContext, setActiveTab } from 'context/Movie';

import { Tab } from 'types';

import Search from 'components/Search';

type HeaderProps = {
  onSearch: (term: string) => Promise<void>;
};

const Header = ({ onSearch }: HeaderProps) => {
  const {
    dispatch,
    state: { activeTab }
  } = useContext(MovieContext);

  const areMoviesSelected = activeTab === Tab.MOVIES;

  return (
    <header className="container w-full px-0 md:px-0 py-8">
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-0 justify-between">
        <Search tab={activeTab} onSearch={onSearch} />
        <nav>
          <ul className="flex gap-4">
            <li
              className={`text-lg uppercase cursor-pointer ${!areMoviesSelected ? 'font-medium' : ''}`}
              onClick={() => dispatch(setActiveTab(Tab.SHOWS))}
            >
              TV shows
            </li>
            <li
              className={`text-lg uppercase cursor-pointer ${areMoviesSelected ? 'font-medium' : ''}`}
              onClick={() => dispatch(setActiveTab(Tab.MOVIES))}
            >
              Movies
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
