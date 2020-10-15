//REDUCERS AER PURE FUNCTIONS

import { CLOSE_MODAL, SET_MODAL } from "./reducerConstants";
import { modalTypes } from "../constants/modalConstants";

//expor because we are going to combine in combineReducers
const initialState = {};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return action.payload;
    case CLOSE_MODAL:
      return {};
    default:
      return state;
  }
};
