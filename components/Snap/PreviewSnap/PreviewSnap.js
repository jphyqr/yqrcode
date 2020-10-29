const { modalComponents } = require("../../../constants/modalConstants");

import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Home.module.css";
import firebase from "../../../firebase";
import _ from "lodash";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_PREVIEW } from "../../../reducers/reducerConstants";
import { useSubCollection } from "../../../hooks/firestoreHooks";
const PreviewSnap = () => {
  const snap = useSelector((state) => state.snap?.snap || {});
  const { snaps } = snap || [];
  const [_f, f] = useState(1);
  const firestore = firebase.firestore();

  const dispatch = useDispatch();
  const previewSnap = useSelector((state) => state.snap.preview || false);
  const [_snapsLoaded, setSnapsLoaded] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [_activeSnap, setActiveSnap] = useState({});

  useEffect(() => {
    console.log("snaps changed", snaps);
    const { snaps } = snap || [];
    if (_.isEmpty(snaps)) setSnapsLoaded(false);
    else {
      setSnapsLoaded(true);
      setActiveSnap(snaps[0]);
    }

    f(_f + 1);
  }, [snap?.snaps]);

  useEffect(() => {
    f(_f + 1);
  }, [previewSnap]);

  useEffect(() => {
    if (_snapsLoaded) {
      console.log("LOADED FIRST ACTIVE SNAP");
      setTimeout(() => {
        setPreviewIndex(previewIndex + 1);
      }, _activeSnap.duration);
    }
  }, [_activeSnap]);

  useEffect(() => {
    console.log("are snaps loaded?", _snapsLoaded, snaps);
    if (_snapsLoaded) {
      if (previewIndex >= snaps.length) {
        console.log("END OF PREVIEW SHOULD EXIT");
        dispatch({ type: CLOSE_PREVIEW });
        return;
      }

      if (previewIndex < snaps.length) {
        console.log("INDEX CHANGED TO", previewIndex, snaps[previewIndex]);
        setActiveSnap(snaps[previewIndex]);
        f(_f + 1);
      }
    }
  }, [previewIndex]);

  useEffect(() => {
    if (previewSnap) {
      console.log("TIME TO PREVIEW SNAPS", previewSnap);
      setPreviewIndex(0);
      f(_f + 1);
    }
  }, [previewSnap]);

  const [_loading, setLoading] = useState(false);
  //   const handleSubmit = async () => {
  //     console.log("SUBMIT");

  //     setLoading(true);
  //     let user = firebase.auth().currentUser;
  //     try {

  //     //   await firestore.collection("users").doc(user.uid).update({
  //     //     displayName: _name,
  //     //     DisplayNameSet: true,
  //     //   });

  //       setLoading(false);

  //     } catch (err) {
  //       console.log(err);
  //       error(true);
  //       errorText(err);
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className={"preview-snap"}>
      <span
        style={{ justifySelf: "right", color: "white" }}
        className={"close-file"}
        id={"close-file"}
        onClick={() => {
          dispatch({ type: CLOSE_PREVIEW });
        }}
      >
        X
      </span>

      {_snapsLoaded && !_.isEmpty(_activeSnap) ? (
        <div>
          {_activeSnap.type.includes("video") ? (
            <video className="fullvideo" width="100" height="100" autoPlay>
              <source src={_activeSnap.url} type={"video/mp4"}></source>
            </video>
          ) : (
            <div className="preview-image"></div>
          )}
        </div>
      ) : (
        <div className={styles.overlay}>
          <div className={styles.spinner} />
          <span>{`Getting snap...`}</span>
        </div>
      )}

      <style jsx>{`
        .close-file,
        .control {
          position: absolute;
          z-index: 50;
          font-size: 30px;
          border-radius: 5px;
          padding: 10px;
          opacity: 0.7;
          color: white;
        }
        .close-file {
          top: 10px;
          right: 10px;

          background-color: black;
          border-radius: 5px;
          padding: 10px;
          opacity: 0.7;
        }

        .control {
          bottom: 10px;
          left: 10px;
          background-color: green;
        }

        .fullvideo,
        .preview-image {
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
        }

        .preview-image {
          background: url(${_activeSnap.url}) no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          animation: in ${_activeSnap.duration / 1000}s linear forwards;
        }

        @keyframes in {
          0% {
            opacity: 0;
          }
          20%,
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .preview-snap {
          background-color: black;
          z-index: 30;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: ${previewSnap ? "block" : "none"};
        }
      `}</style>
    </div>
  );
};

export default PreviewSnap;
