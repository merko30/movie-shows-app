import React, { useContext, useEffect } from 'react';

import { fetchSingle, TMDB_IMAGE_ORIGINAL_URL } from 'api';

import { MovieContext, setSingle, start, setError } from 'context/Movie';

import { Loading } from 'components';

import Info from './Info';
import Media from './Media';
import { useNavigate, useParams } from 'react-router-dom';

export type Params = {
  id: string;
  type: string;
};

const Detail = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const {
    state: { single: details, loading, error },
    dispatch
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(start());

      try {
        const response = await fetchSingle(type!, id!);
        dispatch(setSingle(response.data));
      } catch (err) {
        dispatch(setError(err as string));
      }
    };

    fetchDetails();
  }, [id, type, dispatch]);

  return (
    <div className="relative">
      {error && <p>{error}</p>}
      {details && (
        <div
          className="bg-center bg-cover bg-no-repeat w-screen h-auto md:h-screen flex items-center justify-center after:bg-black/60 after:absolute after:inset-0"
          style={{
            backgroundImage: details.backdrop_path
              ? `url('${TMDB_IMAGE_ORIGINAL_URL}${details.backdrop_path}')`
              : `url('/camera.jpg')`
          }}
        >
          {!loading ? (
            <>
              <span
                className="flex items-center justify-center bg-white/80 rounded-full p-4 size-12 absolute top-10 left-5 md:left-20 z-10 cursor-pointer"
                data-testid="back"
                onClick={() => navigate('/')}
              >
                <i
                  className="fa fa-chevron-left"
                  style={{ fontSize: '1.2rem', color: 'inherit' }}
                />
              </span>
              <div className="flex flex-col md:flex-row gap-4 mx-2 md:mx-24 mt-32 md:mt-0 mb-10 md:mb-0 pt-12 md:pt-4 p-4 bg-white/20 rounded-lg z-10">
                <Media details={details} />
                <Info details={details} type={type!} />
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};

export default Detail;
