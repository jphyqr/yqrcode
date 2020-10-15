import "../styles/globals.css";
import { Provider, useSelector } from "react-redux";
import { initializeStore } from "../config/store";
import withRedux from "next-redux-wrapper";
import { createFirestoreInstance } from "redux-firestore";
import styles from "../styles/Home.module.css";
import Info from "../components/Info";
import ResponsiveLayout from "../layout/ResponsiveLayout";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "../firebase";
import Router from "next/dist/client/router";
export const WrappedApp = ({ Component, ...props }) => {
  const xShowProductInfo = useSelector((state) => state.productInfo.show);

  if (props.router.asPath == "/")
    return (
      <div>
        Landing Page
        <button onClick={() => Router.push("/print/REGINA")}>Regina</button>
      </div>
    );

  return (
    <div className={styles.overlayContainer}>
      <div className="bottomDrawer">
        <Info />

        <style jsx>
          {`
            .bottomDrawer {
              position: absolute;
              height: 400px;
              width: 400px;
              left: 50%;
              transform: translateX(-50%);
              background-color: yellow;
              top: ${xShowProductInfo ? `400px` : `100vh`};
              transition: 0.3s linear;

              z-index: 5;
            }
          `}
        </style>
      </div>

      <ResponsiveLayout>
        <Component {...props} />
      </ResponsiveLayout>
    </div>
  );
};

function MyApp({ pageProps, store, ...otherProps }) {
  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
  };

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <WrappedApp {...otherProps} {...pageProps}></WrappedApp>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default withRedux(initializeStore)(MyApp);

// THERES SOME BROS IN THIS HOUSE
// THERS SOME BROS IN THIS HOUSE

// 6
// I said Buffalo And Greek,
// Middle of the week
// Wings and Pizza
// Make your heart rate peak

// yeah u fucki nwith some wings and pizza
// bring me non stp pop for these wings and pizza

// Perogy pizza, nigga, fuck the carbs
// Extra large and extra sauce ,
// put these chilis all over the plcae ,
// runny nose like you partied hard

// I wanna dip , dont wanna choke
// i want to toung that little dangy piece stuck n between the two bones
