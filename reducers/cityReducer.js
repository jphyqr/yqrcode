import { SET_CITY, CLEAR_CITY } from "./reducerConstants";

const initialState = {};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY:
      return action.payload;
    case CLEAR_CITY:
      return initialState;
    default:
      return state;
  }
};
