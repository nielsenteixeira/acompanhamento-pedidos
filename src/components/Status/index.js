import React from 'react';

import styles from './Status.module.css';

export default function Status({ type }) {
  return (
    <div
      title={type.toUpperCase()}
      className={`${styles.status} ${type ? styles[type.toLowerCase()] : styles.nocolor}`}
    />
  );
}
