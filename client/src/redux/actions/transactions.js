import axios from "axios";
import { GET_DASHBOARD_TRANSACTIONS } from "./types";

export const getDashboardTransactions = () => async (dispatch) => {
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
