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
    <div className="dimmer-stacker">
      <div className={styles.dimmer} />

      <div className="content" ref={node}>
        {children}
      </div>

      <style jsx>{`
        .content {
          position: absolute;

          top: ${_.isEmpty(product) ? "50%" : "10%"};
          -webkit-transition: transform 200ms;
          -webkit-transition: -webkit-transform 200ms
          transition: 0.4s linear;
          left: 50%;
        }

        @keyframes push-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(200px);
          }
        }
        .dimmer-stacker {
          width: 100vw;
          position: relative;
          left: 0;
          top: 0;
          height: 100vh;

          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ModalWrapper;
