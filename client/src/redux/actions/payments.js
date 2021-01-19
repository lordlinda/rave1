import {
  MAKE_PAYMENT,
  GET_PAYMENT_PLAN,
  ACTIVATE_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

/**this route is to get the total balance of the client
 * it was calculated from the client
 */
export const makePayment = (data) => async (dispatch) => {
  try {
    await axios.post("/payments/makePayment", data);
    toast.success("Payment Successful");
    dispatch({
      type: MAKE_PAYMENT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const schedulePayment = (data) => async (dispatch) => {
  try {
    await axios.post("/payments/schedulePayment", data);
    toast.success("successful payment");
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};

export const getPaymentPlan = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/payments/getPaymentPlan", data);
    console.log(res);
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
