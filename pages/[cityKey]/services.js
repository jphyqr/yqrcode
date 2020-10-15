import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Home.module.css";
import { templates } from "../../constants/types";
import Loader from "../../components/Loader";
import _ from "lodash";
const Services = () => {
  const xUser = useSelector((state) => state.user || {});
  const xCity = useSelector((state) => state.city || {});
  const XTemplate = useSelector((state) => state.template || {});

  console.log("XTemplate", XTemplate);

  let allTemplates = templates;
  const primaryTempltae = allTemplates[`${XTemplate}`];

  delete allTemplates[`${XTemplate}`];

  // if (_.isEmpty(XTemplate)) return <Loader message="loading list" />;

  return (
    <div className="services">
      <span className={styles.title}>
        {`Services for ${xCity.key} by ${XTemplate}`}
      </span>

      <div className={styles.twoItemFeed}>
        {primaryTempltae?.items?.map((item, i) => {
          return (
            <div key={i} className={styles.feedCard}>
              <span className={styles.emojiLabel}>
                {`${item.emoji}${item.label}`}
              </span>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .services {
          }
        `}
      </style>
    </div>
  );
};

export default Services;
