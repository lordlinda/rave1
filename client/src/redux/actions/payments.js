import {
  MAKE_PAYMENT,
  GET_PAYMENT_PLAN,
  ACTIVATE_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
  PROCESSING_PAYMENT,
  PAYMENT_FAILURE,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

/**this route is to get the total balance of the client
 * it was calculated from the client
 */
export const makePayment = (data, history) => async (dispatch) => {
  try {
    dispatch({
      type: PROCESSING_PAYMENT,
    });
    const res = await axios.post("/payments/makePayment", data);
    history.push("/");
    toast.success("Payment Successful");
    dispatch({
      type: MAKE_PAYMENT,
      payload: res.data.transaction,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PAYMENT_FAILURE,
    });
  }
};

export const schedulePayment = (data, history) => async (dispatch) => {
  try {
    dispatch({
      type: PROCESSING_PAYMENT,
    });
    const res = await axios.post("/payments/schedulePayment", data);
    history.push("/");
    toast.success("successful payment");
    dispatch({
      type: MAKE_PAYMENT,
      payload: res.data.transaction,
    });
  } catch (error) {
    console.log(error);
    toast.error(error);
    dispatch({
      type: PAYMENT_FAILURE,
    });
  }
};

export const getPaymentPlan = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/payments/getPaymentPlan", data);
    dispatch({
      type: GET_PAYMENT_PLAN,
      payload: res.data.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const activateSubscription = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/payments/activateSubscription/${id}`);
    toast.success("subscription activated");
    dispatch({
      type: ACTIVATE_SUBSCRIPTION,
      payload: res.data.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelSubscription = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/payments/cancelSubscription/${id}`);
    toast.success("subscription cancelled");
    dispatch({
      type: CANCEL_SUBSCRIPTION,
      payload: res.data.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSubscription = (data) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/payments/updateUserSubscription/${data.id}`,
      data
    );
    toast.success("subscription updated successfully");
    dispatch({
      type: UPDATE_SUBSCRIPTION,
      payload: res.data.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const rolloverSavings = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/payments/rollover", data);
    /**we have to decrease amount available */
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};
