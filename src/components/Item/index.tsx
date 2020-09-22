import { faStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { Movie, Show } from '../../types';
import InfoItem from '../InfoItem';

import styles from './item.module.css';

type ItemProps = { item: Movie | Show };

const Item = ({ item }: ItemProps) => {
  const isMovie = Object.prototype.hasOwnProperty.call(item, 'title');

  // const isMovie = !!item.hasOwnProperty('title');
  const type = isMovie ? 'movie' : 'tv';

  return (
    <Link className={styles.item} to={`/${type}/${item.id}`}>
      <div
        className={styles['item-background']}
        style={{
          backgroundImage: item.backdrop_path
            ? `url('https://image.tmdb.org/t/p/w500${item.backdrop_path}')`
            : `url(/camera.jpg)`,
        }}
      >
        <div className={styles.content}>
          <h1 className={styles.title}>
            {isMovie ? (item as Movie).title : (item as Show).name}
          </h1>
          {item.vote_average !== undefined && (
            <InfoItem
              color="orange"
              icon={faStar}
              label={`${item.vote_average}/10`}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default Item;
