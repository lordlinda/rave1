import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index.js";
import FilterInput from "./FilterInput";
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
import Dialog from "@material-ui/core/Dialog";
import moment from "moment";

import {
  DialogContent,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";

const Transactions = (props) => {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState();
  const handleClose = (transaction) => {
    if (open === false) {
      setTransaction(transaction);
    }
    setOpen(!open);
  };
  useEffect(() => {
    props.getTransactions();
  }, []);
  const [duration, setDuration] = React.useState("today");
  const options = ["today", "this week", "this month"];
  return (
    <motion.div
      className="allTransactions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {props.loading ? (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      ) : (
        <>
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
                    <div
                      onClick={() => handleClose(transaction)}
                      key={transaction._id}
                    >
                      <Transaction transaction={transaction} />
                    </div>
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
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <List>
                <ListItem>
                  <h1>Transaction</h1>
                </ListItem>
                <ListItem>
                  <ListItemText>Date</ListItemText>
                  <ListItemSecondaryAction>
                    {moment(transaction?.createdAt).format("DD MMM YYYY")}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Amount</ListItemText>
                  <ListItemSecondaryAction>
                    {transaction?.currency} {transaction?.amount}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Type</ListItemText>
                  <ListItemSecondaryAction>
                    {transaction?.type}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Charges</ListItemText>
                  <ListItemSecondaryAction>0.00</ListItemSecondaryAction>
                </ListItem>
              </List>
            </DialogContent>
          </Dialog>
        </>
      )}
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
