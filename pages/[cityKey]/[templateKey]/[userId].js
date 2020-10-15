import React, { useEffect } from "react";
import { templates, cities } from "../../../constants/types";

import Link from "next/link";
import QRCode from "react-qr-code";
import styles from "../../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CITY,
  SELECT_USER,
  SELECT_USER_ID,
  SET_TEMPLATE,
} from "../../../reducers/reducerConstants";
import { useRouter } from "next/dist/client/router";
import Router from "next/router";

import firebase from "../../../firebase";
import Loader from "../../../components/Loader";
const UsersTemplate = ({ templateKey, cityKey, userId }) => {
  const dispatch = useDispatch();
  const firestore = firebase.firestore();
  const auth = useSelector((state) => state.user.auth || false);
  useEffect(() => {
    const unsub = async () => {
      try {
        let userDoc = await firestore.collection("users").doc(userId).get();
        console.log({ userDoc });

        dispatch({
          type: SELECT_USER,
          payload: { id: userId, profile: { ...userDoc.data() } },
        });
      } catch (error) {
        console.log("firestore error", error);
      }
    };

    if (userId) unsub();
  }, [userId]);

  const router = useRouter();

  if (auth)
    router.push(
      {
        pathname: `/${cityKey}/${templateKey}`,
      },
      undefined,
      { shallow: true }
    );
  else return <Loader message="Loading User" />;

  //   useEffect(() => {
  //     const unsub = () => {
  //       dispatch({
  //         type: SET_CITY,
  //         payload: cities[`${cityKey}`],
  //       });
  //     };

  //     return unsub();
  //   }, [cityKey]);

  //   useEffect(() => {
  //     const unsub = () => {
  //       dispatch({
  //         type: SELECT_USER_ID,
  //         payload: userId,
  //       });
  //     };

  //     return unsub();
  //   }, [userId]);

  //   const template = templates[`${templateKey}`] || {};

  //   const { height, width, backgroundColor, fontColor, itemHeight, itemWidth } =
  //     template || {};
  //   const { items } = template || [];

  return (
    <div className={styles.twoItemFeed}>
      {/* {items?.map((item, i) => {
        return (
          <Link
            key={i}
            href={`/service/user1/${encodeURIComponent(item.label)}`}
          >
            <div className={styles.feedCard}>
              <span className={styles.emojiLabel}>
                {`${item.emoji}${item.label}`}
              </span>
            </div>
          </Link>
        );
      })} */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context || {};

  let templateKey = query.templateKey;
  let cityKey = query.cityKey;
  let userId = query.userId;
  return {
    props: {
      templateKey,
      cityKey,
      userId,
    },
  };
}

export default UsersTemplate;
