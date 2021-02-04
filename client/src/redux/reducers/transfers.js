import {
  TRANSFERS_LOADING,
  BANK_TRANSFER,
  ACCOUNT_TRANSFER,
  MOBILE_MONEY,
  SIGN_OUT,
} from "../actions/types.js";

const initialState = {
  loading: false,
};

//the reducer has the inital state and alters it based on the action
export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSFERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MOBILE_MONEY:
      return {
        loading: false,
      };
    case BANK_TRANSFER:
      return {
        loading: false,
      };
    case ACCOUNT_TRANSFER:
      return {
        loading: false,
      };
    case SIGN_OUT:
      return {
        state,
      };

    default:
      return state;
  }
};
