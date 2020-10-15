import React, { useEffect } from "react";
import { templates, cities } from "../../constants/types";
import { $CombinedState } from "redux";
import Link from "next/link";
import QRCode from "react-qr-code";
import styles from "../../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { SET_CITY, SET_TEMPLATE } from "../../reducers/reducerConstants";
const TemplatePage = ({ templateKey, cityKey }) => {
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

  useEffect(() => {
    const unsub = () => {
      dispatch({
        type: SET_TEMPLATE,
        payload: templateKey,
      });
    };

    return unsub();
  }, [templateKey]);

  const template = templates[`${templateKey}`] || {};

  const { height, width, backgroundColor, fontColor, itemHeight, itemWidth } =
    template || {};
  const { items } = template || [];

  return (
    <div className={styles.twoItemFeed}>
      {items?.map((item, i) => {
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
      })}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context || {};

  let templateKey = query.templateKey;
  let cityKey = query.cityKey;
  return {
    props: {
      templateKey,
      cityKey,
    },
  };
}

export default TemplatePage;
