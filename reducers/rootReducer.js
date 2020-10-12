import { combineReducers } from "redux";
import { productInfoReducer } from "./productInfoReducer";
import { serviceReducer } from "./serviceReducer";

//import { scrollItemReducer } from "./scrollItemReducer";
//import { avatarMatchReducer } from "./avatarMatchReducer";

const rootReducer = combineReducers({
  productInfo: productInfoReducer,
  service: serviceReducer,
});

export default rootReducer;
