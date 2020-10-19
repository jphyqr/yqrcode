import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { categories, cities } from "../constants/types";
import {
  SET_SCREEN_WIDTH,
  SELECT_USER,
  SELECT_USER_ID,
  SET_MODAL,
  SET_CITY,
} from "../reducers/reducerConstants";
import { SCREEN_WIDTH_MIN, SCREEN_TYPE } from "../constants/helperConstants";
import _ from "lodash";
import firebase from "../firebase";
import {
  modalComponents,
  modalTypes,
  verificationMap,
} from "../constants/modalConstants";
import Loader from "../components/Loader";
import { useSubCollection } from "../hooks/firestoreHooks";
import HorizontalBottomMenu from "./menus/HorizontalBottomMenu";
import VerticalMenu from "./menus/VerticalMenu";
import Fridge from "../components/magnets/Fridge";
import StoryMenu from "./menus/StoryMenu";
import SettingsMenu from "./menus/SettingsMenu";
const ResponsiveLayout = ({ children, bypassAuth }) => {
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

  const settingsRef = useRef(null);
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

  const [, profileChanged] = useState(false);

  useEffect(() => {
    profileChanged(true);
    const showNextVerification = () => {
      console.log("show verification map", verificationMap);
      if (profile.isLoaded && !profile.isEmpty) {
        Object.keys(verificationMap).map((modal) => {
          if (!profile[`${modal}`]) {
            dispatch({
              type: SET_MODAL,
              payload: modal,
            });
          } else {
            dispatch({
              type: SET_MODAL,
              payload: {},
            });
          }
        });
      }
    };

    showNextVerification();
  }, [profile]);

  useEffect(() => {
    if (auth.isLoaded && auth.isEmpty && bypassAuth)
      dispatch({ type: SET_MODAL, payload: {} });
  }, [bypassAuth]);

  if (auth.isLoaded && auth.isEmpty && !bypassAuth)
    dispatch({ type: SET_MODAL, payload: modalTypes.PhoneNumberModal });

  return (
    <div className={styles.menuContainer}>
      <div className={styles.modalContainer}>
        {renderModal()}

        <div className={styles.stickyContainer}>
          <div className={styles.topMenu}>
            <SettingsMenu
              top={_screenType === SCREEN_TYPE.MOBILE}
              closeClick={() => setTopRightMenu(false)}
              stickyLeft={settingsRef?.current?.offsetLeft + 30}
            />
          </div>

          {_screenType === SCREEN_TYPE.MOBILE && <HorizontalBottomMenu />}

          <div className={"headerNav"}>
            <div className={"topBar"}></div>

            <StoryMenu
              onBrainClick={() => setTopRightMenu(true)}
              setRef={settingsRef}
              mobile={_screenType === SCREEN_TYPE.MOBILE}
            />

            <style jsx>{`

        .topBar{
          display:flex;
          width: 100%;
          background-color:green;
        }

    
          .headerNav {
            position: sticky;
            flex-direction: column;
            margin-top: -50px;
            display: flex;
            flex-grow: 1;
            justify-content: space-between;
            top: 0px;
            background-color: green;
            padding: 3px;
            z-index: 10;
          }

       
          }
        `}</style>
          </div>
          <div className={styles.topContainer}>
            {_showUserProfile && (
              <div className={styles.bottomRightCard}>
                <span>{xUserId || "No Id"}</span>
                {Object.keys(xProfile).map((key, i) => {
                  return <span key={i}>{`${key}:${xProfile[`${key}`]}`}</span>;
                })}
              </div>
            )}{" "}
            {_screenType !== SCREEN_TYPE.MOBILE && (
              <aside>
                {/* <div className={styles.stickyCard}></div> */}
                <div className={styles.stickyAsideContainer}>
                  <VerticalMenu
                    onBrainClick={() => setTopRightMenu(true)}
                    setRef={settingsRef}
                  />
                </div>
              </aside>
            )}
            <div className="main">
              {xLoading && xLoadingMessage && (
                <Loader message={xLoadingMessage} />
              )}

              {children}
            </div>
            {_screenType !== SCREEN_TYPE.MOBILE && (
              <aside>
                {" "}
                <div className={styles.stickyAsideContainer}>
                  <Fridge cityKey={xCity.key} />
                </div>
              </aside>
            )}
            {/* <div className={styles.spacedRow}>
        <span>Footer</span>
        <span>Footer</span>
        <span>Footer</span>
      </div> */}
            <style jsx>
              {`
                .body {
                  display: flex;
                  height: 100%;
                  width: 100%;
                }
                .main {
                  width: ${_screenType === SCREEN_TYPE.MOBILE
                    ? "100%"
                    : `400px`};
                  height: 100%;

                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  overflow-y: auto;
                  overflow-x: hidden;
                  position: relative;
                }

                aside {
                  flex-grow: 1;
                  position: sticky;
                  background-color: white;
                  top: 50px;
                }
              `}
            </style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
