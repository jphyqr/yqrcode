import { useRouter } from "next/dist/client/router";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalTypes } from "../../constants/modalConstants";
import { cities } from "../../constants/types";
import firebase from "../../firebase";
import { useOutsideClick } from "../../hooks/outsideClick";
import { SET_CITY, SET_MODAL } from "../../reducers/reducerConstants";
const SettingsMenu = ({ top, stickyLeft, closeClick }) => {
  const router = useRouter();
  const node = useRef();
  useOutsideClick(node, closeClick);

  const auth = useSelector((state) => state.firebase.auth || {});
  const xCity = useSelector((state) => state.city || {});
  const dispatch = useDispatch();
  return (
    <div
      className={top ? "top-container" : "bottom-container"}
      ref={node}
      style={{
        left: stickyLeft + 30,
      }}
    >
      <div className="top-slice">
        {auth && (
          <span onClick={() => firebase.auth().signOut()} className="menu-item">
            <span className="emoji"></span>
            <span className="label">Sign out</span>
          </span>
        )}

        <span onClick={() => router.push("/scripts")} className="menu-item">
          <span className="emoji"></span>
          <span className="label">Scripts</span>
        </span>
        {/* <button onClick={() => dispatch({type:SET_MODAL, payload: modalTypes.DisplayNameSet})}>Change Photo</button>       */}

        <span
          onClick={() =>
            dispatch({
              type: SET_MODAL,
              payload: modalTypes.DisplayNameSet,
            })
          }
          className="menu-item"
        >
          <span className="emoji"></span>
          <span className="label">Change Name</span>
        </span>

        <span
          onClick={() =>
            dispatch({
              type: SET_MODAL,
              payload: modalTypes.BusinessManager,
            })
          }
          className="menu-item"
        >
          <span className="emoji"></span>
          <span className="label">Business</span>
        </span>

        <select
          onChange={(e) =>
            dispatch({ type: SET_CITY, payload: cities[`${e.target.value}`] })
          }
        >
          {Object.keys(cities).map((city, i) => {
            return (
              <option selected={xCity.key === city} key={i} value={city}>
                {cities[`${city}`].label}
              </option>
            );
          })}
        </select>
      </div>

      <span onClick={closeClick} className="menu-item">
        <span className="emoji"></span>
        <span className="label">Close</span>
      </span>

      <style jsx>
        {`
          .menu-item,
          select {
            display: flex;
            border: 1px solid grey;
            width: 100%;
            border-radius: 5px;
            padding: 5px 10px 5px 10px;
            margin-bottom: 5px;
          }

          .menu-item:hover {
            cursor: pointer;
            color: blue;
          }

          .top-container,
          .bottom-container {
            background-color: gainsboro;
            border-radius: 10px;
            height: 300px;
            width: 150px;
            opacity: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px;
          }

          .top-container {
            animation: appear 0.5s forwards;
          }

          .bottom-container {
            animation: appear 0.5s forwards;
          }

          @keyframes appear {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SettingsMenu;
