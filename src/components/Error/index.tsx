import React from "react";

import styles from "./error.module.css";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return <h1 className={styles.error}>{message}</h1>;
};

export default Error;
