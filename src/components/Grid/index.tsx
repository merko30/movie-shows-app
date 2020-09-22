import React from 'react';

import { Item } from '..';
import {
  Movie,
  Movie as MovieI,
  SearchItem,
  Show,
  Show as ShowI,
} from '../../types';

import styles from './grid.module.css';

type Search = {
  searchResults: SearchItem[];
  movies?: never;
  shows?: never;
};
type Movies = {
  movies: MovieI[];
  shows?: never;
  searchResults?: never;
};
type Shows = {
  shows: ShowI[];
  movies?: never;
  searchResults?: never;
};

type GridProps = Search | Movies | Shows;

const Grid = ({ movies, shows, searchResults }: GridProps) => {
  return (
    <div className={styles.grid} data-testid="grid">
      {movies && movies.map((movie) => <Item key={movie.id} item={movie} />)}
      {shows && shows.map((show) => <Item key={show.id} item={show} />)}
      {searchResults &&
        searchResults.map((item) => {
          if (item.media_type === 'tv') {
            return <Item key={item.id} item={item as Show} />;
          }

          return <Item key={item.id} item={item as Movie} />;
        })}
    </div>
  );
};

export default Grid;
