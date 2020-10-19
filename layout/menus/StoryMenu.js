import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories, cities } from "../../constants/types";
import { SET_CITY } from "../../reducers/reducerConstants";
import Brain from "../Brain";

const StoryMenu = ({ mobile, setTopRightMenu, setRef, onBrainClick }) => {
  const dispatch = useDispatch();
  const xCity = useSelector((state) => state.city || {});
  return (
    <div className={"story-menu"}>
      {mobile && <Brain mobile setRef={setRef} onClick={onBrainClick} />}

      {categories.map((categorie, i) => {
        console.log({ categorie });
        return (
          <div
            onClick={() => selectTab(categorie.key)}
            key={i}
            className={`nav-item`}
          >
            {categorie.emojie}
          </div>
        );
      })}

      <style jsx>{`
        .story-menu {
          display: flex;
          justify-content: space-evenly;

          background-color: white;

          z-index: 10;
          height: 35px;
          align-items: center;
        }

        .nav-item {
          height: 30px;
          width: 30px;
          border-radius: 100%;

          border: 2px solid lightgreen;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 30px;
        }

       =
      `}</style>
    </div>
  );
};

export default StoryMenu;
