import Head from "next/head";
import styles from "../styles/Home.module.css";
import { services, templates } from "../constants/types";
import Link from "next/link";
import QRCode from "react-qr-code/lib/components/QRCode";
import { useDispatch, useSelector } from "react-redux";
import Fridge from "../components/magnets/Fridge";
import _ from "lodash";
import {
  SELECT_SERVICE,
  SET_MODAL,
  VIEW_CATEGORY,
} from "../reducers/reducerConstants";
import { modalTypes } from "../constants/modalConstants";
import { useSubCollection } from "../hooks/firestoreHooks";
import { useEffect, useState } from "react";
import firebase from "../firebase";

export default function Home() {
  const firestore = firebase.firestore();
  const [_f, f] = useState(-1);
  const [hotAndReady, setHotAndReady] = useState([]);
  const hotAndReadyRef = firestore
    .collection("posted_snaps")
    .where("storyKey", "==", "HOT_AND_READY");
  const [
    hotAndReadyData,
    hotAndReadyLoading,
    hotAndReadyError,
  ] = useSubCollection(hotAndReadyRef);
  useEffect(() => {
    setHotAndReady(hotAndReadyData);

    f(_f + 1);
  }, [hotAndReadyData, hotAndReadyLoading, hotAndReadyError]);

  const xCity = useSelector((state) => state.city || {});

  const xCategory = useSelector((state) => state.category || {});
  const snapToViewIndex = useSelector(
    (state) => state.snap.snapToViewIndex || 0
  );
  useEffect(() => {
    if (xCategory == "FOOD" && !_.isEmpty(hotAndReady)) {
      console.log("SHOW THESE VIDS", hotAndReady);
      dispatch({
        type: VIEW_CATEGORY,
        category: "HOT_AND_READY",
        snapsToView: hotAndReady,
      });
    }
  }, [xCategory, hotAndReady]);

  const dispatch = useDispatch();
  return (
    <div className={styles.feed}>
      <Head>
        <title>YQRCODE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {services
        .filter((s) => s.category === xCategory)
        .map((service, i) => {
          return (
            <div
              onClick={() => {
                dispatch({ type: SELECT_SERVICE, payload: service });
                dispatch({ type: SET_MODAL, payload: modalTypes.Products });
              }}
              key={i}
              className={styles.feedCard}
            >
              {service.label}
            </div>
          );
        })}
    </div>
  );
}
