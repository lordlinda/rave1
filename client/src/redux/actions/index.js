import axios from "axios";
import { toast } from "react-toastify";

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
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  await axios
    .get("/users/user")
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("name", res.data.user.username);
    })
    .catch((err) => {
      //console.log(err)
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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user);
      dispatch(loadUser());
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
    console.log(res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.user);
    dispatch({
      type: SIGN_IN,
      payload: res.data,
    });
  } catch (error) {
    toast.error(error.response.data.msg);
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

export const signOut = () => (dispatch) => {
  localStorage.removeItem("email");
  localStorage.removeItem("name");
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
  //console.log(files);
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
