import React from "react";
import styles from "./loading.module.css";

interface LoadingProps {}

const Loading = (props: LoadingProps) => {
  return (
    <div className={styles["sk-chase"]} data-testid="loading">
      <div className={styles["sk-chase-dot"]}></div>
      <div className={styles["sk-chase-dot"]}></div>
      <div className={styles["sk-chase-dot"]}></div>
      <div className={styles["sk-chase-dot"]}></div>
      <div className={styles["sk-chase-dot"]}></div>
      <div className={styles["sk-chase-dot"]}></div>
    </div>
  );
};

export default Loading;
