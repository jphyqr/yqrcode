import { SET_CITY, CLEAR_CITY, SET_SCREEN_WIDTH } from "./reducerConstants";

const initialState = {};

export const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_WIDTH:
      return action.payload;

    default:
      return state;
  }
};
