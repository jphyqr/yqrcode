import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/Home.module.css";
import firebase from "../../../firebase";
import { FOOD_STORIES } from "../../../constants/types";
import { camelCase } from "lodash";
import {
  CLOSE_SHARE_SNAP,
  CLOSE_SNAP,
  LOADING_FINISHED,
  LOADING_STARTED,
  UPDATE_SNAP,
} from "../../../reducers/reducerConstants";
const ShareSnap = ({ exit }) => {
  const [_f, f] = useState(-1);
  const firestore = firebase.firestore();
  const dispatch = useDispatch();
  const shareSnap = useSelector((state) => state.snap.shareSnap || false);
  const snap = useSelector((state) => state.snap.snap || {});
  const { sendTo } = snap || {};
  useEffect(() => {
    f(_f + 1);
  }, [shareSnap, snap, sendTo]);

  const sendToStories = async () => {
    dispatch({
      type: LOADING_STARTED,
      payload: "Sending Snaps..",
    });
    try {
      let promises = [];
      console.log("send snap to ..", sendTo);

      for (const cat in sendTo) {
        console.log("send to for", cat);
        if (sendTo[`${cat}`]) {
          const promise = new Promise((resolve, reject) => {
            firestore.collection("posted_snaps").add({
              storyKey: cat,
              ...snap,
              creationDate: Date.now(),
            });
          });
          promises.push({ promise });
        }
      }

      Promise.all(promises).then((values) => {
        console.log(values);
      });

      dispatch({
        type: LOADING_FINISHED,
      });
      dispatch({
        type: CLOSE_SHARE_SNAP,
      });
      dispatch({
        type: CLOSE_SNAP,
      });
    } catch (error) {
      console.log("error posting snaps", error);
      dispatch({
        type: LOADING_FINISHED,
      });
    }
  };

  const updateShareTo = async (cat) => {
    try {
      let uSnap = snap;
      let uSendTo = uSnap.sendTo || {};
      let temp = uSendTo[`${cat.key}`] || false;
      uSendTo[`${cat.key}`] = !temp;

      uSnap.sendTo = uSendTo;

      await firestore.collection("snaps").doc(snap.id).update({
        sendTo: uSendTo,
      });
      dispatch({
        type: UPDATE_SNAP,
        key: "sendTo",
        value: uSendTo,
      });
      f(_f + 1);
    } catch (error) {
      console.log("error updating share", error);
    }
  };

  return (
    <div className="bottom-drawer">
      <div className={styles.spacedRow}>
        <span style={{ color: "white" }}>Share To</span>
        <button onClick={exit}>X</button>
      </div>
      <div className="list">
        {FOOD_STORIES.map((cat, i) => {
          return (
            <div
              onClick={() => updateShareTo(cat)}
              key={i}
              className="story-container"
            >
              <input type="checkbox" checked={sendTo?.[`${cat.key}`]} />
              <img />
              <span>{cat.label}</span>
            </div>
          );
        })}
      </div>

      <button onClick={sendToStories}>POST</button>
      <style jsx>
        {`
          .story-container {
            padding: 5px 10px 10px 5px;
            background-color: grey;
            border-radius: 10px;
            margin-bottom: 5px;
          }
          .story-container:hover {
            cursor: pointer;
            background-color: blue;
          }
          .bottom-drawer {
            color: white;
            height: 100vh;
            width: 50vw;
            background-color: black;

            position: absolute;
            top: 0;
            right: 0;
            transform: ${shareSnap ? "translate(0%, 0)" : "translate(100%, 0)"};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: 0.5s ease;
            z-index: 40;
          }

          .list {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
};

export default ShareSnap;
