import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
const initialState = {};
const middlewares = [thunkMiddleware];
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});
// const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
export const initializeStore = (initialState, options) => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
