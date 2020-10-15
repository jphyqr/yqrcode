import React from "react";
import styles from "../styles/Home.module.css";

const Loader = (message) => {
  console.log("loader", message);
  return (
    <div className={styles.modal}>
      <div className={styles.overlayContainer}>
        <div className={styles.dimmer} />

        <div className={styles.overlay}>
          <div className={styles.spinner} />
          <span>{message.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
