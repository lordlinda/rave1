import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { Input, IconButton } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import BackArrow from "../Reusables/BackArrow";
import { connect } from "react-redux";
import { getAllPlans } from "../../redux/actions/plans";
import Account from "./Account";
import FlipMove from "react-flip-move";
import { loadUser } from "../../redux/actions/index";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { bankTransfer } from "../../redux/actions/transfers";
import { toast } from "react-toastify";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import Processor from "../Reusables/Processor";
function BankTransfer(props) {
  useEffect(() => {
    props.getAllPlans();
  }, []);
  useEffect(() => {
    props.loadUser();
  }, []);

  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const getFrom = (plan) => {
    if (plan === from) {
      setFrom("");
    } else {
      setFrom(plan);
    }
  };
  const getTo = (account) => {
    if (account === to) {
      setTo("");
    } else {
      setTo(account);
    }
  };

  const bank = () => {
    if (!to || !from || !amount) {
      toast.error("Please fill in all fields");
    } else if (amount < 100 && from.currency === "USD") {
      toast.error("Amout must be atleast 500");
    } else if (from.currency === "UGX" && amount < 1000) {
      toast.error("Amout must be atleast 1000");
    } else {
      const data = {
        id: from._id,
        amount,
        account_bank: to.account_bank,
        account_number: to.account_number,
      };
      props.bankTransfer(data, props.history);
    }
    /**transfer money */
  };
  useEffect(() => {
    if (props.history.location.state) {
      setFrom(props.history.location.state.id);
    }
  }, [props.plans]);
  return (
    <div className="bankTransfer">
      <div className="accountTransfer__header">
        <BackArrow goBack={props.history} />
        <h1> Bank Transfer</h1>
      </div>
      <div className="accountTransfer__plans">
        <p>From</p>
        <FlipMove>
          {props.plans.map((plan) => (
            <Account
              plan={plan}
              key={plan._id}
              id={from._id ? from._id : from}
              getId={getFrom}
            />
          ))}
        </FlipMove>
      </div>
      <div className="accountTransfer__plans">
        <p>to</p>
        <div>
          {props.accounts?.length > 0 ? (
            props.accounts?.map((account) => (
              <div
                className="bankAcct"
                onClick={() => getTo(account)}
                key={account.id}
              >
                <IconButton>
                  <AccountBalanceIcon />
                </IconButton>
                <div>
                  <p>{account.account_name}</p>
                  <p>{account.account_number}</p>
                </div>
                <div>{account === to && <CheckCircleIcon />}</div>
              </div>
            ))
          ) : (
            <Link to="/addBank">Add Bank Account</Link>
          )}
        </div>
      </div>
      <div className="accountTransfer__amount">
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
      </div>
      <div className="buttonContainer">
        <Button variant="outlined" className="editButton" onClick={bank}>
          Transfer
        </Button>
        {props.loading && (
          <Processor text="Transfer is processing,please wait" />
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
    accounts: state.data.user.bankAccounts,
    loading: state.transfers.loading,
  };
};
export default connect(mapStateToProps, {
  getAllPlans,
  loadUser,
  bankTransfer,
})(BankTransfer);
