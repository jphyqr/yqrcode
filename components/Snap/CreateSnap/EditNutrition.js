import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/Home.module.css";
import firebase from "../../../firebase";
const EditNutrition = ({ exit }) => {
  const [_f, f] = useState(-1);
  const firestore = firebase.firestore();
  const editNutrition = useSelector(
    (state) => state.snap.editNutrition || false
  );

  useEffect(() => {
    f(_f + 1);
  }, [editNutrition]);

  return (
    <div className="bottom-drawer">
      <div className={styles.spacedRow}>
        <span>Nutrition Info</span>
        <button onClick={exit}>X</button>
      </div>

      <style jsx>
        {`
          .bottom-drawer {
            height: 300px;
            width: 95vw;
            background-color: pink;
            border-radius: 20px;

            position: absolute;
            bottom: 0;
            left: 50%;
            transform: ${editNutrition
              ? "translate(-50%, -55px)"
              : "translate(-50%, 300px)"};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            transition: 0.5s ease;
            z-index: 40;
          }
        `}
      </style>
    </div>
  );
};

export default EditNutrition;
