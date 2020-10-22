import React, { useEffect, useRef, useState } from "react";
import Page from "./Page";

const Slider = ({ items, sliderWidth, itemWidth, gutter }) => {
  const [_page, changePage] = useState(0);

  const [_middleItems, setMiddleItems] = useState([]);
  const [_leftItems, setLeftItems] = useState([]);
  const [_rightItems, setRightItems] = useState([]);
  const [_pages, setPages] = useState([]); // [[page1], [page2]]
  const [_f, f] = useState(1);

  const loadArrays = () => {
    console.log("LOAD ARRAYS");
    const maxNum = parseInt(
      (sliderWidth - 100) / (parseInt(itemWidth) + parseInt(gutter))
    );
    let numPages = parseInt(items.length / maxNum);
    if (items.length % maxNum > 0) numPages++;

    console.log(
      "page",
      _page,
      "maxNum",
      maxNum,
      "sliderWidth",
      sliderWidth,
      "item length",
      items.length,
      "pages",
      numPages
    );

    let loadedPages = [];

    for (var i = 0; i < numPages; i++) {
      let mI = items.slice(i * maxNum, maxNum * i + maxNum);
      loadedPages.push(mI);
    }

    console.log(loadedPages);
    setMiddleItems(loadedPages);
    setPages(numPages);
  };

  useEffect(() => {
    loadArrays();
    f(_f + 1);
  }, [sliderWidth]);

  useEffect(() => {
    loadArrays();
    f(_f + 1);
  }, [_page]);

  useEffect(() => {
    loadArrays();
    f(_f + 1);
  }, []);

  return (
    <div className="container">
      <div
        onClick={_page === 0 ? () => {} : () => changePage(_page - 1)}
        style={{ opacity: _page === 0 ? 0.2 : 1 }}
        className="button"
      >
        ⬅
      </div>
      <div className="items">
        {_middleItems.map((page, i) => {
          return (
            <Page
              sliderWidth={sliderWidth}
              gutter={gutter}
              page={page}
              activePageIndex={_page}
              key={i}
              i={i}
            />
          );
        })}
      </div>
      <div
        onClick={_page === _pages - 1 ? () => {} : () => changePage(_page + 1)}
        style={{ opacity: _page === _pages - 1 ? 0.2 : 1 }}
        className="button"
      >
        ➡
      </div>

      <style jsx>
        {`
          .item {
            width: ${itemWidth}px;
            max-width: ${itemWidth}px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background-color: black;
            color: white;
          }

          .button {
            min-width: 50px;
            width: 50px;
            height: 100px;
            background-color: grey;
            color: white;
            opacity: 0.7;
            z-index: 50;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            display: flex;
          }
          .items {
            display: flex;
            flex-grow: 1;

            width: 100%;
            justify-content: space-between;

            position: relative;
          }
          .container {
            margin: -10px;
            background-color: white;
            display: flex;

            width: ${sliderWidth}px;
            height: ${100}px;
            background-color: "lightgrey";
            position: "relative";
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
