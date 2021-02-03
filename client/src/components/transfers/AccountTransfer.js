import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button, Input } from "@material-ui/core";
import BackArrow from "../Reusables/BackArrow";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { getAllPlans } from "../../redux/actions/plans";
import Account from "./Account";
import FlipMove from "react-flip-move";
import { loadUser } from "../../redux/actions/index";
import { accountTransfer } from "../../redux/actions/transfers";
import Processor from "../Reusables/Processor";
function AccountTransfer(props) {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  useEffect(() => {
    if (props.history.location.state) {
      setFrom(props.history.location.state.id);
    }
  }, [props.plans]);

  const account = () => {
    if (from === to) {
      toast.error("Cant transfer money to the same account");
    } else {
      /**transfer the money */
      if (!amount) {
        toast.error("Please fill in amount");
      } else {
        const data = {
          from,
          to,
          amount,
        };
        console.log(data);
        props.accountTransfer(data, props.history);
        /**transfer money */
        setFrom("");
        setTo("");
        setAmount("");
      }
    }
  };
  useEffect(() => {
    props.getAllPlans();
  }, []);

  const getFrom = (plan) => {
    if (plan._id === from) {
      setFrom("");
    } else {
      setFrom(plan._id);
    }
  };

  const getTo = (plan) => {
    if (plan._id === to) {
      setTo("");
    } else {
      setTo(plan._id);
    }
  };

  return (
    <div className="accountTransfer">
      <div className="accountTransfer__header">
        <BackArrow goBack={props.history} />
        <h1>Account Transfer</h1>
      </div>
      <div className="accountTransfer__plans">
        <p>From</p>
        <FlipMove>
          {props.plans.map((plan) => (
            <Account plan={plan} key={plan._id} id={from} getId={getFrom} />
          ))}
        </FlipMove>
      </div>
      <div className="accountTransfer__plans">
        <p>To</p>
        <FlipMove>
          {props.plans.map((plan) => (
            <Account plan={plan} key={plan._id} id={to} getId={getTo} />
          ))}
        </FlipMove>
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
      <div className="accountTransfer__button">
        <Button variant="outlined" className="editButton" onClick={account}>
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
    numbers: state.data.user.phoneNumber,
    loading: state.transfers.loading,
  };
};
export default connect(mapStateToProps, {
  getAllPlans,
  loadUser,
  accountTransfer,
})(AccountTransfer);
