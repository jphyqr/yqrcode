import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Brain = ({ setRef, mobile, onClick }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.firebase.profile || {});
  return (
    <div ref={setRef} onClick={onClick} className={"brain-flexed"}>
      <img src={profile.photoURL} />
      {!mobile && <span>{profile.displayName}</span>}

      <style jsx>{`
        .brain-fixed,
        .brain-flexed {
          display: flex;
          border-radius: 10;
          padding: 10px;
          -webkit-backface-visibility: hidden;
          align-items: center;
          background-color: lightblue;
        }

        .brain-fixed {
          position: sticky;
          -webkit-backface-visibility: hidden;

          top: ${0}px;
          left: ${0}px;
        }

        img {
          height: 35px;
          width: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Brain;
