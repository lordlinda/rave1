import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalBalance } from "../../redux/actions/plans";
import { currencyOptionsArray } from "../Reusables/select/Options.js";
import { numberWithCommas } from "../../helpers/middleware.js";
import "./total.css";
import { Button } from "@material-ui/core";
const Total = (props) => {
  const [currencySelected, setCurrency] = useState("");
  useEffect(() => {
    props.getTotalBalance();
  }, []);

  const handleChange = (currency) => {
    setCurrency(currency);
  };
  return (
    <div className="total">
      <div className="total__currency">
        {currencyOptionsArray.map((currency) => (
          <span
            className={`select ${currency === currencySelected && "active"}`}
            key={currency}
            onClick={() => handleChange(currency)}
          >
            {currency}
          </span>
        ))}
      </div>
      {/*the total container has a custom background color  and margin from the greeting with a border-radius*/}
      {/*the div above gives the text some distance from the borders*/}
      <div>Total Balance</div>
      <h1> {numberWithCommas(props.total)}</h1>
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

export default connect(mapStateToProps, { getTotalBalance })(Total);
