import { GET_PAYMENT_PLAN, SIGN_OUT } from "../actions/types.js";

const initialState = {
  id: "",
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
    default:
      return state;
  }
};
