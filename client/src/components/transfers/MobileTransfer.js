import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button, Input } from "@material-ui/core";
import BackArrow from "../Reusables/BackArrow";
import { connect } from "react-redux";
import { getAllPlans } from "../../redux/actions/plans";
import Account from "./Account";
import FlipMove from "react-flip-move";
import { loadUser } from "../../redux/actions/index";
import { mobileTransfer } from "../../redux/actions/transfers";
import { toast } from "react-toastify";
import Processor from "../Reusables/Processor";

function MobileTransfer({
  loading,
  history,
  plans,
  mobileTransfer,
  loadUser,
  getAllPlans,
}) {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [phone, setPhone] = useState("");
  const mobile = () => {
    if (!phone || !from || !amount) {
      toast.error("Please fill in all fields");
    } else if (phone.length < 10) {
      toast.error("please enter a  valid phone number");
    } else if (amount < 1000) {
      toast.error("Amout must be atleast 1000");
    } else {
      const data = {
        id: from,
        amount,
        phone: `256${phone.substr(1)}`,
      };
      mobileTransfer(data, history);
    }
  };
  /**transfer money */

  useEffect(() => {
    getAllPlans();
  }, []);
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    if (history.location.state) {
      setFrom(history.location.state.id);
    }
  }, [plans]);
  const getFrom = (plan) => {
    if (plan._id === from) {
      setFrom("");
    } else {
      setFrom(plan._id);
    }
  };
  return (
    <div className="mobile">
      <div className="accountTransfer__header">
        <BackArrow goBack={history} />
        <h1>Mobile Money</h1>
      </div>
      <div className="accountTransfer__plans">
        <h1>From</h1>
        <FlipMove>
          {plans.map((plan) => (
            <Account plan={plan} key={plan._id} id={from} getId={getFrom} />
          ))}
        </FlipMove>
      </div>
      <div>
        <div className="accountTransfer__amount">
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Phone Number
            </InputLabel>
            <Input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ minLength: 12 }}
            />
          </FormControl>
        </div>
      </div>
      <div className="accountTransfer__amount">
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
      </div>
      <div className="buttonContainer">
        <Button variant="outlined" className="editButton" onClick={mobile}>
          Transfer
        </Button>
        {loading && <Processor text="Transfer is processing,please wait" />}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
    loading: state.payment.paymentComplete,
  };
};
export default connect(mapStateToProps, {
  getAllPlans,
  loadUser,
  mobileTransfer,
})(MobileTransfer);
