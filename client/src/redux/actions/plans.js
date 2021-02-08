import {
  GET_TOTAL,
  GET_DASHBOARD_PLANS,
  GET_ALLPLANS,
  CREATE_PLAN,
  EDIT_PLAN,
  GET_PLAN,
  DELETE_PLAN,
  GET_SUBSCRIPTION,
  CONVERT_CURRENCY,
  DELETE_SUBCRIPTION,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

/**this route is to get the total balance of the client
 * it was calculated from the client
 */
export const getTotalBalance = () => async (dispatch) => {
  const token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refreshToken");
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.common["x-refresh-token"] = refreshToken;
  axios.defaults.withCredentials = true;
  try {
    const res = await axios.get("/plans/total");
    dispatch({
      type: GET_TOTAL,
      payload: res.data.total,
    });
  } catch (error) {
    console.log(error);
  }
};

export const convertCurrency = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CONVERT_CURRENCY,
    });
    const res = await axios.post("/plans/convert", data);
    dispatch({
      type: GET_TOTAL,
      payload: res.data.total,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardPlans = () => async (dispatch) => {
  try {
    const res = await axios.get("/plans/plans/dashboard");
    dispatch({
      type: GET_DASHBOARD_PLANS,
      payload: res.data.plans,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPlans = () => async (dispatch) => {
  try {
    const res = await axios.get("/plans");
    dispatch({
      type: GET_ALLPLANS,
      payload: res.data.plans,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPlan = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/plans/create", data);
    toast.success("Plan has been created sucessfully");
    dispatch({
      type: CREATE_PLAN,
      payload: res.data.plan,
    });
  } catch (error) {
    console.log(error);
    toast.error("Plan with such a name already exists");
  }
};

export const editPlan = (data) => async (dispatch) => {
  try {
    await axios.put(`/plans/editplan/${data.id}`, data);
    toast.success("Plan has been edited sucessfully");

    dispatch({
      type: EDIT_PLAN,
    });
  } catch (error) {
    toast.error("Plan not updated successfully");
  }
};

export const getPlan = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/plans/${id}`);
    dispatch({
      type: GET_PLAN,
      payload: res.data.plan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlan = (id) => async (dispatch) => {
  try {
    await axios.delete(`/plans/${id}`);
    toast.success("Plan successfully deleted");
    dispatch({
      type: DELETE_PLAN,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getSubscription = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/subscriptions/${id}`);
    dispatch({
      type: GET_SUBSCRIPTION,
      payload: res.data.subscription,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscription = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/subscriptions/${id}`);
    dispatch({
      type: DELETE_SUBCRIPTION,
      payload: id,
    });
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.msg);
  }
};
