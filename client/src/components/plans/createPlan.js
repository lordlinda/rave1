import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Input from "../Reusables/Input";
import BackArrow from "../Reusables/BackArrow";
import "./createPlan.css";
import { connect } from "react-redux";
import { createPlan } from "../../redux/actions/plans";
function CreatePlan(props) {
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.createPlan({
      targetAmount: amount,
      name,
    });
    props.history.push("/plans");
  };
  return (
    <div>
      <div className="createPlan__header">
        <BackArrow goBack={props.history} />
        <h1>Create Plan</h1>
      </div>
      <form className="createPlan__body" onSubmit={handleSubmit}>
        <Input
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          label="Name"
        />
        <Input
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          label="Target Amount"
        />
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
