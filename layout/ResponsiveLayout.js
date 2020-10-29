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
  CLOSE_NUTRITION,
  CLOSE_STORE,
  CLOSE_SHARE_SNAP,
  CLOSE_VIEW_CATEGORY,
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
import VerticalSpacer from "../components/spacers/VerticalSpacer";
import NestedDiv from "./LockedDiv";
import { ScrollableProvider } from "./ScrollableProvider";
import LockedDiv from "./LockedDiv";
import CreateSnap from "../components/Snap/CreateSnap/CreateSnap";
import PreviewSnap from "../components/Snap/PreviewSnap/PreviewSnap";
import ViewFile from "../components/Snap/ViewFile/ViewFile";
import EditNutrition from "../components/Snap/CreateSnap/EditNutrition";
import EditStore from "../components/Snap/CreateSnap/EditStore";
import ShareSnap from "../components/Snap/CreateSnap/ShareSnap";
import ViewCategory from "../components/Snap/ViewCategory/ViewCategory";
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
  const showProduct = useSelector((state) => state.productInfo.show || false);

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

  //IOS SCROLL
  useEffect(() => {
    // add whn mounted
    const preventDefault = (e) => e.preventDefault();
    window.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
    // return function to be called when unmounted
    return () => {
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  const renderModal = () => {
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

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

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
    <div className={styles.isScrollLocked}>
      <div className={styles.modalContainer}>
        {renderModal()}

        {xLoading && xLoadingMessage && (
          <div className={styles.globalLoader}>
            <Loader message={xLoadingMessage} />
          </div>
        )}

        {auth.isLoaded && !auth.isEmpty && <CreateSnap />}

        {auth.isLoaded && !auth.isEmpty && <ViewFile />}

        {auth.isLoaded && !auth.isEmpty && <PreviewSnap />}
        {auth.isLoaded && !auth.isEmpty && (
          <EditNutrition exit={() => dispatch({ type: CLOSE_NUTRITION })} />
        )}

        {auth.isLoaded && !auth.isEmpty && (
          <EditStore exit={() => dispatch({ type: CLOSE_STORE })} />
        )}

        {auth.isLoaded && !auth.isEmpty && (
          <ShareSnap exit={() => dispatch({ type: CLOSE_SHARE_SNAP })} />
        )}

        {auth.isLoaded && !auth.isEmpty && (
          <ViewCategory exit={() => dispatch({ type: CLOSE_VIEW_CATEGORY })} />
        )}

        <div className={"product-info"}>
          <style jsx>{`
            .product-info {
              height: 400px;
              width: 100%;
              background-color: white;
              position: absolute;
              bottom: ${showProduct ? "100px" : "-400px"};
              left: 0;
              transition: 0.5s ease;
              z-index: 12;
            }
          `}</style>
        </div>

        <div className={styles.stickyContainer}>
          {_topRightMenu && _screenType === SCREEN_TYPE.MOBILE && (
            <div className={"top-left-drawer-menu"}>
              <SettingsMenu
                top={_screenType === SCREEN_TYPE.MOBILE}
                closeClick={() => setTopRightMenu(false)}
                stickyLeft={settingsRef?.current?.offsetLeft + 30}
              />
              <style jsx>
                {`
                  .top-left-drawer-menu {
                    height: auto;
                    width: auto;
                    position: sticky;
                    z-index: 3;
                    top: 0px;
                    margin-top: -300px;
                    transform: translateY(-100%);
                    animation: slidedown 0.5s forwards;
                    margin-left: ${settingsRef?.current?.offsetLeft + 30}px;
                  }
                  @keyframes slidedown {
                    0% {
                      transform: translateY(-100%);
                    }

                    100% {
                      transform: translateY(0%);
                    }
                  }
                `}
              </style>
            </div>
          )}

          {_topRightMenu && _screenType !== SCREEN_TYPE.MOBILE && (
            <div className={"bottom-left-drawer-menu"}>
              <SettingsMenu
                top={_screenType === SCREEN_TYPE.MOBILE}
                closeClick={() => setTopRightMenu(false)}
                stickyLeft={settingsRef?.current?.offsetLeft + 30}
              />
              <style jsx>
                {`
                  .bottom-left-drawer-menu {
                    height: auto;
                    width: auto;
                    position: sticky;
                    z-index: 3;
                    top: ${window.innerHeight - 300}px;
                    margin-top: -300px;
                    transform: translateY(100%);
                    margin-left: ${settingsRef?.current?.offsetLeft + 30}px;
                    animation: slideup 0.5s forwards;
                  }
                  @keyframes slideup {
                    0% {
                      transform: translateY(100%);
                    }

                    100% {
                      transform: translateY(0%);
                    }
                  }
                `}
              </style>
            </div>
          )}

          {_screenType === SCREEN_TYPE.MOBILE && <HorizontalBottomMenu />}

          <div className={"headerNav"}>
            <StoryMenu
              onBrainClick={() => setTopRightMenu(true)}
              setRef={settingsRef}
              mobile={_screenType === SCREEN_TYPE.MOBILE}
            />

            <style jsx>{`

     

    
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
            z-index: 2;
          }

       
          }
        `}</style>
          </div>
          <div
            onScroll={() => console.log("SCROLL 2")}
            className={styles.topContainer}
          >
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
            <div className="main" onScroll={() => console.log("SCROLLING")}>
              {_screenType !== SCREEN_TYPE.MOBILE && (
                <VerticalSpacer height={50} />
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
                  min-height: 100vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  overflow-y: auto;
                  overflow-x: hidden;
                  position: relative;
                  -webkit-overflow-scrolling: touch;
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
