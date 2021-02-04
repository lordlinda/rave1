import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Input from "./Reusables/Input";
import "./Password.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../redux/actions/index";

function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
    } else {
      /**reset password function */
      props.resetPassword(password);
    }
  };
  return (
    <div className="resetPassword">
      <h1>Reset Password</h1>
      <div>
        <form onSubmit={resetPassword}>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" className="resetButton">
            reset password
          </Button>
        </form>
        <Link to="/signin">Back to login page</Link>
      </div>
    </div>
  );
}

export default connect(null, { resetPassword })(ResetPassword);
