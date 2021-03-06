import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Input from "../Reusables/Input.js";
import Button from "../Reusables/Button.js";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
import * as actions from "../../redux/actions/index.js";
import { GoogleLogin } from "react-google-login";

import { Box } from "@material-ui/core";
import Divider from "./Divider";
import signInImage from "../../images/undraw_sign_in_e6hj.svg";

const Signin = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //we want to ensure that the user has filled in
    //all the fields
    if (email && password) {
      //we send the data to the backend

      await props.signIn(formData);

      //if the user is signed in sucessfully we send them to the
      //home page
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const responseGoogle = (res) => {
    //console.log(res);
    props.oauthGoogle(res.accessToken);
  };

  const responseFacebook = (res) => {
    console.log(res);
    props.oauthFacebook(res.accessToken);
  };

  return (
    <div className="signIn">
      <div className="sideImg">
        <img src={signInImage} alt="signinImage" />
      </div>
      <div className="signIn__form">
        {props.isAuth ? <Redirect to="/" /> : null}
        <h1 className="">Welcome back!</h1>
        <p>Signin to get continue</p>
        <form onSubmit={handleSubmit} className="login__form">
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
          <div className="helper__text">
            <Link to="/forgetPassword">Forgot Password?</Link>
          </div>
          <div className="login__button">
            <Button isButton type="submit" title="Signin" />
          </div>
        </form>
        <Box width={300}>
          <Divider>or signin with</Divider>
        </Box>
        <div className="auth__buttons">
          {/*google login component*/}

          <GoogleLogin
            clientId="490182146410-vueb9fg2h1jhhnkpr8fmh5s51fgq77e6.apps.googleusercontent.com"
            buttonText="Continue with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="signIn__link">
          <span>NewMember ?</span>
          <Button title="Signup" href={"/signup"} />
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
export default connect(mapStateToProps, actions)(Signin);
