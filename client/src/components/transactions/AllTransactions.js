import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index.js";
import FilterInput from "./FilterInput";
import LabelBottomNavigation from "../Reusables/BottomNavigation";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./transactions.css";
import { motion } from "framer-motion";
import Transaction from "./Transaction.js";
import FlipMove from "react-flip-move";
import emptyTransaction from "../../images/undraw_wallet_aym5.svg";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Transactions = (props) => {
  useEffect(() => {
    props.getTransactions();
  }, []);
  const [duration, setDuration] = React.useState("today");
  const options = ["today", "this week", "this month"];
  return (
    <motion.div
      className="transactions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {props.loading && (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      )}
      <div className="transactions__header">
        <div className="transactions__top">
          <h1>Transactions</h1>
          <FormControl variant="outlined">
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <FilterInput />
        {/**we create something that looks like tabs but madewithout using tabs */}
        {/**all ,paymenttype,date icome or expense */}
      </div>
      <div className="transactions__list">
        {props.transactions.length > 0 ? (
          <FlipMove>
            {props.transactions &&
              props.transactions.map((transaction) => (
                <Transaction key={transaction._id} transaction={transaction} />
              ))}
          </FlipMove>
        ) : (
          <div className="empty__transaction">
            <img src={emptyTransaction} alt="no transactions" />
            <p>
              Start saving with pasbanc to see records of your daily
              transactions
            </p>
            <Button component={Link} to="/amount" className="editButton">
              Start Now
            </Button>
          </div>
        )}
      </div>
      <LabelBottomNavigation />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: state.data.transactions,
    loading: state.data.loading,
  };
};

export default connect(mapStateToProps, actions)(Transactions);
