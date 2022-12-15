import React from 'react';
import ReactPlayer from 'react-player';

import { TMDB_IMAGE_ORIGINAL_URL } from 'api';

import { MovieDetail, ShowDetail } from 'types';

import styles from './detail.module.css';

const YOUTUBE_URL = `https://www.youtube.com/watch?v=`;

type MediaProps = {
  details: MovieDetail | ShowDetail;
};

const Media = ({ details }: MediaProps) => {
  if (details.videos.results.length && details.videos.results[0].site === 'YouTube')
    return (
      <div className={styles.video}>
        <ReactPlayer
          data-testid="video"
          url={`${YOUTUBE_URL}${details.videos.results[0].key}`}
          width="100%"
        />
      </div>
    );

  return (
    <div className={styles.image}>
      <img alt="poster" src={`${TMDB_IMAGE_ORIGINAL_URL}${details.poster_path}`} />
    </div>
  );
};

export default Media;
