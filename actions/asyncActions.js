import {
  LOADING_STARTED,
  LOADING_FINISHED,
} from "../reducers/reducerConstants";

export const start = (message) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_STARTED, payload: message });
  };
};

export const finish = (message) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_FINISHED });
  };
};
