import React from "react";
import { useDispatch } from "react-redux";
import { SHOW_PRODUCT_INFO } from "../../reducers/reducerConstants";

const Page = ({ items, page, i, sliderWidth, activePageIndex, gutter }) => {
  const dispatch = useDispatch();
  const leftOffset =
    i * (sliderWidth - 100) - activePageIndex * (sliderWidth - 100);
  console.log("page", i, "offset", leftOffset);
  return (
    <div
      className="container"
      style={{
        width: `${sliderWidth - 100}px`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        left: 0,
        transform: `translateX(${leftOffset}px)`,
        transition: ".4s ease-out",
        bottom: 0,
      }}
    >
      {page.map((product, i) => {
        return (
          <div style={{ flexDirection: "row" }}>
            <div
              onClick={() =>
                dispatch({ type: SHOW_PRODUCT_INFO, payload: product })
              }
              className="item"
            >
              {product.label}
              <style jsx>{`
                .item {
                  width: ${100}px;
                  max-width: ${100}px;
                  height: 100px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border-radius: 10px;
                  background-color: black;
                  color: white;
                }
              `}</style>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
