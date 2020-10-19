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
      {auth && (
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      )}
      <button onClick={() => router.push("/scripts")}>Scripts</button>
      {/* <button onClick={() => dispatch({type:SET_MODAL, payload: modalTypes.DisplayNameSet})}>Change Photo</button>       */}
      <button
        onClick={() =>
          dispatch({
            type: SET_MODAL,
            payload: modalTypes.DisplayNameSet,
          })
        }
      >
        Change Name
      </button>

      <button
        onClick={() =>
          dispatch({
            type: SET_MODAL,
            payload: modalTypes.BusinessManager,
          })
        }
      >
        Businsess Manager
      </button>

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
      <button onClick={closeClick}>Close</button>
      <style jsx>
        {`
          .top-container {
            background-color: lightgray;

            height: 200px;
            width: 100px;
            animation: appear 0.5s forwards;
            opacity: 0;
            z-index: 8;
          }

          .bottom-container {
            background-color: lightgray;

            height: 200px;
            width: 100px;
            opacity: 0;
            animation: appear 0.5s forwards;
            z-index: 8;
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
