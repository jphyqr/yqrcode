import { SELECT_USER, SELECT_USER_ID } from "./reducerConstants";

const initialState = {
  id: "",
  profile: {},
  auth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER_ID:
      return Object.assign(state, { id: action.payload });
    case SELECT_USER:
      console.log("SELECT USER PAYLODA", action.payload);
      return Object.assign(state, {
        id: action.payload.id,
        profile: action.payload.profile,
        auth: true,
      });
    default:
      return state;
  }
};
