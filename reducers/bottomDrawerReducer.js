import { TOGGLE_OVERLAY } from "./reducerConstants";

const initialState = {
  show: false,
};

export const bottomDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return Object.assign(state, { show: action.payload });
    default:
      return state;
  }
};
