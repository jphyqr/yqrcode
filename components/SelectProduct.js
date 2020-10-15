import React from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_PRODUCT_INFO } from "../reducers/reducerConstants";

const SelectProduct = ({ products }) => {
  const dispatch = useDispatch();
  const xService = useSelector((state) => state.service || {});

  return (
    <div>
      <div className="helpBox">
        <span className={styles.spacedRow}>
          <ul className="animatedList">
            <li>This Service offers different products</li>
            <li>Here is a list of common ones</li>
            <li>Feel free to call for live help!</li>
          </ul>

          <span className={styles.bigEmoji}>🐶</span>
        </span>

        <style jsx>
          {`
            .animatedList {
              display: flex;
              flex-direction: column;
            }

            li {
              opacity: 0;

              animation: appear 0.5s forwards;
            }

            li:nth-child(1) {
              animation-delay: 0.5s;
            }
            li:nth-child(2) {
              animation-delay: 2s;
            }
            li:nth-child(3) {
              animation-delay: 3s;
            }

            @keyframes appear {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .helpBox {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 90%;
              padding: 20px;

              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 10px;

              background-color: lightgreen;
              z-index: 10;
              animation: moveTopCorner 1s ease 4s forwards;
            }

            .helpBox span {
              font-size: 20px;
            }

            @keyframes moveTopCorner {
              0%: {
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 1;
              }
              100% {
                top: 5%;
                transform: translate(-50%, 0%);
                opacity: 0.7;
              }
            }
          `}
        </style>
      </div>

      <div className={styles.dimmer} />

      <div className={styles.overlay}>
        <div className={styles.formFieldContainer}>
          <label
            className={styles.formLabel}
          >{`Select ${xService.label} Product`}</label>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <span className={styles.labelWrapper}>
                <span>📞</span>
                <span>Call For Help</span>
              </span>

              <span className={styles.labelWrapper}>
                <span>24/7</span>
              </span>
            </div>

            {products.map((product, i) => {
              return (
                <div className={styles.listItem}>
                  <span className={styles.labelWrapper}>
                    <span>{product.emoji}</span>
                    <span>{product.label}</span>
                  </span>

                  <span className={styles.labelWrapper}>
                    <span>$</span>
                    <span>{product.averageCost}</span>
                  </span>

                  <span className={styles.labelWrapper}>
                    <span>⏱️</span>
                    <span>{product.duration}</span>
                  </span>

                  <span className={styles.labelWrapper}>
                    <span
                      onClick={() =>
                        dispatch({ type: SHOW_PRODUCT_INFO, payload: product })
                      }
                    >
                      {" "}
                      ℹ️{" "}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProduct;
