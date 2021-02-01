import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk"; // no changes here
import reducer from "./reducers/index.js";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("access_token");
const refreshToken = Cookies.get("refreshToken");
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.headers.common["x-refresh-token"] = refreshToken;
axios.defaults.withCredentials = true;

const store = createStore(
  reducer,
  {
    auth: {
      isAuth: false,
      loading: false,
    },
  },
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
    // other store enhancers if any
  )
);

export default store;
