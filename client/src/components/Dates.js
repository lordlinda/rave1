import { Button } from "@material-ui/core";
import React from "react";
import BackArrow from "./Reusables/BackArrow";
import Input from "./Reusables/Input";
import "./dates.css";
import { connect } from "react-redux";
import { setStartDate, setEndDate } from "../redux/actions/filterActions";
import moment from "moment";
import { toast } from "react-toastify";
function DatesPage(props) {
  const handleClick = () => {
    if (
      moment(props.startDate) < moment().startOf("day") ||
      moment(props.endDate) < moment().startOf("day")
    ) {
      toast.error("Date must not be in the past");
    } else {
      props.history.push("/interval", {
        ...props.location.state,
        start: props.startDate,
        end: props.endDate,
      });
    }
  };
  return (
    <div>
      <div className="datesPage__header">
        <BackArrow goBack={props.history} />
        <h1 className="">Choose dates</h1>
      </div>
      <div className="datesPage__body">
        <Input
          label="Start Date"
          type="date"
          value={props.startDate}
          onChange={(e) => props.setStartDate(e.target.value)}
        />
        <Input
          label="End Date"
          type="date"
          value={props.endDate}
          onChange={(e) => props.setEndDate(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={!props.startDate || !props.endDate}
          onClick={handleClick}
          className={`datesPage__button ${
            !props.startDate || (!props.endDate && "disabled")
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    startDate: state.filter.startDate,
    endDate: state.filter.endDate,
  };
};

export default connect(mapStateToProps, { setStartDate, setEndDate })(
  DatesPage
);
