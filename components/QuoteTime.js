import React from "react";
import styles from "../styles/Home.module.css";
const QuoteTime = ({ title }) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.formLabel}>{title}</div>
      <div className={styles.horizontalSlider}>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Looooong test</div>

        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
        <div className={styles.sliderBlock}>Test</div>
      </div>
    </div>
  );
};

export default QuoteTime;
