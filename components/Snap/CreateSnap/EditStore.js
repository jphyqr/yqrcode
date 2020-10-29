import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/Home.module.css";
import firebase from "../../../firebase";
const EditStore = ({ exit }) => {
  const [_f, f] = useState(-1);
  const firestore = firebase.firestore();
  const editStore = useSelector((state) => state.snap.editStore || false);

  useEffect(() => {
    f(_f + 1);
  }, [editStore]);

  return (
    <div className="bottom-drawer">
      <div className={styles.spacedRow}>
        <span>Store Info</span>
        <button onClick={exit}>X</button>
      </div>

      <style jsx>
        {`
          .bottom-drawer {
            height: 300px;
            width: 95vw;
            background-color: green;
            border-radius: 20px;

            position: absolute;
            bottom: 0;
            left: 50%;
            transform: ${editStore
              ? "translate(-50%, -55px)"
              : "translate(-50%, 300px)"};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            transition: 0.5s ease;
            z-index: 30;
          }
        `}
      </style>
    </div>
  );
};

export default EditStore;
