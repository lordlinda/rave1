import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Input from "../Reusables/Input";
import BackArrow from "../Reusables/BackArrow";
import "./createPlan.css";
import { connect } from "react-redux";
import { createPlan } from "../../redux/actions/plans";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { toast } from "react-toastify";
import Maturity from "../payments/MaturityDate";
function CreatePlan(props) {
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const [currency, setCurrency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currency) {
      toast.error("please fill in the currency");
    } else if (!name) {
      toast.error("please fill in the name");
    } else {
      props.createPlan({
        targetAmount: amount,
        name,
        currency,
      });
      props.history.push("/plans");
    }
  };
  const options = ["UGX", "USD"];
  return (
    <div>
      <div className="createPlan__header">
        <BackArrow goBack={props.history} />
        <h1>Create Plan</h1>
      </div>
      <form className="createPlan__body" onSubmit={handleSubmit}>
        <p>Why are you saving ?</p>
        <Input
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          label="Name"
        />
        <p>How much do you need to achieve this goal</p>
        <Input
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          label="Target Amount"
        />
        <FormControl>
          <p>Which is your preferred currency when saving for this goal?</p>
          <Select
            displayEmpty
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="" disabled>
              Currency
            </MenuItem>
            {options.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Maturity />
        <Button
          className="createPlan__button"
          variant="contained"
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default connect(null, { createPlan })(CreatePlan);
