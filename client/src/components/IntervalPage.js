import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import BackArrow from "./Reusables/BackArrow";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { setInterval } from "../redux/actions/filterActions";

function IntervalPage(props) {
  const handleChange = (event) => {
    props.setInterval(event.target.value);
  };

  const handleClick = () => {
    const data = {
      ...props.location.state,
      interval: props.interval,
    };
    props.history.push("/amount", data);
  };

  return (
    <div style={{ width: "90%", margin: "0 auto", marginTop: "24px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <BackArrow goBack={props.history} />
        <h1 style={{ fontSize: "20px" }}>Choose interval</h1>
      </div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="interval"
          name="interval1"
          value={props.interval}
          onChange={handleChange}
        >
          <FormControlLabel value="hourly" control={<Radio />} label="Hourly" />

          <FormControlLabel value="daily" control={<Radio />} label="Daily" />
          <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
          <FormControlLabel
            value="monthly"
            control={<Radio />}
            label="Monthly"
          />
          <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
          <FormControlLabel
            value="quarterly"
            control={<Radio />}
            label="Quarterly"
          />
          <FormControlLabel
            value="Every 6 months"
            control={<Radio />}
            label="Every 6 months"
          />
        </RadioGroup>
        <Button
          disabled={!props.interval}
          variant="contained"
          onClick={handleClick}
          className={`intervalPage__button ${!props.interval && "disabled"}`}
        >
          Next
        </Button>
      </FormControl>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    interval: state.filter.interval,
  };
};

export default connect(mapStateToProps, { setInterval })(IntervalPage);
