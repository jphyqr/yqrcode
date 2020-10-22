import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import firebase from "../firebase";
import ModalWrapper from "./ModalWrapper";
import _ from "lodash";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useScreenWidth } from "../hooks/outsideClick";
import Slider from "../components/Slider/Slider";

const Products = () => {
  const firestore = firebase.firestore();
  const service = useSelector((state) => state.service || {});
  const [_loading, setLoading] = useState(false);
  const product = useSelector((state) => state.productInfo.product || {});
  const [width] = useScreenWidth();

  console.log("Product Width", width);

  const { products } = service || [];

  return (
    <ModalWrapper>
      {_.isEmpty(service) ? (
        <div className={styles.overlay}>
          <div className={styles.spinner} />
          <span>{`Getting service...`}</span>
        </div>
      ) : (
        <div className="pully">
          <Slider
            items={products}
            sliderWidth={width}
            itemWidth={100}
            gutter={10}
          />

          <style jsx>{`
            .hoist {
              height: 500px;
              width: 1000px;
              background-color: red;
            }

            .pully {
              position: absolute;
              top: 0;
              left: 50%;

              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 10;
              padding: 10px;

              background-color: white;
            }
          `}</style>
        </div>
      )}
    </ModalWrapper>
  );
};

export default Products;
