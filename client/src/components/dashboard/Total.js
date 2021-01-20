import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalBalance, convertCurrency } from "../../redux/actions/plans";
import { currencyOptionsArray } from "../Reusables/select/Options.js";
import { numberWithCommas } from "../../helpers/middleware.js";
import "./total.css";
import { Button } from "@material-ui/core";
const Total = (props) => {
  const [currencySelected, setCurrency] = useState("USD");
  useEffect(() => {
    props.getTotalBalance();
  }, []);

  const handleChange = (currency) => {
    const data = {
      amount: props.total,
      from: currencySelected,
      to: currency,
    };
    props.convertCurrency(data);
    setCurrency(currency);
  };
  return (
    <div className="total">
      {/*the total container has a custom background color  and margin from the greeting with a border-radius*/}
      {/*the div above gives the text some distance from the borders*/}
      <div>Total Balance</div>
      <div className="total__currency">
        {currencyOptionsArray.map((currency) => (
          <span
            className={`select ${
              currency === currencySelected ? "active" : "inactive"
            }`}
            key={currency}
            onClick={() => handleChange(currency)}
          >
            {currency}
          </span>
        ))}
      </div>
      <h1>{numberWithCommas(props.total.toFixed(2))}</h1>
      <div className="total__buttons">
        <Button className="total__save" component={Link} to="/amount">
          Save now
        </Button>
        <Button
          className="total__automate"
          component={Link}
          to="/createSubscription"
        >
          Auto savings
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.plans.total,
  };
};

export default connect(mapStateToProps, { getTotalBalance, convertCurrency })(
  Total
);
