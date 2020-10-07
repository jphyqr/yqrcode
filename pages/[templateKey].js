import React from "react";
import { templates } from "../constants/types";
import { $CombinedState } from "redux";
import Link from "next/link";
import QRCode from "react-qr-code";

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
    <div
      style={{
        height: template.height,
        width: template.width,
        backgroundColor: template.backgroundColor,
        fontColor: template.fontColor,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: 20,
      }}
    >
      {items?.map((item, i) => {
        return (
          <Link
            href={`/service/${encodeURIComponent(
              item.key
            )}/${encodeURIComponent(item.key)}`}
          >
            <div
              key={i}
              style={{
                height: itemHeight,
                width: itemWidth,

                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  opacity: 0.5,
                  bottom: 0,
                  left: 0,
                  zIndex: 2,
                }}
              >
                <QRCode
                  value={`http://yqrcode.com/service/user1/${item.key}`}
                  size={90}
                ></QRCode>
              </div>
              <span
                style={{
                  fontSize: 70,
                  opacity: 0.8,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              >
                {item.emoji}
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
