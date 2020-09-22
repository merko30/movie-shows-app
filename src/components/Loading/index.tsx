import React from 'react';

import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles['sk-chase']} data-testid="loading">
      <div className={styles['sk-chase-dot']} />
      <div className={styles['sk-chase-dot']} />
      <div className={styles['sk-chase-dot']} />
      <div className={styles['sk-chase-dot']} />
      <div className={styles['sk-chase-dot']} />
      <div className={styles['sk-chase-dot']} />
    </div>
  );
};

export default Loading;
