import { SELECT_SERVICE, CLEAR_SERVICE } from "./reducerConstants";

const initialState = {};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SERVICE:
      console.log("REDUX SELECT SERIVE", action.payload);
      return action.payload;
    case CLEAR_SERVICE:
      return initialState;
    default:
      return state;
  }
};
