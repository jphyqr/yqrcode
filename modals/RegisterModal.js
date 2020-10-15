import React from "react";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../reducers/reducerConstants";
import styles from "../styles/Home.module.css";
const RegisterModal = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.modal}>
      <div className={styles.dimmerContainer}>
        <div className={styles.dimmer} />
        <div className={styles.overlay}>
          <button onClick={() => dispatch({ type: CLOSE_MODAL })}>X</button>
          Register Modal
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
