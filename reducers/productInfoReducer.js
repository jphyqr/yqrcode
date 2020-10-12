import { SHOW_PRODUCT_INFO, CLOSE_PRODUCT_INFO } from "./reducerConstants";

const initialState = {
  show: false,
  product: {},
};

export const productInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_PRODUCT_INFO:
      return Object.assign(state, { show: false, product: {} });

    case SHOW_PRODUCT_INFO:
      return Object.assign(state, { show: true, product: action.payload });

    default:
      return state;
  }
};
