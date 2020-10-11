import React from 'react';
import { RaveProvider, RavePaymentButton } from "react-ravepayment"

import Input from './Reusables/Input.js'
import { connect } from 'react-redux'
import * as actions from '../redux/actions/index.js'
import Select from './Reusables/select/Select.js'
import { currencyOptionsArray } from './Reusables/select/Options.js'
import BackArrow from './Reusables/BackArrow.js'

class Subscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txref: (new Date()).toString(),
            customer_email: "user@example.com",
            customer_phone: "234099940409",
            amount: '',
            currency: 'UGX',
            PBFPubKey: 'FLWPUBK-79088d65bc6390fac8bb696a84e646cc-X',
            production: false,
            payment_plan: '6872',
            onSuccess: (response) => {
                console.log(response)
                const id = this.props.match.params.id
                const variables = {
                    response: response,
                    id: id
                }
                this.props.makeSubscription(variables)
            },
            onClose: () => { console.log("closed") }
        }
        this.handleChange = this.handleChange.bind(this)
        this.getInterval = this.getInterval.bind(this)
        this.getCurrency = this.getCurrency.bind(this)
    }
    handleChange = (e) => {
        this.setState({ amount: e.target.value })
    }

    getInterval(e) {
        //console.log(e.target.value)
        this.setState({ payment_plan: e.target.value })
    }
    getCurrency(e) {
        this.setState({ currency: e.target.value })
    }
    componentDidMount() {
        this.props.loadUser()
        this.setState({
            customer_email: localStorage.email,

        })
    }
    render() {

        return (
            <div className='px-5' >
                <div className='flex items-baseline justify-center'>
                    <BackArrow href='/' moreStyle='pt-2' />
                    <p className='mt-5 text-center ml-5 text-titleLink'>Add money to your account</p>
                </div>
                <div className='border border-titleGray mx-3 px-6 py-4 text-center mt-8 rounded-lg'>
                    <Input
                        placeholder='0.00'
                        value={this.state.amount}
                        onChange={this.handleChange}
                        type='number'
                        moreStyle='text-6xl w-full text-center text-titleGray placeholder-titleGray'
                    />
                    <Select
                        value={this.state.currency}
                        onChange={this.getCurrency}
                        options={currencyOptionsArray}
                        moreStyle='bg-white'
                    />
                </div>

                <div className='flex justify-around items-baseline mt-4'>
                    <label className='text-2xl'>Every</label>
                    <select
                        className='py-1 rounded-md bg-white border-2 ml-2 text-xl'
                        onChange={this.getInterval}
                        value={this.state.payment_plan}>
                        <option value="6873">Hourly</option>
                        <option value="6872">Daily</option>
                        <option value="6912">Weekly</option>
                        <option value="6913">Monthly</option>
                        <option value="6929">Yearly</option>
                    </select>
                </div>


                <div className=''>
                    <RaveProvider {...this.state}>
                        <RavePaymentButton type='submit'
                            className='bg-titleDark text-white mt-12 py-1 font-medium px-5 rounded-md w-full'>
                            Make Payment</RavePaymentButton>
                    </RaveProvider>

                </div>
            </div>
        )
    }
}

export default connect(null, actions)(Subscription)