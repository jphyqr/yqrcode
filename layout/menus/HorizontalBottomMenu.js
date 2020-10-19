import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../constants/types";
import { SET_CATEGORY } from "../../reducers/reducerConstants";

const HorizontalBottomMenu = () => {
  const dispatch = useDispatch();
  const xCategory = useSelector((state) => state.category || {});

  return (
    <div className={"bottom-nav"}>
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
            {categorie.emojie}
          </div>
        );
      })}

      <style jsx>{`
        .bottom-nav {
          position: sticky;
          display: flex;
          justify-content: space-evenly;
          top: ${typeof window !== "undefined"
            ? `${window.innerHeight - 55}px`
            : "100vh"};

          transform: ${typeof window !== "undefined"
            ? null
            : "translateY(-100%)"};

          background-color: darkgrey;

          z-index: 2;
          height: 55px;
          align-items: center;
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

        .selected-tab {
          background-color: lightgreen;
        }
      `}</style>
    </div>
  );
};

export default HorizontalBottomMenu;
