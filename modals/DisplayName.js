import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import firebase from "../firebase";
import ModalWrapper from "./ModalWrapper";
const DisplayName = () => {
  const firestore = firebase.firestore();
  const [_name, setName] = useState("");
  const [_error, error] = useState(false);
  const [_errorText, errorText] = useState("");
  const [_loading, setLoading] = useState(false);
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
    </ModalWrapper>
  );
};

export default DisplayName;
