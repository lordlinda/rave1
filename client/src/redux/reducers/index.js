import { combineReducers } from "redux";
import dataReducer from "./data.js";
import authReducer from "./auth.js";
import filterReducer from "./filterReducer";
import plansReducer from "./plans";
import paymentsReducer from "./payments";
import transfersReducer from "./transfers";
//this is referred to as the auth reducer because it is where we keep all our
//reducers and combine them to form one
export default combineReducers({
  data: dataReducer,
  auth: authReducer,
  filter: filterReducer,
  plans: plansReducer,
  payment: paymentsReducer,
  transfers: transfersReducer,
});
