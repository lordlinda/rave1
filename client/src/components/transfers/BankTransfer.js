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
    setFrom(plan);
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
            <Account plan={plan} key={plan._id} id={from._id} getId={getFrom} />
          ))}
        </FlipMove>
      </div>
      <div className="accountTransfer__plans">
        <p>to</p>
        <div>
          {props.accounts?.map((account) => (
            <div
              className="bankAcct"
              onClick={() => setTo(account)}
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
          ))}
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
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
    accounts: state.data.user.bankAccounts,
  };
};
export default connect(mapStateToProps, {
  getAllPlans,
  loadUser,
  bankTransfer,
})(BankTransfer);
