import React, { useEffect, useState } from "react";

import Link from "next/link";
import QRCode from "react-qr-code";
import styles from "../../styles/Home.module.css";
import { cities, templates } from "../../constants/types";
import { SET_CITY } from "../../reducers/reducerConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
const CityPage = ({ cityKey }) => {
  const xUserId = useSelector((state) => state.user.id || {});

  const [_userId, setUserId] = useState("");
  useEffect(() => {
    if (!_.isEmpty(xUserId)) setUserId(xUserId);
  }, [xUserId]);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = () => {
      dispatch({
        type: SET_CITY,
        payload: cities[`${cityKey}`],
      });
    };

    return unsub();
  }, [cityKey]);

  return (
    <div className={styles.twoItemFeed}>
      {Object.keys(templates).map((templateKey, i) => {
        return (
          <Link
            href={`/${cityKey}/${encodeURIComponent(templateKey)}/${_userId}`}
          >
            <div className={styles.feedCard}>
              {/* <img src="/favicon.ico" /> */}
              <div style={{ zIndex: 15 }}>
                <QRCode
                  value={`http://yqrcode.com/${cityKey}/${templateKey}/${_userId}`}
                  size={100}
                ></QRCode>
              </div>

              <span>{templateKey}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context || {};

  let cityKey = query.cityKey;

  return {
    props: {
      cityKey,
    },
  };
}

export default CityPage;
