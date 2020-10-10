import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Select from '../Reusables/select/Select'
import { currencyOptionsArray, paymentOptions } from '../Reusables/select/Options'
import * as actions from '../../redux/actions/filterActions'
class FilterInput extends Component {
    state = {
        focused: null,
    }
    onDatesChange = async ({ startDate, endDate }) => {
        await this.props.setStartDate(startDate)
        await this.props.setEndDate(endDate)
        this.props.searchTransactions(this.props.filters)

    }
    onCurrencyChange = async (e) => {
        await this.props.setCurrency(e.target.value)
        this.props.searchTransactions(this.props.filters)

    }
    onPaymentMethodChange = async (e) => {
        await this.props.setpaymentMethod(e.target.value)
        this.props.searchTransactions(this.props.filters)
    }
    render() {
        return (
            <div>
                <div>
                    <div className='flex items-baseline mb-2'>
                        <Select
                            onChange={this.onCurrencyChange}
                            value={this.props.currency}
                            options={currencyOptionsArray}
                            moreStyle='bg-white border px-2'
                        />


                        <Select
                            onChange={this.onPaymentMethodChange}
                            value={this.props.paymentMethod}
                            options={paymentOptions}
                            moreStyle='bg-white border px-2'
                        />

                    </div>
                    <DateRangePicker
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.focused}
                        onFocusChange={focusedInput => this.setState({ focused: focusedInput })}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        showClearDates={true}
                        startDateId="start"
                        endDateId="end"
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        startDate: state.filter.startDate,
        endDate: state.filter.endDate,
        currency: state.filter.currency,
        paymentMethod: state.filter.paymentMethod,
        filters: state.filter
    }
}

export default connect(mapStateToProps, actions)(FilterInput)
