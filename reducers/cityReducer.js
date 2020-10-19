import { cities } from "../constants/types";
import { SET_CITY, CLEAR_CITY } from "./reducerConstants";

const initialState = cities.REGINA;

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
