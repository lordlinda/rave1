import {
  GET_TOTAL,
  GET_DASHBOARD_PLANS,
  GET_ALLPLANS,
  DELETE_PLAN,
  GET_PLAN,
  GET_SUBSCRIPTION,
} from "../actions/types.js";

const initialState = {
  total: 0,
  dashboardPlans: [],
  plans: [],
  plan: {},
  subscription: {},
};

//the reducer has the inital state and alters it based on the action
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case GET_DASHBOARD_PLANS:
      return {
        ...state,
        dashboardPlans: action.payload,
      };
    case GET_ALLPLANS:
      return {
        ...state,
        plans: action.payload,
      };
    case DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((plan) => plan._id === action.payload),
      };
    case GET_PLAN:
      return {
        ...state,
        plan: action.payload,
      };
    case GET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };

    default:
      return state;
  }
};
