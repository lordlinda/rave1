import { SIGN_OUT } from "../actions/types";
const initialState = {
  paymentMethod: "",
  startDate: "",
  endDate: "",
  currency: "",
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
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.payload,
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
    default:
      return state;
  }
};
