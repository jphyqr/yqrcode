import { cities } from "../constants/types";
import { SET_CITY, CLEAR_CITY, SET_CATEGORY } from "./reducerConstants";

const initialState = "FOOD";

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};
