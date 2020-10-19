import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../hooks/outsideClick";
import { SET_MODAL } from "../reducers/reducerConstants";
import styles from "../styles/Home.module.css";
const ModalWrapper = ({ children }) => {
  const node = useRef(null);
  const dispatch = useDispatch();
  useOutsideClick(node, () => dispatch({ type: SET_MODAL, payload: {} }));

  return (
    <div className="modal-container">
      <div className="sticky">
        <div className="dimmer-container">
          <div className={styles.dimmer} />
          <div ref={node}>{children}</div>
        </div>
      </div>

      <style jsx>{`

      .dimmer-contaimer {

        position: relative;
        height: 100%;
        width: 100%;
      }
        .sticky {
          position: sticky;
          top 50px;
          left: 50%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          height: 100vh;
          width: 100vw;
        
        }
        .modal-container {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
      
          z-index: 10;
         
        }
      `}</style>
    </div>
  );
};

export default ModalWrapper;
