import { Button } from "@material-ui/core";
import React from "react";
import BackArrow from "../Reusables/BackArrow";
import Input from "../Reusables/Input";
import "./dates.css";
import { connect } from "react-redux";
import { setStartDate } from "../../redux/actions/filterActions";
import moment from "moment";
import { toast } from "react-toastify";
function DatesPage(props) {
  const handleClick = () => {
    if (moment(props.startDate) < moment().startOf("day")) {
      toast.error("Date must not be in the past");
    } else {
      props.history.push("/amount", {
        ...props.location.state,
        start: props.startDate,
      });
    }
  };
  return (
    <div className="datesPage">
      <div className="datesPage__header">
        <BackArrow goBack={props.history} />
        <h1>Choose dates</h1>
      </div>
      <div className="datesPage__body">
        <h1>When would you like to start?</h1>
        <Input
          type="date"
          value={props.startDate}
          onChange={(e) => props.setStartDate(e.target.value)}
        />

        <Button
          variant="contained"
          disabled={!props.startDate}
          onClick={handleClick}
          className={`datesPage__button ${!props.startDate && "disabled"}`}
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
  };
};

export default connect(mapStateToProps, { setStartDate })(DatesPage);
