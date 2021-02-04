import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Input from "./Reusables/Input";
import { connect } from "react-redux";
import { forgotPassword } from "../redux/actions/index";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ForgetPassword(props) {
  const [email, setEmail] = useState("");
  const forgetPassword = (e) => {
    e.preventDefault();
    if (email) {
      props.forgotPassword(email);
    } else {
      toast.error("please fill in the email field");
    }
    setEmail("");
  };
  return (
    <div className="forgetPassword">
      <div>
        <h1>Forgotten your password</h1>
        <p>
          Enter your email address and we will send u a link to reset your
          password
        </p>
      </div>
      <form onSubmit={forgetPassword}>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="resetButton">
          send email
        </Button>
      </form>
      <Link to="/signin">Back to login page</Link>
    </div>
  );
}

export default connect(null, { forgotPassword })(ForgetPassword);
