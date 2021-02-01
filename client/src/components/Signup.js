import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Input from "./Reusables/Input.js";
import Button from "./Reusables/Button.js";
import { Redirect } from "react-router-dom";
import "./login.css";
import * as actions from "../redux/actions/index.js";
import { GoogleLogin } from "react-google-login-component";

import FacebookLogin from "react-facebook-login";
import { Box } from "@material-ui/core";
import Divider from "./Divider";
import FacebookIcon from "@material-ui/icons/Facebook";
const Signup = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //we want to ensure that the user has filled in
    //all the fields
    if (username && email && password && confirmPassword) {
      //we send the data to the backend
      if (confirmPassword !== password) {
        toast.error("Password and confirm Password must match");
      } else {
        await props.signUp(formData);
      }

      //if the user is signed in sucessfully we send them to the
      //home page
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const responseGoogle = (res) => {
    console.log(res);
  };

  const responseFacebook = (res) => {
    console.log(res);
    props.oauthFacebook(res.accessToken);
  };

  return (
    <div className="signIn">
      <div>
        {props.isAuth ? <Redirect to="/" /> : null}
        <h1 className="">Welcome!</h1>
        <p>Signup to get started</p>
        <form onSubmit={handleSubmit} className="login__form">
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={handleChange("username")}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={handleChange("email")}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={handleChange("password")}
          />
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleChange("confirmPassword")}
          />
          <div className="login__button">
            <Button isButton type="submit" title="Signup" />
          </div>
        </form>
        <Box>
          <Divider>or signup with</Divider>
        </Box>
        <div className="auth__buttons">
          <FacebookLogin
            appId="953574055178048"
            autoLoad={true}
            textButton=""
            fields="name,email,picture"
            callback={responseFacebook}
            icon={<FacebookIcon />}
          />
          {/*google login component*/}
          <GoogleLogin
            socialId="490182146410-vueb9fg2h1jhhnkpr8fmh5s51fgq77e6.apps.googleusercontent.com"
            className="google__button"
            responseHandler={responseGoogle}
            buttonText="Login With Google"
          />
        </div>
        <div className="signIn__link">
          <span>Alreadymember ?</span>
          <Button title="Signin" href={"/signin"} />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    name: state.auth.name,
  };
};
export default connect(mapStateToProps, actions)(Signup);
