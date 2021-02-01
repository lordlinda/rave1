import axios from "axios";
import { GET_DASHBOARD_TRANSACTIONS } from "./types";
import Cookies from "js-cookie";

export const getDashboardTransactions = () => async (dispatch) => {
  const token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refreshToken");
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.common["x-refresh-token"] = refreshToken;
  axios.defaults.withCredentials = true;

  try {
    const res = await axios.get("/transactions/dash/transactions");
    dispatch({
      type: GET_DASHBOARD_TRANSACTIONS,
      payload: res.data.transactions,
    });
  } catch (error) {
    console.log(error);
  }
};
