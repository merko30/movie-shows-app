import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { TMDB_IMAGE_W500_URL } from 'api';

import { Movie, Show, SearchItem } from 'types';

type ItemProps = { item: Movie | Show | SearchItem };

const Item = ({ item }: ItemProps) => {
  const isMovie = useMemo(() => 'title' in item, [item]);
  // const isMovie = !!item.hasOwnProperty('title');
  const type = isMovie ? 'movie' : 'tv';

  return (
    <Link
      className="relative min-h-64 after:absolute after:inset-0 after:bg-black/30 rounded-lg overflow-hidden"
      to={`/${type}/${item.id}`}
    >
      <div
        className="bg-center bg-cover bg-no-repeat w-full h-full relative flex items-end"
        style={{
          backgroundImage: item.backdrop_path
            ? `url('${TMDB_IMAGE_W500_URL}${item.backdrop_path}')`
            : `url(/camera.jpg)`
        }}
      />
      <div className="z-10 w-full absolute bottom-0 flex items-center justify-between gap-4 px-4">
        <h1 className="text-white !text-lg font-medium leading-tight">
          {isMovie ? (item as Movie).title : (item as Show).name}
        </h1>
        {!!item.vote_average && (
          <span className="p-1 bg-amber-300 rounded-lg flex-none mb-1">
            &#9733; {item.vote_average?.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default memo(Item);
