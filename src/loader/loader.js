import React from 'react';
import styles from './loader.module.css';

export function Loader(props) {
  const {visible} = props;

  return visible ? (
    <div className={styles.overlay}>
      <div className={styles["lds-ring"]}>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  ) : <div />
}