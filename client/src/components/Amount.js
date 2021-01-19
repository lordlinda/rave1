import React from "react";
import Input from "./Reusables/Input.js";
import { connect } from "react-redux";
import { makePayment } from "../redux/actions/payments";
import { setAmount, setCurrency } from "../redux/actions/filterActions";

import Select from "./Reusables/select/Select.js";
import BackArrow from "./Reusables/BackArrow.js";
import { currencyOptionsArray } from "./Reusables/select/Options.js";
import "./amountPage.css";
import { Button } from "@material-ui/core";

function AmountPage(props) {
  const handleCurrency = (e) => {
    props.setCurrency(e.target.value);
  };
  const handleAmount = (e) => {
    props.setAmount(e.target.value);
  };

  const handleClick = () => {
    const data = {
      ...props.location.state,
      currency: props.currency,
      amount: props.amount,
    };
    props.history.push("/confirm", data);
  };

  return (
    <div className="amountPage">
      <div className="amountPage__header">
        <BackArrow goBack={props.history} />
        <p className="">Amount</p>
      </div>
      <div className="amountPage__amount">
        <Select
          label="currency"
          value={props.currency}
          onChange={handleCurrency}
          options={currencyOptionsArray}
        />
        <Input
          placeholder="0"
          value={props.amount}
          onChange={handleAmount}
          type="number"
        />
      </div>
      <Button
        disabled={!props.currency || !props.amount}
        variant="contained"
        className={`amountPage__button ${
          !props.currency || (!props.amount && "disabled")
        }`}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.data.email,
    amount: state.filter.amount,
    currency: state.filter.currency,
  };
};
export default connect(mapStateToProps, {
  makePayment,
  setAmount,
  setCurrency,
})(AmountPage);
