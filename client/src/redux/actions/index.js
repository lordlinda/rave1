import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getTotalBalance, getDashboardPlans } from "./plans";
import { getDashboardTransactions } from "./transactions";

//this written here below are action creators
//they dispatch an action to a reducer with the maatching type
//which reducer alters the state
import {
  SIGN_UP,
  AUTH_ERROR,
  SIGN_IN,
  USER_LOADED,
  SIGN_OUT,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  UPLOAD_IMAGE,
} from "./types.js";

export const loadUser = () => async (dispatch) => {
  const token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refreshToken");
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.common["x-refresh-token"] = refreshToken;
  axios.defaults.withCredentials = true;

  await axios
    .get("/users/user")
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
      localStorage.setItem("email", res.data.user.email);
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const signUp = (user) => async (dispatch) => {
  await axios
    .post("/users/signup", user)
    .then((res) => {
      dispatch({
        type: SIGN_UP,
        payload: res.data,
      });
      localStorage.setItem("email", res.data.user);
      dispatch(getTotalBalance());
      dispatch(getDashboardTransactions());
      dispatch(getDashboardPlans());
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    });
};

export const signIn = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/users/signin", user);
    localStorage.setItem("email", res.data.user);
    dispatch({
      type: SIGN_IN,
      payload: res.data,
    });
    dispatch(getTotalBalance());
    dispatch(getDashboardTransactions());
    dispatch(getDashboardPlans());
  } catch (error) {
    toast.error(error.response?.data.msg);
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const getTransactions = (filters) => async (dispatch) => {
  await axios.post("/transactions", filters).then((res) => {
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data.transactions,
    });
  });
};

export const getTransaction = (id) => async (dispatch) => {
  await axios.get(`/transactions/${id}`).then((res) => {
    dispatch({
      type: GET_TRANSACTION,
      payload: res.data.transaction,
    });
  });
};

export const editUser = (data) => async () => {
  try {
    await axios.put("/users/editUser", data);
    toast.success("Details updated successfully");
  } catch (error) {
    console.log(error);
  }
};

export const signOut = (history) => (dispatch) => {
  localStorage.removeItem("name");
  Cookies.remove("access_token");
  Cookies.remove("refreshToken");
  history.push("/signin");
  dispatch({
    type: SIGN_OUT,
    payload: "",
  });
};

export const imageUpload = (data) => async (dispatch) => {
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  formData.append("file", data);
  try {
    const res = await axios.post("/users/uploadImage", formData, config);
    dispatch({
      type: UPLOAD_IMAGE,
      payload: res.data.filePath,
    });
    await axios.put("/users/editUser", { photoUrl: res.data.filePath });
    toast.success("user image updated successfully");
  } catch (error) {
    console.log(error);
  }
};

export const oauthGoogle = (token) => async (dispatch) => {
  try {
    const res = await axios.post("/users/google", { access_token: token });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.user);
    dispatch({
      type: SIGN_IN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const oauthFacebook = (token) => async (dispatch) => {
  try {
    const res = await axios.post("/facebook", { access_token: token });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.user);
    dispatch({
      type: SIGN_IN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/users/forgetPassword", data);
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error.response);
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/users/resetPassword", data);
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error.response);
  }
};
