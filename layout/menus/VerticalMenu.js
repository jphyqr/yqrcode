import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../constants/types";
import { SET_CATEGORY } from "../../reducers/reducerConstants";
import Brain from "../Brain";

const VerticalMenu = ({ onBrainClick, setRef, selectedTab, selectTab }) => {
  const dispatch = useDispatch();
  const xCategory = useSelector((state) => state.category || {});
  return (
    <div className={"side-nav"}>
      <div className={"top"}>
        {categories.map((categorie, i) => {
          console.log({ categorie });
          return (
            <div
              onClick={() =>
                dispatch({ type: SET_CATEGORY, payload: categorie.key })
              }
              key={i}
              className={`nav-item ${
                xCategory === categorie.key ? " selected-tab" : ""
              }`}
            >
              <span className="emoji">{categorie.emojie}</span>

              <span className="label">{categorie.label}</span>
            </div>
          );
        })}
      </div>

      <Brain setRef={setRef} onClick={onBrainClick} />

      <style jsx>{`
        .side-nav {
          display: flex;

          flex-direction: column;

          z-index: 2;
          height: 93vh;
          width: 100%;
          align-items: flex-end;
          justify-content: space-between;
        }

        .emoji {
          height: 50px;
          width: 50px;

          border-radius: 10px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 30px;
        }

        .nav-item {
          height: 50px;
          width: 180px;
          padding: 5px;
          border-radius: 10px;

          border: 2px solid lightgreen;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 30px;
          margin-bottom: 10px;
          margin-right: 10px;
        }

        .nav-item:hover {
          border: 2px solid green;

          background-color: lightgreen;
          cursor: pointer;
        }

        .nav-item:first-child {
          margin-top: 10px;
        }

        .selected-tab {
          background-color: lightgreen;
        }
      `}</style>
    </div>
  );
};

export default VerticalMenu;
