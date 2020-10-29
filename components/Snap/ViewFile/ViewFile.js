import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_FILE,
  SELECT_SNAP,
  SET_THUMBNAIL,
  UPDATE_SNAP,
} from "../../../reducers/reducerConstants";
import _ from "lodash";
import firebase from "../../../firebase";
import styles from "../../../styles/Home.module.css";
const ViewFile = () => {
  const dispatch = useDispatch();
  const file = useSelector((state) => state.snap.file || {});
  const snap = useSelector((state) => state.snap.snap || {});
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log("IS EMPTY FILE CHANGED");
    setShow(!_.isEmpty(file));
  }, [_.isEmpty(file)]);
  const firestore = firebase.firestore();
  if (!show) return <div></div>;

  return (
    <div className={"preview-snap"}>
      <span
        style={{ justifySelf: "right", color: "white" }}
        className={"close-file"}
        id={"close-file"}
        onClick={() => {
          dispatch({ type: CLOSE_FILE });
        }}
      >
        X
      </span>

      <span
        style={{ color: "white" }}
        className={"profile"}
        onClick={async () => {
          await firestore.collection("snaps").doc(snap.id).update({
            profileURL: file.url,
          });

          dispatch({ type: UPDATE_SNAP, key: "profileURL", value: file.url });
        }}
      >
        Make Profile
      </span>

      {!file?.type?.includes("video") && (
        <span
          style={{ justifySelf: "right", color: "white" }}
          className={"thumbnail"}
          onClick={async () => {
            await firestore.collection("snaps").doc(snap.id).update({
              thumbnail: file.url,
            });

            dispatch({ type: UPDATE_SNAP, key: "thumbnail", value: file.url });
          }}
        >
          Thumbnail
        </span>
      )}

      <span className="timeline-add">
        <span className="times">
          <span>3s</span>
          <span>5s</span>
          <span>10s</span>
        </span>
        <span
          className={"add"}
          onClick={async () => {
            try {
              let uSnap = snap;
              let uSnaps = uSnap.snaps || [];
              uSnaps.push(file);
              uSnap.snaps = uSnaps;
              uSnap.createdDate = Date.now();
              await firestore.collection("snaps").doc(snap.id).set(uSnap);

              dispatch({ type: SELECT_SNAP, payload: uSnap });
              dispatch({ type: CLOSE_FILE });
            } catch (error) {
              console.log("Error adding to snap", error);
            }
          }}
        >
          +
        </span>
      </span>

      <div className="container">
        {file?.type?.includes("video") ? (
          <video className="fullvideo" width="100" height="100" autoPlay>
            <source src={file.url} type={"video/mp4"}></source>
          </video>
        ) : (
          <div className="preview-image"></div>
        )}
      </div>

      <style jsx>{`
        .close-file,
        .timeline-add {
          position: absolute;
          z-index: 50;
          font-size: 30px;
          border-radius: 5px;
          display: flex;
          padding: 10px;
          opacity: 0.7;
          color: white;
        }

        .thumbnail,
        .profile {
          position: absolute;
          top: 50%;

          z-index: 30;
          padding: 10px;
          opacity: 0.7;
          color: white;
          background-color: darkgrey;
        }

        .thumbnail {
          left: 0;
        }

        .profile {
          right: 0;
        }

        .times {
          display: flex;
        }

        .times span,
        .add {
          margin-right: 5px;
          background-color: pink;
          border-radisu: 10px;
          padding: 3px;
        }

        .add {
          background-color: green;
        }
        .timeline-add {
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
        }

        .timeline-add:before {
          content: "Add to Timeline";
          position: absolute;
          top: -20px;
          width: 100%;
          font-size: 16px;
        }
        .close-file {
          top: 10px;
          right: 10px;

          background-color: black;
          border-radius: 5px;
          padding: 10px;
          opacity: 0.7;
        }

        .container {
          height: 100vh;
          width: 100vw;
          position: relative;
        }
        .fullvideo {
          height: 100vh;
          width: 100vw;
          object-fit: fill;
          position: absolute;
          top: 0;
          left: 0;
        }
        .preview-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;

          background: url(${file.url}) no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          animation: in ${file.duration / 1000}s linear forwards;
        }

        @keyframes in {
          0% {
            opacity: 0;
          }
          20%,
          100% {
            opacity: 1;
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
          display: ${show ? "block" : "none"};
        }
      `}</style>
    </div>
  );
};

export default ViewFile;
