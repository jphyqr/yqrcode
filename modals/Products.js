import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import firebase from "../firebase";
import ModalWrapper from "./ModalWrapper";
import _ from "lodash";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useScreenWidth } from "../hooks/outsideClick";
import Slider from "../components/Slider/Slider";
import {
  CLOSE_PRODUCT_INFO,
  CREATE_SNAP,
  SET_MODAL,
} from "../reducers/reducerConstants";

const Products = () => {
  const firestore = firebase.firestore();
  const service = useSelector((state) => state.service || {});
  const [_loading, setLoading] = useState(false);
  const product = useSelector((state) => state.productInfo.product || {});
  const [width] = useScreenWidth();
  const dispatch = useDispatch();
  console.log("Product Width", width);

  const { products } = service || [];

  return (
    <div className={styles.dimmerStacker}>
      <div className={styles.dimmer} />

      {_.isEmpty(service) ? (
        <div className={styles.overlay}>
          <div className={styles.spinner} />
          <span>{`Getting service...`}</span>
        </div>
      ) : (
        <div className="pully">
          <div className={styles.header}>
            <span
              className={styles.closeButton}
              onClick={() => {
                dispatch({ type: SET_MODAL, payload: {} });
                dispatch({ type: CLOSE_PRODUCT_INFO });
              }}
            >
              Close
            </span>
            <span
              className={styles.closeButton}
              onClick={async () => {
                let user = firebase.auth().currentUser;
                let snap = {
                  creationDate: Date.now(),
                  creatorUid: user.uid,
                  creatorDisplayName: user.displayName,
                  creatorPhotoURL: user.photoURL,
                  category: "FOOD",
                  title: "New Snap",
                };

                let snapRecord = await firestore.collection("snaps").add(snap);
                snap.id = snapRecord.id;

                dispatch({ type: CREATE_SNAP, snap: snap });
                dispatch({ type: CLOSE_PRODUCT_INFO });
              }}
            >
              Cook
            </span>
          </div>
          <Slider
            labelKey={"label"}
            itemHeight={100}
            sliderLabel="Cusines"
            backgroundKey={null}
            items={products}
            sliderWidth={width}
            itemWidth={70}
            gutter={5}
          />

          <style jsx>{`
            .hoist {
              height: 500px;
              width: 1000px;
              background-color: red;
            }

            .pully {
              position: absolute;
              display: flex;
              flex-direction: column;
              top: 0;
              left: 0;
              height: 100vh;
              width: 100vw;

              z-index: 4;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Products;
