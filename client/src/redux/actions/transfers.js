import axios from "axios";
import { toast } from "react-toastify";
import {
  TRANSFERS_LOADING,
  MOBILE_MONEY,
  BANK_TRANSFER,
  ACCOUNT_TRANSFER,
} from "./types";
/**this route is to transfer money from one plan to another
 */
export const accountTransfer = (data, history) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSFERS_LOADING,
    });
    const res = await axios.post("/transfers/account", data);
    dispatch({
      type: ACCOUNT_TRANSFER,
    });
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
    toast.error("Transfer failed,please try again");
  }
};

export const mobileTransfer = (data, history) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSFERS_LOADING,
    });
    const res = await axios.post("/transfers/mobile", data);
    dispatch({
      type: MOBILE_MONEY,
      payload: data,
    });
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
    toast.error("Transfer failed,please try again");
  }
};

export const bankTransfer = (data, history) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSFERS_LOADING,
    });
    const res = await axios.post("/transfers/bank", data);
    dispatch({
      type: BANK_TRANSFER,
      payload: data,
    });
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
    toast.error("Transfer failed,please try again");
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
  try {
    dispatch({
      type: TRANSFERS_LOADING,
    });
    const res = await axios.post("/transfers/addBankAcct", data);
    history.push("/transfers");
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};
