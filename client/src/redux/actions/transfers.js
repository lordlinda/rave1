import axios from "axios";
import { toast } from "react-toastify";
import {
  TRANSFERS_LOADING,
  MOBILE_MONEY,
  BANK_TRANSFER,
  ACCOUNT_TRANSFER,
  PAYMENT_FAILURE,
  PROCESSING_PAYMENT,
} from "./types";
/**this route is to transfer money from one plan to another
 */
export const accountTransfer = (data, history) => async (dispatch) => {
  dispatch({
    type: PROCESSING_PAYMENT,
  });
  try {
    const res = await axios.post("/transfers/account", data);
    dispatch({
      type: ACCOUNT_TRANSFER,
    });
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    toast.error(error?.response?.data.msg);
    dispatch({
      type: PAYMENT_FAILURE,
    });
  }
};

export const mobileTransfer = (data, history) => async (dispatch) => {
  dispatch({
    type: PROCESSING_PAYMENT,
  });
  try {
    const res = await axios.post("/transfers/mobile", data);
    dispatch({
      type: MOBILE_MONEY,
      payload: data,
    });
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    toast.error(error?.response?.data.msg);
    dispatch({
      type: PAYMENT_FAILURE,
    });
  }
};

export const bankTransfer = (data, history) => async (dispatch) => {
  dispatch({
    type: PROCESSING_PAYMENT,
  });
  try {
    const res = await axios.post("/transfers/bank", data);
    dispatch({
      type: BANK_TRANSFER,
      payload: data,
    });
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    toast.error(error?.response?.data.msg);
    dispatch({
      type: PAYMENT_FAILURE,
    });
  }
};

export const addNumber = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/transfers/addNumber", data);
  } catch (error) {
    console.log(error);
  }
};

export const addBankAcct = (data, history) => async (dispatch) => {
  dispatch({
    type: TRANSFERS_LOADING,
  });
  try {
    const res = await axios.post("/transfers/addBankAcct", data);
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};
