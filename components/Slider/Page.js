import React from "react";
import { useDispatch } from "react-redux";
import { SHOW_PRODUCT_INFO } from "../../reducers/reducerConstants";

const Page = ({
  items,
  page,
  i,
  itemWidth,
  itemHeight,
  sliderWidth,
  activePageIndex,
  gutter,
  labelKey,
  backgroundKey,
  onItemClick,
  selected,
  selectedKey,
}) => {
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
          <div
            onClick={() => onItemClick(product)}
            style={{ flexDirection: "row" }}
          >
            <div
              onClick={() =>
                dispatch({ type: SHOW_PRODUCT_INFO, payload: product })
              }
              className="item"
              style={{
                outline:
                  selected === product[`${selectedKey}`]
                    ? "1px solid blue"
                    : null,
              }}
            >
              <span className="date">
                {/* {" "}
                {formatDistance(
                  new Date(_item?.lastSentAt),
                  new Date(Date.now())
                )} */}
                3 days
              </span>

              <span className="label">{product[`${labelKey}`]}</span>
              <style jsx>{`
                .item {
                  width: ${itemWidth}px;
                  height: ${itemHeight}px;

                  object-fit: cover;
                  background-size: cover;
                  background-image: url(${product[`${backgroundKey}`] ||
                  "emptyplate.jpg"});

                  border-radius: 10px;
                  background-color: black;
                  color: white;
                  position: relative;
                }

                .date,
                .label {
                  position: absolute;
                  opacity: 0.6;
                  padding: 2px;
                }

                .label {
                  top: 2px;
                  left: 2px;
                  background-color: black;
                  color: white;
                  overflow: hidden;
                  white-space: nowrap;
                  width: 100%;

                  text-overflow: ellipsis;
                }

                .date {
                  bottom: 0px;
                  right: 0px;
                  background-color: black;
                  color: white;
                  font-size: 10px;
                  border-radius: 20px;
                }

                .date {
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
