import {
  USER_LOADED,
  GET_TRANSACTIONS,
  SEARCH_TRANSACTIONS,
  GET_TRANSACTION,
  GET_DASHBOARD_TRANSACTIONS,
  UPLOAD_IMAGE,
} from "../actions/types.js";

const initialState = {
  loading: true,
  filePath: "",
  transactions: [],
  user: {},
  transaction: {},
  dashboardTransactions: [],
};

//the reducer has the inital state and alters it based on the action
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_TRANSACTIONS:
    case SEARCH_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };

    case GET_TRANSACTION: {
      return {
        ...state,
        loading: false,
        transaction: action.payload,
      };
    }
    case GET_DASHBOARD_TRANSACTIONS:
      return {
        ...state,
        dashboardTransactions: action.payload,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        filePath: action.payload,
      };
    default:
      return state;
  }
};
