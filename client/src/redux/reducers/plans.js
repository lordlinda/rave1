import {
  GET_TOTAL,
  GET_DASHBOARD_PLANS,
  GET_ALLPLANS,
  DELETE_PLAN,
  GET_PLAN,
  GET_SUBSCRIPTION,
  CONVERT_CURRENCY,
  SIGN_OUT,
  DELETE_SUBCRIPTION,
  GET_PLAN_NAMES,
} from "../actions/types.js";

const initialState = {
  total: 0,
  dashboardPlans: [],
  plans: [],
  plan: {},
  subscription: {},
  loading: false,
  isPlanLoading: true,
  isPlansLoading: true,
  isSubscriptionLoading: true,
  isDashLoading: true,
  isTotalLoading: false,
  planList: [],
};

//the reducer has the inital state and alters it based on the action
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL:
      return {
        ...state,
        isTotalLoading: false,
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
    case GET_PLAN_NAMES:
      return {
        ...state,
        planList: action.payload,
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
    case CONVERT_CURRENCY:
      return {
        ...state,
        isTotalLoading: true,
      };
    case SIGN_OUT:
      return {
        ...state,
      };
    case DELETE_SUBCRIPTION:
      return {
        ...state,
        plan: {
          ...state.plan.subscriptions.filter(
            (subscription) => subscription._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
