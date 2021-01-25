import {} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

/**this route is to transfer money from one plan to another
 */
export const accountTransfer = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/transfers/account", data);
    history.push("/transfers");
    console.log(res);
    toast.success(res.data.msg);
  } catch (error) {
    toast.error(error.msg);
    console.log(error);
  }
};

export const mobileTransfer = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/transfers/mobile", data);
    history.push("/transfers");
    console.log(res);
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};

export const bankTransfer = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/transfers/bank", data);
    history.push("/transfers");
    console.log(res);
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};

export const addNumber = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/transfers/addNumber", data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const addBankAcct = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/transfers/addBankAcct", data);
    history.push("/transfers");
    console.log(res);
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};
