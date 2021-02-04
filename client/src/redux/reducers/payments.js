import {
  GET_PAYMENT_PLAN,
  SIGN_OUT,
  MAKE_PAYMENT,
  PROCESSING_PAYMENT,
  PAYMENT_FAILURE,
  MOBILE_MONEY,
  BANK_TRANSFER,
  ACCOUNT_TRANSFER,
} from "../actions/types.js";

const initialState = {
  id: "",
  paymentComplete: false,
};

//the reducer has the inital state and alters it based on the action
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_PLAN:
      return {
        ...state,
        id: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
      };
    case MAKE_PAYMENT:
    case MOBILE_MONEY:
    case BANK_TRANSFER:
    case ACCOUNT_TRANSFER:
    case PAYMENT_FAILURE:
      return {
        ...state,
        paymentComplete: false,
      };
    case PROCESSING_PAYMENT:
      return {
        ...state,
        paymentComplete: true,
      };

    default:
      return state;
  }
};
