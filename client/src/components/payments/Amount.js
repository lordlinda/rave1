import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makePayment } from "../../redux/actions/payments";
import { setAmount, setCurrency } from "../../redux/actions/filterActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import BackArrow from "../Reusables/BackArrow.js";
import "./amountPage.css";
import { Button } from "@material-ui/core";

function AmountPage({ history, currency, amount, setAmount, setCurrency }) {
  useEffect(() => {
    setCurrency(history.location.state.currency);
  }, []);
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleClick = () => {
    const data = {
      ...history.location.state,
      currency: currency,
      amount: amount,
    };
    history.push("/maturity", data);
  };
  return (
    <div className="amountPage">
      <div className="amountPage__header">
        <BackArrow goBack={history} />
        <h1>Amount</h1>
      </div>
      <div className="amountPage__body">
        <h1>How much would you like to save ?</h1>
        <div className="amountPage__amount">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amount}
              onChange={handleAmount}
              startAdornment={
                <InputAdornment position="start">{currency}</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </div>
        <div className="amountPage__button">
          <Button
            disabled={!currency || !amount}
            variant="contained"
            onClick={handleClick}
            className={`${!currency || (!amount && "disabled")}`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.data.email,
    amount: state.filter.amount,
    currency: state.filter.currency,
    plans: state.plans.dashboardPlans,
  };
};
export default connect(mapStateToProps, {
  makePayment,
  setAmount,
  setCurrency,
})(AmountPage);
