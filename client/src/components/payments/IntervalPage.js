import React from "react";
import BackArrow from "../Reusables/BackArrow";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { setInterval } from "../../redux/actions/filterActions";
import RadioButtons from "../Reusables/RadioButtons";
import { intervalOptions } from "../Reusables/select/Options";
import "./interval.css";
function IntervalPage({ history, setInterval, interval }) {
  const handleChange = (event) => {
    setInterval(event.target.value);
  };

  const handleClick = () => {
    const data = {
      ...history.location.state,
      interval: interval,
    };
    history.push("/createSubscription", data);
  };

  return (
    <div className="intervalPage">
      <div className="intervalPage__header">
        <BackArrow goBack={history} />
        <h1>Choose interval</h1>
      </div>
      <div className="intervalPage__body">
        <h1>How frequently would you like to save?</h1>
        <RadioButtons
          value={interval}
          onChange={handleChange}
          options={intervalOptions}
        />
        <Button
          disabled={!interval}
          variant="contained"
          onClick={handleClick}
          className={`intervalPage__button ${!interval && "disabled"}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    interval: state.filter.interval,
  };
};

export default connect(mapStateToProps, { setInterval })(IntervalPage);
