import axios from "axios";
export const setCurrency = (currency) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CURRENCY",
      payload: currency,
    });
  };
};

export const setStartDate = (startDate) => {
  return (dispatch) => {
    dispatch({
      type: "SET_START_DATE",
      payload: startDate,
    });
  };
};

export const setEndDate = (endDate) => {
  return (dispatch) => {
    dispatch({
      type: "SET_END_DATE",
      payload: endDate,
    });
  };
};

export const setpaymentMethod = (paymentMethod) => {
  return (dispatch) => {
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: paymentMethod,
    });
  };
};

export const searchTransactions = (filters) => async (dispatch) => {
  await axios.post("/transactions", filters).then((res) => {
    dispatch({
      type: "SEARCH_TRANSACTIONS",
      payload: res.data.transactions,
    });
  });
};
export const setInterval = (interval) => {
  return (dispatch) => {
    dispatch({
      type: "SET_INTERVAL",
      payload: interval,
    });
  };
};
export const setAmount = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "SET_AMOUNT",
      payload: amount,
    });
  };
};
