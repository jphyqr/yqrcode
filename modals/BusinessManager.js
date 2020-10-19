import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import firebase from "../firebase";
import { SET_MODAL } from "../reducers/reducerConstants";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../hooks/outsideClick";
import ModalWrapper from "./ModalWrapper";
const BusinessManager = () => {
  const firestore = firebase.firestore();
  const [_name, setName] = useState("");
  const [_error, error] = useState(false);
  const [_errorText, errorText] = useState("");
  const [_loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log("SUBMIT");

    setLoading(true);
    let user = firebase.auth().currentUser;
    try {
      await user;
      user.updateProfile({
        displayName: _name,
      });

      await firestore.collection("users").doc(user.uid).update({
        displayName: _name,
        DisplayNameSet: true,
      });

      setLoading(false);

      //  navigation.navigate("EnterCode");
    } catch (err) {
      console.log(err);
      error(true);
      errorText(err);
      setLoading(false);
    }
  };

  return (
    <ModalWrapper>
      <div className={styles.modal}>
        <div className={styles.dimmerContainer}>
          <div className={styles.dimmer} />

          {_loading ? (
            <div className={styles.overlay}>
              <div className={styles.spinner} />
              <span>{`Updating Name...}`}</span>
            </div>
          ) : (
            <div className={styles.overlay}>
              <span>Enter Display Name</span>
              <input
                placeholder="Bruce Wayne"
                required
                maxLength={10}
                value={_name}
                onChange={(p) => setName(p.target.value)}
              />
              {_error && <span>{_errorText}</span>}

              <button onClick={handleSubmit}>Update Name</button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BusinessManager;
