//REDUCERS AER PURE FUNCTIONS

import { SET_TEMPLATE } from "./reducerConstants";

//expor because we are going to combine in combineReducers
const initialState = {};

export const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMPLATE:
      return action.payload;

    default:
      return state;
  }
};
