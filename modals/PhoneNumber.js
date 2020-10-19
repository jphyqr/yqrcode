import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL, SET_MODAL } from "../reducers/reducerConstants";
import styles from "../styles/Home.module.css";
import PhoneNumberInput from "../components/inputs/PhoneNumberInput";
import { start, finish } from "../actions/asyncActions";
import Loader from "../components/Loader";
import axios from "axios";
import firebase from "../firebase";
import { ROOT_URL } from "../constants/helperConstants";
import Router from "next/dist/client/router";
import ModalWrapper from "./ModalWrapper";
const PhoneNumber = () => {
  const [_phone, setPhone] = useState("");
  const [_phoneError, setPhoneError] = useState(false);
  const [_phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [_error, error] = useState(false);
  const [_errorText, errorText] = useState("");
  const [_codeSent, setCodeSent] = useState(false);
  const [_loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [_code, setCode] = useState("");
  const [_authenticating, setAuthenticating] = useState(false);

  const updateCode = async (value) => {
    setCode(value);
  };

  useEffect(() => {
    if (_code.length > 3) handleCodeEntered();
  }, [_code]);
  const updateIfMatchesPhonePattern = async (value) => {
    console.log("UPDATEIFMATCHES", value);
    if (value) {
      var numericReg = /^[0-9\b]+$/;
      if (numericReg.test(value)) {
        setPhone(value);
      }
    } else {
      setPhone(value);
    }
  };

  const handleCodeEntered = async () => {
    try {
      setAuthenticating(true);
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone: _phone,
        code: _code,
      });
      console.log("trying to sign in with", data.token);

      firebase.auth().signInWithCustomToken(data.token);
      dispatch({ type: SET_MODAL, payload: {} });
      setAuthenticating(false);
      // navigation.navigate("Main");
    } catch (err) {
      console.log({ err });
      console.log(err.response.data.error);
      error(true);
      errorText(err?.response?.data?.error || "Error");
      setCode("");
      setAuthenticating(false);
    }
  };

  const handleSubmit = async () => {
    console.log("SUBMIT");
    setCodeSent(false);
    setPhoneErrorMsg("");
    setPhoneError(false);

    setLoading(true);

    try {
      if (_phone.length !== 10) {
        setPhoneError(true);
        setPhoneErrorMsg("Phone should be 10 digits long");
        setLoading(false);
        return;
      }

      await axios.post(`${ROOT_URL}/createUserByPhone`, {
        phone: _phone,
      });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, {
        phone: `+1${_phone}`,
      });
      setCodeSent(true);
      setLoading(false);

      //  navigation.navigate("EnterCode");
    } catch (err) {
      console.log(err);
      error(true);
      errorText(err);
      setLoading(false);
    }
  };

  return (
    <ModalWrapper>
      <div className={styles.modal}>
        <div className={styles.dimmerContainer}>
          <div className={styles.dimmer} />

          {_authenticating ? (
            <div className={styles.overlay}>
              <div className={styles.spinner} />
              <span>{`Authenticating...`}</span>
            </div>
          ) : _loading ? (
            <div className={styles.overlay}>
              <div className={styles.spinner} />
              <span>{`Sending Code to ${_phone}`}</span>
            </div>
          ) : _codeSent ? (
            <div className={styles.overlay}>
              <span>Enter code sent to phone</span>
              <input
                placeholder="1234"
                required
                maxLength={4}
                value={_code}
                onChange={(p) => updateCode(p.target.value)}
              />
              {_error && <span>{_errorText}</span>}

              <button onClick={handleSubmit}>Resend Code</button>
            </div>
          ) : (
            <div className={styles.overlay}>
              <span>Authenticate with Phone Number</span>
              <input
                type="phone"
                placeholder="3069999999"
                required
                maxLength={10}
                value={_phone}
                onChange={(p) => updateIfMatchesPhonePattern(p.target.value)}
              />
              <button onClick={handleSubmit}>Send Code</button>
              <button
                onClick={() => {
                  Router.push("/");
                }}
              >
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PhoneNumber;
