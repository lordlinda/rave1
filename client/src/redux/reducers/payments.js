import { GET_PAYMENT_PLAN } from "../actions/types.js";

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
    default:
      return state;
  }
};
