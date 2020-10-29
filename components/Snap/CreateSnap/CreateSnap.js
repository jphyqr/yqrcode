import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClick, useScreenWidth } from "../../../hooks/outsideClick";
import {
  CLOSE_SNAP,
  EDIT_NUTRITION,
  EDIT_STORE,
  OPEN_SHARE_SNAP,
  PREVIEW_SNAP,
  SELECT_SNAP,
  UPDATE_SNAP,
  VIEW_FILE,
} from "../../../reducers/reducerConstants";
import styles from "../../../styles/Home.module.css";
import cuid from "cuid";
import { useDropzone } from "react-dropzone";
import TimelineItem from "../PreviewSnap/TimelineItem";
import firebase from "../../../firebase";
import { useSubCollection } from "../../../hooks/firestoreHooks";
import FilePreview from "./FilePreview";
import Draggable from "../../Draggable/Draggable";
import _ from "lodash";
import Slider from "../../Slider/Slider";
const CreateSnap = () => {
  const [_f, f] = useState(-1);
  const firestore = firebase.firestore();
  const auth = useSelector((state) => state.firebase.auth || {});

  if (_.isEmpty(auth)) return <div></div>;
  const createSnap = useSelector((state) => state.snap.create || false);

  const snap = useSelector((state) => state.snap.snap || {});

  useEffect(() => {
    setTitle(snap?.title || "");
  }, [snap]);

  useEffect(() => {
    f(_f + 1);
  }, [createSnap]);
  const node = useRef();
  const [_loading, setLoading] = useState(false);
  const [_myFiles, setMyFiles] = useState([]);
  const [_mySnaps, setMySnaps] = useState([]);
  const [_editTitle, setEditTitle] = useState(false);
  const [_title, setTitle] = useState("");
  const [width] = useScreenWidth();
  const snapRef = firestore
    .collection("snaps")
    .where("creatorUid", "==", auth.uid)
    .orderBy("creationDate", "desc");

  const ref = auth
    ? firestore
        .collection("users")
        .doc(auth.uid || null)
        .collection("files")
        .orderBy("creationDate", "desc")
        .limit(10)
    : null;

  const [fileData, filesLoading, fileError] = useSubCollection(ref);
  const [snapData, snapLoading, snapError] = useSubCollection(snapRef);

  useEffect(() => {
    setMySnaps(snapData);

    f(_f + 1);
  }, [snapData, snapLoading, snapError]);

  useEffect(() => {
    setMyFiles(fileData);

    f(_f + 1);
  }, [fileData, filesLoading, fileError]);

  const dispatch = useDispatch();
  const [_snaps, setSnaps] = useState([]);
  const MyDropzone = () => {
    if (typeof window !== "undefined") {
      window.URL = window.URL || window.webkitURL;
    }

    const onDrop = useCallback(async (acceptedFiles) => {
      console.log("accepted files", acceptedFiles);
      for (const file of acceptedFiles) {
        let duration;
        if (file.type.includes("video")) {
          console.log("VIDEO FILE CALC DURATION");
          var video = document.createElement("video");
          video.preload = "metadata";

          video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            duration = video.duration * 1000;
            console.log("DURATION", duration);
          };

          video.src = URL.createObjectURL(file);
        } else {
          duration = 4000;
        }

        let downloadURL = "";
        console.log("add file", file);

        console.log("add file", file);

        const imageName = cuid();

        const path = `files`;
        const options = {
          name: imageName,
        };

        try {
          setLoading(true);
          // upload the file to firebase storage
          let uploadedFile = await firebase.uploadFile(
            path,
            file,
            null,
            options
          );
          // get url of image
          downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
          console.log({ downloadURL });

          await firestore
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("files")
            .add({
              url: downloadURL,
              creationDate: Date.now(),
              type: file.type,
              size: file.size,
              duration: duration,
            });
          //    return { name: imageName, url: downloadURL };
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
          return error;
        }

        let uSnaps = _snaps;

        uSnaps.push({
          duration: duration,
          type: file.type,
          size: file.size,
          url: downloadURL,
        });
        setSnaps(uSnaps);
      }
      f(_f + 1);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    );
  };

  const updatePreviewTime = (index) => {
    let uSnap = _snaps[index];
    let uTime = uSnap.duration;
    uTime = uTime + 500;
    uSnap.duration = uTime;
    let uSnaps = _snaps;
    uSnaps[index] = uSnap;
    setSnaps(uSnaps);
    f(_f + 1);
  };

  const previewSnap = () => {
    dispatch({ type: PREVIEW_SNAP });
  };

  return (
    <div ref={node} className={"create-snap"}>
      <div className={styles.header}>
        <div className="stack">
          <div className="label-with-edit">
            {_editTitle ? (
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={_title}
              />
            ) : (
              <span>{snap.title}</span>
            )}

            {_editTitle ? (
              <button
                onClick={async () => {
                  await firestore.collection("snaps").doc(snap.id).update({
                    title: _title,
                  });
                  dispatch({ type: UPDATE_SNAP, key: "title", value: _title });
                  setEditTitle(false);
                }}
              >
                Save
              </button>
            ) : (
              <button onClick={() => setEditTitle(true)}>Edit</button>
            )}
          </div>

          <button
            onClick={async () => {
              if (window.confirm("Delete Snap Forever")) {
                await firestore.collection("snaps").doc(snap.id).delete();
              } else {
                console.log("CANCEL");
              }
            }}
          >
            Delete
          </button>
        </div>
        <span
          className={styles.closeButton}
          onClick={() => {
            dispatch({ type: CLOSE_SNAP });
          }}
        >
          Close
        </span>
      </div>

      <Slider
        onItemClick={(item) => dispatch({ type: SELECT_SNAP, payload: item })}
        itemHeight={70}
        selected={snap.id}
        selectedKey={"id"}
        sliderLabel="My Snaps"
        labelKey={"title"}
        backgroundKey={"thumbnail"}
        items={_mySnaps}
        sliderWidth={width}
        itemWidth={70}
        gutter={5}
      />

      <div className={styles.timeline}>
        {snap?.snaps?.map((snap, i) => {
          return (
            <TimelineItem
              onClick={(s) => {
                dispatch({ type: VIEW_FILE, payload: s });
              }}
              i={i}
              updatePreviewTime={updatePreviewTime}
              key={i}
              snap={snap}
            />
          );
        })}
      </div>
      {MyDropzone()}

      <div>
        <button onClick={previewSnap}>Preview</button>

        <button onClick={() => dispatch({ type: OPEN_SHARE_SNAP })}>
          Share
        </button>
      </div>

      <div className={styles.wrappedRow}>
        {_myFiles.map((file, i) => {
          return <FilePreview file={file} key={i} />;
        })}
      </div>

      <div className="bottom-nav">
        <span
          className="nav-item"
          onClick={() => dispatch({ type: EDIT_STORE })}
        >
          🛒
        </span>
        <span
          className="nav-item"
          onClick={() => dispatch({ type: EDIT_NUTRITION })}
        >
          📈
        </span>
      </div>

      <style jsx>{`
        .label-with-edit {
          display: flex;

          height: 30px;
        }
        .label-with-edit span,
        input {
          width: 100px;
          margin-right: 5px;
          overflow: hidden;
          white-space: nowrap;

          text-overflow: ellipsis;
        }

        .bottom-nav {
          display: flex;
          background-color: black;

          width: 100vw;
          justify-content: space-evenly;
          padding: 5px;
        }

        .nav-item {
          height: 50px;
          width: 50px;

          border-radius: 10px;

          border: 2px solid lightgreen;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 30px;
        }

        .nav-item:hover {
          cursor: pointer;
          background-color: green;
        }

        .create-snap {
          height: 100vh;
          width: 100vw;
          background-color: darkgrey;

          position: absolute;
          top: 50%;
          left: 50%;
          transform: ${createSnap
            ? "translate(-50%, -50%)"
            : "translate(-50%, 100%)"};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          transition: 0.5s ease;
          z-index: 25;
        }
      `}</style>
    </div>
  );
};

export default CreateSnap;
