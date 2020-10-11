import React from "react";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { TOGGLE_OVERLAY } from "../reducers/reducerConstants";

const SelectProduct = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.dimmer} />

      <div className={styles.overlay}>
        <div className={styles.formFieldContainer}>
          <label className={styles.formLabel}>Select Product</label>
          <div className={styles.list}>
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
                        dispatch({ type: TOGGLE_OVERLAY, payload: true })
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
