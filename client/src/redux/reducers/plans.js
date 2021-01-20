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
  loading: true,
  isPlanLoading: true,
  isPlansLoading: true,
  isSubscriptionLoading: true,
};

//the reducer has the inital state and alters it based on the action
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL:
      return {
        ...state,
        loading: false,
        total: action.payload,
      };
    case GET_DASHBOARD_PLANS:
      return {
        ...state,
        loading: false,
        dashboardPlans: action.payload,
      };
    case GET_ALLPLANS:
      return {
        ...state,
        isPlansLoading: false,
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
        isPlanLoading: false,
        plan: action.payload,
      };
    case GET_SUBSCRIPTION:
      return {
        ...state,
        isSubscriptionLoading: false,
        subscription: action.payload,
      };

    default:
      return state;
  }
};
