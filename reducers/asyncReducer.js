import { LOADING_STARTED, LOADING_FINISHED } from "./reducerConstants";

const initialState = {
  loading: false,
  message: "",
};

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return Object.assign(state, { loading: true, message: action.payload });

    case LOADING_FINISHED:
      return Object.assign(state, { loading: false, message: "" });

    default:
      return state;
  }
};
