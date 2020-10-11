import { combineReducers } from "redux";
import { bottomDrawerReducer } from "./bottomDrawerReducer";

//import { scrollItemReducer } from "./scrollItemReducer";
//import { avatarMatchReducer } from "./avatarMatchReducer";

const rootReducer = combineReducers({
  bottomDrawer: bottomDrawerReducer,
});

export default rootReducer;
