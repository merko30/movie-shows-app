import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChevronLeft,
  faClock,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import InfoItem from '../../components/InfoItem';
import { fetchSingle } from '../../api';
import { MovieContext, setSingle, start, setError } from '../../context/Movie';
import { Loading } from '../../components';
import { MovieDetail } from '../../types';
import { formatMinutes, formatDateString } from '../../utils';

import styles from './detail.module.css';

export type Params = {
  id: string;
  type: string;
};

const YOUTUBE_URL = `https://www.youtube.com/watch?v=`;

type DetailProps =  RouteComponentProps<Params>;

const Detail = ({
  history,
  match: {
    params: { type, id },
  },
}: DetailProps):JSX.Element => {
  const {
    state: { single, loading, error },
    dispatch,
  } = useContext(MovieContext);

  useEffect(() => {
    (async () => {
      dispatch(start());

      try {
        const data = await (await fetchSingle(type, id)).json();
        dispatch(setSingle(data));
      } catch (error) {
        
        dispatch(setError(error as string));
      }
    })();
  }, [id, type]);

  const isMovie = type === 'movie';
  const mov = single as MovieDetail;

  return (
    <div style={{ height: '100%' }}>
      {loading && <Loading />}
      {error && <p>{error}</p>}
      {single && (
        <div
          className={styles.background}
          style={{
            backgroundImage: single.backdrop_path
              ? `url('https://image.tmdb.org/t/p/original${single.backdrop_path}')`
              : `url('/camera.jpg')`,
          }}
        >
          <span
            className={styles.back}
            data-testid="back"
            onClick={() => history.push('/')}
          >
            <FontAwesomeIcon color="white" icon={faChevronLeft} size="1x" />
          </span>
          <div className={styles.overlay} />
          <div className={styles.content}>
            {single.videos.results.length &&
            single.videos.results[0].site === 'YouTube' ? (
              <div className={styles.video}>
                <ReactPlayer
                  data-testid="video"
                  url={`${YOUTUBE_URL}${single.videos!.results[0].key}`}
                  width="100%"
                />
              </div>
            ) : (
              <img
                alt="poster"
                className={styles.image}
                src={`https://image.tmdb.org/t/p/original${single.poster_path}`}
              />
            )}
            <div className={styles.info}>
              <div>
                {single.genres &&
                  single.genres.map((g) => {
                    return (
                      <span key={g.id} className={styles['genre-container']}>
                        <p className={styles.genre}>{g.name}</p>
                      </span>
                    );
                  })}
              </div>
              <h1>{isMovie ? mov.title : single.name}</h1>
              <div className="flex itemsCenter">
                {isMovie && mov.runtime && (
                  <InfoItem
                    icon={faClock}
                    label={formatMinutes(mov.runtime!)}
                  />
                )}
                {single.vote_average && (
                  <InfoItem
                    color="orange"
                    icon={faStar}
                    label={`${single.vote_average}/10`}
                  />
                )}
                {isMovie && mov.release_date ? (
                  <InfoItem
                    icon={faCalendar}
                    label={formatDateString(mov.release_date)}
                  />
                ) : single.first_air_date ? (
                  <InfoItem
                    icon={faCalendar}
                    label={formatDateString(single.first_air_date!)}
                  />
                ) : null}
              </div>

              {single.overview && (
                <p className={styles.overview}>{single.overview}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
