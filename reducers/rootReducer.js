import { combineReducers } from "redux";
import { productInfoReducer } from "./productInfoReducer";
import { serviceReducer } from "./serviceReducer";
import { cityReducer } from "./cityReducer";
import { screenReducer } from "./screenReducer";
import { modalReducer } from "./modalReducer";
import { asyncReducer } from "./asyncReducer";
import { userReducer } from "./userReducer";
import { templateReducer } from "./templateReducer";
import { firestoreReducer, firebaseReducer } from "react-redux-firebase";
import { categoryReducer } from "./categoryReducer";

//import { scrollItemReducer } from "./scrollItemReducer";
//import { avatarMatchReducer } from "./avatarMatchReducer";

const rootReducer = combineReducers({
  productInfo: productInfoReducer,
  service: serviceReducer,
  city: cityReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  screen: screenReducer,
  modal: modalReducer,
  async: asyncReducer,
  user: userReducer,
  template: templateReducer,
  category: categoryReducer,
});

export default rootReducer;
