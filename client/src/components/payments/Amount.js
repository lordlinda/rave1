import React from "react";
import Input from "../Reusables/Input.js";
import { connect } from "react-redux";
import { makePayment } from "../../redux/actions/payments";
import { setAmount, setCurrency } from "../../redux/actions/filterActions";

import Select from "../Reusables/select/Select.js";
import BackArrow from "../Reusables/BackArrow.js";
import { currencyOptionsArray } from "../Reusables/select/Options.js";
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
        <p>Amount</p>
      </div>
      <div className="amountPage__body">
        <div className="amountPage__amount">
          <Select
            label="curr"
            value={props.currency}
            onChange={handleCurrency}
            options={currencyOptionsArray}
          />
          <Input
            placeholder="Amount"
            value={props.amount}
            onChange={handleAmount}
            type="number"
          />
        </div>
        <div className="amountPage__button">
          <Button
            disabled={!props.currency || !props.amount}
            variant="contained"
            onClick={handleClick}
            className={`${!props.currency || (!props.amount && "disabled")}`}
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
