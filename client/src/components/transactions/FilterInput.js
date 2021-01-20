import React, { Component } from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Select from "../Reusables/select/Select";
import {
  currencyOptionsArray,
  paymentOptions,
} from "../Reusables/select/Options";
import * as actions from "../../redux/actions/filterActions";
import CalenderTodayIcon from "@material-ui/icons/CalendarToday";
import { IconButton } from "@material-ui/core";

class FilterInput extends Component {
  state = {
    focused: null,
    show: false,
  };
  onDatesChange = async ({ startDate, endDate }) => {
    await this.props.setStartDate(startDate);
    await this.props.setEndDate(endDate);
    this.props.searchTransactions(this.props.filters);
  };
  onCurrencyChange = async (e) => {
    await this.props.setCurrency(e.target.value);
    this.props.searchTransactions(this.props.filters);
  };
  onPaymentMethodChange = async (e) => {
    await this.props.setpaymentMethod(e.target.value);
    this.props.searchTransactions(this.props.filters);
  };
  showCalender = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    return (
      <div className="filterInput">
        <Select
          label="currency"
          onChange={this.onCurrencyChange}
          value={this.props.currency}
          options={currencyOptionsArray}
        />
        <Select
          label="All"
          onChange={this.onPaymentMethodChange}
          value={this.props.paymentMethod}
          options={paymentOptions}
        />
        <IconButton onClick={this.showCalender}>
          <CalenderTodayIcon />
        </IconButton>

        {this.state.show && (
          <DateRangePicker
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focused}
            onFocusChange={(focusedInput) =>
              this.setState({ focused: focusedInput })
            }
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDates={true}
            startDateId="start"
            endDateId="end"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    startDate: state.filter.startDate,
    endDate: state.filter.endDate,
    currency: state.filter.currency,
    paymentMethod: state.filter.paymentMethod,
    filters: state.filter,
  };
};

export default connect(mapStateToProps, actions)(FilterInput);
