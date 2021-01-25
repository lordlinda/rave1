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

function MobileTransfer(props) {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [phone, setPhone] = useState("");
  const mobile = () => {
    if (!phone || !from || !amount) {
      toast.error("Please fill in all fields");
    } else if (phone.length < 10) {
      toast.error("please enter a phone valid number");
    } else if (amount < 1000) {
      toast.error("Amout must be atleast 1000");
    } else {
      const data = {
        id: from,
        amount,
        phone: `256${phone.substr(1)}`,
      };
      props.mobileTransfer(data, props.history);
    }
  };
  /**transfer money */

  useEffect(() => {
    props.getAllPlans();
  }, []);
  useEffect(() => {
    props.loadUser();
  }, []);
  useEffect(() => {
    if (props.history.location.state) {
      setFrom(props.history.location.state.id);
    }
  }, [props.plans]);
  const getFrom = (plan) => {
    setFrom(plan._id);
  };
  return (
    <div className="mobile">
      <div className="accountTransfer__header">
        <BackArrow goBack={props.history} />
        <h1>Mobile Transfer</h1>
      </div>
      <div className="accountTransfer__plans">
        <h1>From</h1>
        <FlipMove>
          {props.plans.map((plan) => (
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
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
  };
};
export default connect(mapStateToProps, {
  getAllPlans,
  loadUser,
  mobileTransfer,
})(MobileTransfer);

/**
 * 
 * 
 * 
 * let data = [0, 1, 2, 3, 4, 5];
let index = 3;
data.unshift(data.splice(index, 1)[0]);
// data = [3, 0, 1, 2, 4, 5]
 */
