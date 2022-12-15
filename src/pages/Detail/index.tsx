import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchSingle, TMDB_IMAGE_ORIGINAL_URL } from 'api';

import { MovieContext, setSingle, start, setError } from 'context/Movie';

import { Loading } from 'components';

import styles from './detail.module.css';

import Info from './Info';
import Media from './Media';

export type Params = {
  id: string;
  type: string;
};

type DetailProps = RouteComponentProps<Params>;

const Detail = ({
  history,
  match: {
    params: { type, id }
  }
}: DetailProps): JSX.Element => {
  const {
    state: { single: details, loading, error },
    dispatch
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(start());

      try {
        const response = await fetchSingle(type, id);
        dispatch(setSingle(response.data));
      } catch (err) {
        dispatch(setError(err as string));
      }
    };

    fetchDetails();
  }, [id, type, dispatch]);

  return (
    <div style={{ height: '100%', overflowX: 'hidden' }}>
      {loading && <Loading />}
      {error && <p>{error}</p>}
      {details && (
        <div
          className={styles.background}
          style={{
            backgroundImage: details.backdrop_path
              ? `url('${TMDB_IMAGE_ORIGINAL_URL}${details.backdrop_path}')`
              : `url('/camera.jpg')`
          }}
        >
          <span className={styles.back} data-testid="back" onClick={() => history.push('/')}>
            <i className="fa fa-chevron-left" style={{ fontSize: '1.2rem', color: 'inherit' }} />
          </span>
          <div className={styles.content}>
            <Media details={details} />
            <Info details={details} type={type} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
