import React from "react";
import { templates } from "../constants/types";
import { $CombinedState } from "redux";
import Link from "next/link";
import QRCode from "react-qr-code";
import styles from "../styles/Home.module.css";
const TemplatePage = ({ template }) => {
  const {
    height,
    width,
    backgroundColor,
    fontColor,
    itemHeight,
    itemWidth,
    items,
  } = template;

  console.log({ template });
  return (
    <div className={styles.kitchenCard}>
      {items?.map((item, i) => {
        return (
          <Link
            key={i}
            href={`/service/${encodeURIComponent(
              item.key
            )}/${encodeURIComponent(item.key)}`}
          >
            <div className={styles.kitchenService}>
              <QRCode
                value={`http://yqrcode.com/service/user1/${item.key}`}
                size={100}
              ></QRCode>
              <span className={styles.emojiLabel}>
                {`${item.emoji}${item.key}`}
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

  let template = {
    key: query.templateKey,
    ...templates[`${query.templateKey}`],
  };

  return {
    props: {
      template,
    },
  };
}

export default TemplatePage;
