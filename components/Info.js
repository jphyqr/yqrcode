import React from "react";
import { useDispatch } from "react-redux";
import { TOGGLE_OVERLAY } from "../reducers/reducerConstants";

const Info = () => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <button
        onClick={() => dispatch({ type: TOGGLE_OVERLAY, payload: false })}
      >
        close
      </button>
    </div>
  );
};

export default Info;
