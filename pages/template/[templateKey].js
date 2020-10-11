import React from "react";
import { templates } from "../../constants/types";
import { $CombinedState } from "redux";
import Link from "next/link";
import QRCode from "react-qr-code";
import styles from "../../styles/Home.module.css";
const TemplatePage = ({ templateKey }) => {
  const template = templates[`${templateKey}`] || {};

  const { height, width, backgroundColor, fontColor, itemHeight, itemWidth } =
    template || {};
  const { items } = template || [];

  return (
    <div className={styles[`${template.design}`]}>
      {items?.map((item, i) => {
        return (
          <Link
            key={i}
            href={`/service/user1/${encodeURIComponent(item.label)}`}
          >
            <div className={styles.kitchenService}>
              <QRCode
                value={`http://yqrcode.com/service/user1/${item.label}`}
                size={100}
              ></QRCode>
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

  return {
    props: {
      templateKey,
    },
  };
}

export default TemplatePage;
