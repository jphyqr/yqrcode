import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClick } from "../hooks/outsideClick";
import { SET_MODAL } from "../reducers/reducerConstants";
import _ from "lodash";
import styles from "../styles/Home.module.css";
const ModalWrapper = ({ children }) => {
  const node = useRef(null);
  const dispatch = useDispatch();
  useOutsideClick(node, () => dispatch({ type: SET_MODAL, payload: {} }));
  const product = useSelector((state) => state.productInfo.product || {});

  return (
    <div className={styles.dimmerStacker}>
      <div className={styles.dimmer} />

      <div className="content" ref={node}>
        {children}
      </div>

      <style jsx>{`
        .content {
          position: absolute;

          top: 50%;
          width: 100%;
          transition: 0.4s linear;
        }

        @keyframes push-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(200px);
          }
        }
      `}</style>
    </div>
  );
};

export default ModalWrapper;
