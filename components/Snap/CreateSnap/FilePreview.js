import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useLongPress from "../../../hooks/gestureHooks";
import { PREVIEW_SNAP, VIEW_FILE } from "../../../reducers/reducerConstants";

const FilePreview = ({ file }) => {
  const profileURL = useSelector((state) => state.snap.snap.profileURL || "");
  const dispatch = useDispatch();

  const onLongPress = () => {
    console.log("longpress is triggered");
  };

  const onClick = () => {
    dispatch({ type: VIEW_FILE, payload: file });
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div
      {...longPressEvent}
      onClick={() => dispatch({ type: VIEW_FILE, payload: file })}
      onMouseDown={() => console.log("")}
      className="container"
    >
      {profileURL === file.url && <span className="profile-tag">PROFILE</span>}
      {file.type.includes("video") ? (
        <video width="75" height="75">
          <source src={file.url} type={"video/mp4"}></source>
        </video>
      ) : (
        <img src={file.url} width="75" height="75" />
      )}
      <style jsx>
        {`
          .profile-tag {
            position: absolute;
            top: 0;
            left: 0;
            color: red;
          }
          .container {
            height: 75px;
            width: 75px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
            background-color: black;
            margin-right: 10px;
            position: relative;
          }

          .container:first-child {
            margin-left: 5px;
          }

          .container:hover {
            cursor: pointer;
            outline: 2px solid blue;

            transform: scale(1.1);
            transition: 0.1s linear;
          }
        `}
      </style>
    </div>
  );
};

export default FilePreview;
