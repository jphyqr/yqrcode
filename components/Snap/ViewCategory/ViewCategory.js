const { modalComponents } = require("../../../constants/modalConstants");

import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Home.module.css";
import firebase from "../../../firebase";
import _ from "lodash";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_PREVIEW,
  CLOSE_VIEW_CATEGORY,
  EDIT_NUTRITION,
  EDIT_STORE,
  VIEW_NEXT_SNAP,
} from "../../../reducers/reducerConstants";
import { useSubCollection } from "../../../hooks/firestoreHooks";
const ViewCategory = ({ exit }) => {
  const snapsToView = useSelector((state) => state.snap?.snapsToView || []);
  const [_f, f] = useState(1);
  const firestore = firebase.firestore();
  const snapToViewIndex = useSelector(
    (state) => state.snap.snapToViewIndex || 0
  );

  const activeSnapToView = (snapsToView && snapsToView[snapToViewIndex]) || {};

  console.log({ activeSnapToView });
  const { snaps } = activeSnapToView || [];

  const dispatch = useDispatch();
  const viewCategory = useSelector((state) => state.snap.viewCategory || false);
  const [_snapsLoaded, setSnapsLoaded] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [_activeSnap, setActiveSnap] = useState({});

  useEffect(() => {
    console.log("snaps changed", snaps);

    if (_.isEmpty(snaps)) setSnapsLoaded(false);
    else {
      setSnapsLoaded(true);
      setActiveSnap(snaps[0]);
    }

    f(_f + 1);
  }, [snaps]);

  useEffect(() => {
    f(_f + 1);
  }, [viewCategory]);

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
    if (viewCategory) {
      console.log("TIME TO PREVIEW SNAPS", viewCategory);
      setPreviewIndex(0);
      f(_f + 1);
    }
  }, [viewCategory]);

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

  const nextSnap = () => {
    if (snapToViewIndex < snapsToView.length) {
      dispatch({ type: VIEW_NEXT_SNAP });
    } else dispatch({ type: CLOSE_VIEW_CATEGORY });
  };
  return (
    <div className={"preview-snap"} onClick={nextSnap}>
      <span
        className={"cta buy"}
        id={"close-file"}
        onClick={() => dispatch({ type: EDIT_STORE })}
      >
        Buy!
      </span>
      <div className={"profile-video"}>
        <video id="profile-video" width="100" height="100" autoPlay>
          <source src={activeSnapToView.profileURL} type={"video/mp4"}></source>
        </video>
      </div>

      <span
        className={"cta nutrition"}
        id={"close-file"}
        onClick={() => dispatch({ type: EDIT_NUTRITION })}
      >
        Nutrition
      </span>

      <span
        style={{ justifySelf: "right", color: "white" }}
        className={"close-file"}
        id={"close-file"}
        onClick={exit}
      >
        X
      </span>

      {_snapsLoaded && !_.isEmpty(_activeSnap) ? (
        <div>
          {_activeSnap?.type?.includes("video") ? (
            <video
              id="fullvideo"
              className="fullvideo"
              width="100"
              height="100"
              autoPlay
            >
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

        .cta {
          position: absolute;
          padding: 10px;
          font-size: 24px;
          background-color: gainsboro;
          color: black;
        }

        .cta:hover {
          cursor: pointer;
        }

        .profile {
          bottom: 30px;
          right: 30px;
        }
        .profile-video {
          z-index: 100;
          height: 100px;
          width: 100px;
          position:absolute;
          right: 30px;
          bottom 30px
        }
        .buy {
          top: 30px;
          left: 30px;
        }

        .nutrition {
          bottom: 30px;
          left: 30px;
        }

        .buy:hover {
          cursor: pointer;
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
          display: ${viewCategory ? "block" : "none"};
        }
      `}</style>
    </div>
  );
};

export default ViewCategory;
