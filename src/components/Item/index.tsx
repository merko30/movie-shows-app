import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

import { Movie, Show } from "../../types";

import InfoItem from "../InfoItem";

import styles from "./item.module.css";

type ItemProps = { item: Movie | Show };

const Item = ({ item }: ItemProps) => {
  const isMovie = !!item.hasOwnProperty("title");
  const type = isMovie ? "movie" : "tv";
  return (
    <Link to={`/${type}/${item.id}`} className={styles.item}>
      <div
        className={styles["item-background"]}
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
            <InfoItem icon={faStar} label={item.vote_average} color="orange" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default Item;
