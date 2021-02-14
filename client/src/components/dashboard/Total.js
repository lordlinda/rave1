import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTotalBalance,
  convertCurrency,
  getPlansList,
} from "../../redux/actions/plans";
import { currencyOptionsArray } from "../Reusables/select/Options.js";
import { numberWithCommas } from "../../helpers/middleware.js";
import "./total.css";
import { Button, DialogContent } from "@material-ui/core";
import { motion } from "framer-motion";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "../Reusables/select/Select";

const Total = ({
  total,
  loading,
  history,
  planList,
  getTotalBalance,
  convertCurrency,
  getPlansList,
}) => {
  const [currencySelected, setCurrency] = useState("UGX");
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("");
  const [type, setLink] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTotalBalance();
  }, []);

  const handleChange = async (currency) => {
    if (!loading && total > 0 && currency !== currencySelected) {
      await setCurrency(currency);
      const data = {
        amount: total,
        from: currencySelected,
        to: currency,
      };
      await convertCurrency(data);
    }
  };
  const getPlan = (type) => {
    getPlansList();
    setLink(type);
    setOpen(true);
  };

  const handlePlan = async (e) => {
    await setPlan(e.target.value);
    history.push(`${type}`, e.target.value);
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
        {numberWithCommas(total?.toFixed(2))}
      </motion.h1>
      <div className="total__buttons">
        <Button className="total__save" onClick={() => getPlan("/amount")}>
          Save now
        </Button>
        <Button
          className="total__automate"
          onClick={() => getPlan("/interval")}
        >
          Auto savings
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Choose a plan to topup`}</DialogTitle>
        <DialogContent className="selectPlan">
          <Select
            label="--select a plan-- "
            value={plan}
            onChange={handlePlan}
            planList={planList}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.plans.total,
    loading: state.plans.isTotalLoading,
    planList: state.plans.planList,
  };
};

export default connect(mapStateToProps, {
  getTotalBalance,
  convertCurrency,
  getPlansList,
})(Total);
