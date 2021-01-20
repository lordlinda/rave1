import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Input from "./Reusables/Input.js";
import Button from "./Reusables/Button.js";
import { Redirect } from "react-router-dom";
import "./login.css";
import * as actions from "../redux/actions/index.js";

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

  return (
    <div className="siginIn">
      <div>
        {props.isAuth ? <Redirect to="/" /> : null}
        <h1 className="">Welcome!</h1>
        <form onSubmit={handleSubmit}>
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
          <Button isButton type="submit" title="Signup" />
        </form>
        <div className="signIn__link">
          <span>Already have an account ?</span>
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
