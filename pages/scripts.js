import React from "react";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { start, finish } from "../actions/asyncActions";
import firebase from "../firebase";
const scripts = () => {
  const firestore = firebase.firestore();
  const dispatch = useDispatch();
  const generateUsers = async () => {
    try {
      dispatch(start("Test loading"));

      _.times(10, async () => {
        await firestore.collection("users").add({
          creationDate: Date.now(),
          address: null,
          phoneNumber: null,
          password: null,
          email: null,
        });
      });

      dispatch(finish());
    } catch (error) {
      dispatch(finish());
      console.log("error in generateUsers", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div onClick={generateUsers} className={styles.listItem}>
          Generate 10 users
        </div>
      </div>
    </div>
  );
};

export default scripts;
