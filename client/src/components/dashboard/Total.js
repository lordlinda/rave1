import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalBalance, convertCurrency } from "../../redux/actions/plans";
import { currencyOptionsArray } from "../Reusables/select/Options.js";
import { numberWithCommas } from "../../helpers/middleware.js";
import "./total.css";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";

const Total = (props) => {
  const [currencySelected, setCurrency] = useState("UGX");
  useEffect(() => {
    props.getTotalBalance();
  }, []);

  const handleChange = async (currency) => {
    if (!props.loading && props.total > 0 && currency !== currencySelected) {
      await setCurrency(currency);
      const data = {
        amount: props.total,
        from: currencySelected,
        to: currency,
      };
      await props.convertCurrency(data);
    }
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
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {numberWithCommas(props.total?.toFixed(2))}
      </motion.h1>
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
    loading: state.plans.isTotalLoading,
  };
};

export default connect(mapStateToProps, { getTotalBalance, convertCurrency })(
  Total
);
