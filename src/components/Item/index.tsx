import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { TMDB_IMAGE_W500_URL } from 'api';

import { Movie, Show, SearchItem } from 'types';

import styles from './item.module.css';

type ItemProps = { item: Movie | Show | SearchItem };

const Item = ({ item }: ItemProps) => {
  const isMovie = useMemo(() => 'title' in item, [item]);
  // const isMovie = !!item.hasOwnProperty('title');
  const type = isMovie ? 'movie' : 'tv';

  return (
    <Link className={styles.item} to={`/${type}/${item.id}`}>
      <div
        className={styles.wrapper}
        style={{
          backgroundImage: item.backdrop_path
            ? `url('${TMDB_IMAGE_W500_URL}${item.backdrop_path}')`
            : `url(/camera.jpg)`
        }}
      >
        <span className={styles.rating}>&#9733; {item.vote_average}</span>
      </div>
      <h1 className={styles.title}>{isMovie ? (item as Movie).title : (item as Show).name}</h1>
    </Link>
  );
};

export default memo(Item);
