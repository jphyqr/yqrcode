import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_PRODUCT_INFO } from "../reducers/reducerConstants";

const Info = () => {
  const dispatch = useDispatch();
  const xProduct = useSelector((state) => state.productInfo?.product || {});

  return (
    <div className="container">
      <button onClick={() => dispatch({ type: CLOSE_PRODUCT_INFO })}>
        {xProduct?.emoji}
      </button>
    </div>
  );
};

export default Info;
