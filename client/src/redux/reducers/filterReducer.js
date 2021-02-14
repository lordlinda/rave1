import { SIGN_OUT, MAKE_PAYMENT } from "../actions/types";
const initialState = {
  paymentMethod: "",
  startDate: "",
  duration: "",
  currency: "UGX",
  interval: "",
  amount: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.payload,
      };
    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload,
      };

    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case "SET_INTERVAL":
      return {
        ...state,
        interval: action.payload,
      };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
      };
    case MAKE_PAYMENT:
      return {
        paymentMethod: "",
        startDate: "",
        duration: "",
        currency: "",
        interval: "",
        amount: "",
      };
    default:
      return state;
  }
};
