import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Input from "./Reusables/Input.js";
import Button from "./Reusables/Button.js";
import { Redirect } from "react-router-dom";
import * as actions from "../redux/actions/index.js";
import "./login.css";

const Signin = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData)
    //we want to ensure that the user has filled in
    //all the fields
    console.log(formData);
    if (email && password) {
      //we send the data to the backend
      props.signIn(formData);
      //if the user is signed in sucessfully we send them to the
      //home page
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="siginIn">
      <div>
        {props.isAuth ? <Redirect to="/" /> : null}
        <h1 className="">Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={handleChange("email")}
            fullWidth
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={handleChange("password")}
          />
          <Button isButton={true} type="submit" title="Signin" />
        </form>
        <div className="signIn__link">
          <span className="">Don't have an account ?</span>
          <Button title="Signup" href={"/signup"} moreStyle="" />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps, actions)(Signin);
