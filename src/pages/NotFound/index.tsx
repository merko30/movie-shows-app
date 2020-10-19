import React from 'react';

import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>
        404 <br />
        Not found
      </h1>
    </div>
  );
};

export default NotFound;
