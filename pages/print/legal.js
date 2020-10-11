import React from "react";
import TemplatePage from "../template/[templateKey]";
import { templates } from "../../constants/types";
import styles from "../../styles/Home.module.css";
const Legal = () => {
  return (
    <div className={styles.legalContainer}>
      <TemplatePage templateKey={"FRIDGE"} />

      <div className={styles.rotateOnSide}>
        <TemplatePage templateKey={"BATHROOM"} />
      </div>
    </div>
  );
};

export default Legal;
