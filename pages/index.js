import Head from "next/head";
import styles from "../styles/Home.module.css";
import { services, templates } from "../constants/types";
import Link from "next/link";
import QRCode from "react-qr-code/lib/components/QRCode";
import { useDispatch, useSelector } from "react-redux";
import Fridge from "../components/magnets/Fridge";
import _ from "lodash";
import { SELECT_SERVICE, SET_MODAL } from "../reducers/reducerConstants";
import { modalTypes } from "../constants/modalConstants";
export default function Home() {
  const xCity = useSelector((state) => state.city || {});
  const xCategory = useSelector((state) => state.category || {});
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
