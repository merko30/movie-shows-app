import React from 'react';

import { InfoItem } from 'components';

import { MovieDetail, ShowDetail } from 'types';

import { formatDateString, formatMinutes } from 'utils';

import styles from './detail.module.css';

type InfoProps = {
  details: MovieDetail | ShowDetail;
  type: string;
};

const Info = ({ details, type }: InfoProps) => {
  const isMovie = type === 'movie';
  const movie = details as MovieDetail;

  return (
    <div className={styles.info}>
      <div>
        {details.genres &&
          details.genres.map((g) => {
            return (
              <span key={g.id} className={styles['genre-container']}>
                <p className={styles.genre}>{g.name}</p>
              </span>
            );
          })}
      </div>
      <h1>{isMovie ? movie.title : details.name}</h1>
      <div className="flex itemsCenter">
        {isMovie && movie.runtime && (
          <InfoItem iconClass="fa fa-clock" label={formatMinutes(movie.runtime)} />
        )}
        {details.vote_average && (
          <InfoItem iconClass="fa fa-star" label={`${details.vote_average}/10`} />
        )}
        {isMovie && movie.release_date ? (
          <InfoItem iconClass="fa fa-calendar" label={formatDateString(movie.release_date)} />
        ) : (
          details.first_air_date && (
            <InfoItem iconClass="fa fa-clock" label={formatDateString(details.first_air_date)} />
          )
        )}
      </div>

      {details.overview && <p className={styles.overview}>{details.overview}</p>}
    </div>
  );
};

export default Info;
