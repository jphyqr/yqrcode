import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { cities } from "../constants/types";
import {
  SET_SCREEN_WIDTH,
  SELECT_USER,
  SELECT_USER_ID,
  SET_MODAL,
} from "../reducers/reducerConstants";
import { SCREEN_WIDTH_MIN, SCREEN_TYPE } from "../constants/helperConstants";
import _ from "lodash";
import firebase from "../firebase";
import { modalComponents, modalTypes } from "../constants/modalConstants";
import Loader from "../components/Loader";
import { useSubCollection } from "../hooks/firestoreHooks";
const ResponsiveLayout = ({ children }) => {
  const [_f, f] = useState(1);
  const [_users, setUsers] = useState([]);
  const firestore = firebase.firestore();
  const ref = firestore.collection("users");
  const xProfile = useSelector((state) => state.user.profile || {});
  const [_showUserProfile, setShowUserProfile] = useState(false);
  const [data, loading, error] = useSubCollection(ref);
  useEffect(() => {
    setUsers(data);

    f(_f + 1);
    console.log("got users", data);
  }, [data, loading, error]);
  const xUserId = useSelector((state) => state.user.id || "");
  const xCity = useSelector((state) => state.city || {});
  const router = useRouter();
  const dispatch = useDispatch();
  const [_screenType, setScreenType] = useState({});
  const xScreen = useSelector((state) => state.screen || {});
  const xModal = useSelector((state) => state.modal || {});
  const profile = useSelector((state) => state.firebase.profile || {});
  const auth = useSelector((state) => state.firebase.auth || {});
  const xLoading = useSelector((state) => state.async.loading || false);
  const xLoadingMessage = useSelector((state) => state.async.message || "");
  const inDev = process.env.NODE_ENV === "development" ? true : false;
  const [_topRightMenu, setTopRightMenu] = useState(false);
  if (typeof window !== "undefined") {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      setScreenType(xScreen);
    }, [xScreen]);

    useEffect(() => {
      if (typeof _screenType !== "undefined")
        dispatch({
          type: SET_SCREEN_WIDTH,
          payload:
            window.innerWidth > SCREEN_WIDTH_MIN[SCREEN_TYPE.WIDE]
              ? "WIDE"
              : window.innerWidth > SCREEN_WIDTH_MIN[SCREEN_TYPE.MEDIUM]
              ? "MEDIUM"
              : "MOBILE",
        });

      window.addEventListener("resize", updateWidthAndHeight);
      return () => window.removeEventListener("resize", updateWidthAndHeight);
    }, []);

    useEffect(() => {
      if (typeof screenType == "undefined")
        dispatch({
          type: SET_SCREEN_WIDTH,
          payload:
            window.innerWidth > SCREEN_WIDTH_MIN[SCREEN_TYPE.WIDE]
              ? "WIDE"
              : window.innerWidth > SCREEN_WIDTH_MIN[SCREEN_TYPE.MEDIUM]
              ? "MEDIUM"
              : "MOBILE",
        });

      window.addEventListener("resize", updateWidthAndHeight);
      return () => window.removeEventListener("resize", updateWidthAndHeight);
    }, [width]);

    const updateWidthAndHeight = () => {
      setWidth(window.innerWidth);
      dispatch({
        type: SET_SCREEN_WIDTH,
        payload:
          window.innerWidth > SCREEN_WIDTH_MIN[SCREEN_TYPE.WIDE]
            ? "WIDE"
            : window.innerWidth > SCREEN_WIDTH_MIN[SCREEN_TYPE.MEDIUM]
            ? "MEDIUM"
            : "MOBILE",
      });
    };
  }

  const renderModal = () => {
    console.log("RENDER MODAL CALLED", xModal);
    let ShowModal;

    if (!_.isEmpty(xModal)) {
      ShowModal = modalComponents[`${xModal}`];
      return <ShowModal />;
    }

    // if (profile.isLoaded && !profile.isEmpty)
    //   Object.keys(verificationMap).map((modal) => {
    //     if (!profile[`${modal}`]) {
    //       dispatch({ type: SET_MODAL, payload: modals[`${modal}`] });
    //     }
    //   });

    return <div></div>;
  };

  useEffect(() => {
    renderModal();
  }, [xModal]);

  useEffect(() => {
    if (auth.isLoaded && !auth.isEmpty)
      dispatch({ type: SET_MODAL, payload: {} });

    if (auth.isLoaded && auth.isEmpty) {
      setTopRightMenu(false);
    }
  }, [auth]);

  if (auth.isLoaded && auth.isEmpty)
    dispatch({ type: SET_MODAL, payload: modalTypes.PhoneNumberModal });

  return (
    <div className={styles.spacedPage}>
      {_showUserProfile && (
        <div className={styles.bottomRightCard}>
          <span>{xUserId || "No Id"}</span>
          {Object.keys(xProfile).map((key, i) => {
            return <span key={i}>{`${key}:${xProfile[`${key}`]}`}</span>;
          })}
        </div>
      )}
      {_topRightMenu && (
        <div className={styles.topRightMenu}>
          {auth && (
            <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
          )}
          <button onClick={() => router.push("/scripts")}>Scripts</button>
          <button onClick={() => setTopRightMenu(false)}>Close</button>
        </div>
      )}
      <div className={styles.spacedRow}>
        <span>{xCity?.label || "No City Selected"}</span>

        {inDev && (
          <select
            onChange={async (e) => {
              const userId = e.target.value;
              console.log("get user for ", userId);
              try {
                let userDoc = await firestore
                  .collection("users")
                  .doc(userId)
                  .get();
                console.log("user doc data", userDoc.data());

                dispatch({
                  type: SELECT_USER,
                  payload: { id: userId, profile: { ...userDoc.data() } },
                });
              } catch (error) {
                console.log("Error changing user", error);
              }
            }}
          >
            <option>Select User</option>
            {_users.map((user, i) => {
              return (
                <option selected={user.id === xUserId} key={i} value={user.id}>
                  {user.id}
                </option>
              );
            })}
          </select>
        )}

        {inDev && (
          <select onChange={(e) => router.push(`/${e.target.value}`)}>
            <option>Change City</option>
            {Object.keys(cities).map((city, i) => {
              return (
                <option selected={xCity.key === city} key={i} value={city}>
                  {cities[`${city}`].label}
                </option>
              );
            })}
          </select>
        )}

        <button onClick={() => setTopRightMenu(true)}>
          {profile?.displayName || "Log In"}
        </button>
      </div>
      )
      <div className="body">
        {_screenType !== SCREEN_TYPE.MOBILE && <aside>ASIDE</aside>}

        <main>
          {xLoading && xLoadingMessage && <Loader message={xLoadingMessage} />}
          {renderModal()}
          {children}
        </main>

        {_screenType !== SCREEN_TYPE.MOBILE && <aside>ASIDE</aside>}
      </div>
      <div className={styles.spacedRow}>
        <span>Footer</span>
        <span>Footer</span>
        <span>Footer</span>
      </div>
      <style jsx>
        {`
          .body {
            display: flex;
            height: 100%;
            width: 100%;
          }
          main {
            width: ${_screenType === SCREEN_TYPE.MOBILE ? "100%" : `400px`};
            height: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: auto;
            position: relative;
          }

          aside {
            flex-grow: 1;
          }
        `}
      </style>
    </div>
  );
};

export default ResponsiveLayout;
