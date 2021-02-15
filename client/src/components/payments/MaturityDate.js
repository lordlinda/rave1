import React, { useState } from "react";
import moment from "moment";
import BackArrow from "../Reusables/BackArrow";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { setDuration } from "../../redux/actions/filterActions";
import { connect } from "react-redux";
import {
  calculateEndDate,
  calculateTotalAmountAccrued,
  numberWithCommas,
} from "../../helpers/middleware";
import RadioButtons from "../Reusables/RadioButtons";
import { durationOptions } from "../Reusables/select/Options";

function Maturity({ history, duration, setDuration }) {
  const [endDate, setEndDate] = useState("");
  const [total, setTotal] = useState(0);
  const [rate, setRate] = useState("");
  const handleClick = async () => {
    const data = {
      ...history.location.state,
      end: endDate,
      period: duration,
    };
    history.push("/confirm", data);
  };
  const handleChange = (e) => {
    setDuration(e.target.value);
    const { end } = calculateEndDate({
      period: e.target.value,
      startDate: history.location.state.start,
    });
    setEndDate(end);
    const { total, yearlyRate } = calculateTotalAmountAccrued({
      period: e.target.value,
      amount: history.location.state.amount,
    });
    setTotal(total);
    setRate(yearlyRate);
  };

  return (
    <div className="intervalPage">
      <div className="intervalPage__header">
        <BackArrow goBack={history} />
        <h1>Choose interval</h1>
      </div>
      <div className="intervalPage__body">
        <h1>How long would you like to save?</h1>
        <RadioButtons
          value={duration}
          onChange={handleChange}
          options={durationOptions}
        />

        <Button
          disabled={!duration}
          variant="contained"
          onClick={handleClick}
          className={`intervalPage__button ${!duration && "disabled"}`}
        >
          Next
        </Button>
        {endDate && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0" }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="intervalPage__message"
          >
            You will be earning{" "}
            <span>
              {history.location.state.currency} {numberWithCommas(total)}
            </span>{" "}
            <br />
            on {moment(endDate).format("DD MMM,YYYY")} at{" "}
            <span>{rate}% Per Annum</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    duration: state.filter.duration,
  };
};
export default connect(mapStateToProps, { setDuration })(Maturity);
