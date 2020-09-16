import React from 'react';
import axios from 'axios'
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import Input from './Reusables/Input.js'
import { connect } from 'react-redux'
import * as actions from '../redux/actions/index.js'

class Subscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txref: (new Date()).toString(),
            customer_email: "user@example.com",
            customer_phone: "234099940409",
            amount: 0,
            customer_firstname: '',
            currency: 'UGX',
            PBFPubKey: 'FLWPUBK-79088d65bc6390fac8bb696a84e646cc-X',
            production: false,
            payment_plan: '6872',
            targetAmount: 0,
            duration: 0,
            reason: '',
            onSuccess: (response) => {
                console.log(response)
                const variables = {
                    response: response,
                    reason: this.state.reason,
                    targetAmount: this.state.targetAmount,
                    duration: this.state.duration
                }
                if (response) {
                    axios.post('/payments/makeSubscription', variables)
                        .then(res => {
                            console.log(res.data)
                            this.setState({ amount: 0 })
                            this.props.history.push('/')
                        })
                }

            },
            onClose: () => { console.log("closed") }
        }
        this.handleChange = this.handleChange.bind(this)
        this.getInterval = this.getInterval.bind(this)
        this.handlefirstName = this.handlefirstName.bind(this)
        this.handlelastName = this.handlelastName.bind(this)
        this.handleDuration = this.handleDuration.bind(this)
    }
    handleChange = (e) => {
        this.setState({ amount: e.target.value })
    }
    handleEmail = (e) => {
        this.setState({ customer_email: e.target.value })
    }
    getInterval(e) {
        //console.log(e.target.value)
        this.setState({ payment_plan: e.target.value })
    }
    handlefirstName = (e) => {
        this.setState({ customer_firstname: e.target.value })
    }
    handlelastName = (e) => {
        this.setState({ customer_lastname: e.target.value })
    }
    targetAmount = (e) => {
        this.setState({ targetAmount: e.target.value })
        //console.log(this.state.targetAmount)
    }
    reason = (e) => {
        this.setState({ reason: e.target.value })
    }
    handleDuration = (e) => {
        this.setState({ duration: e.target.value })
    }
    componentDidMount() {
        axios.get('/users/user')
            .then(res => {
                this.setState({ customer_email: res.data.user.email })
                this.setState({ customer_firstname: res.data.user.username })
            })
    }

    render() {

        return (
            <div className='container mx-auto md:px-5 sm:w-1/2'>
            <p> New Subscription</p>
            <div className='flex items-baseline jusify-between'>
            <Input
    title='Amount'
    value={this.state.amount}
    onChange={this.handleChange}
    placeholder='Amount'
    type='number'
    moreStyle='border-2 w-full px-4 py-1 rounded-md appearance-none w-7/12'
    />
    <div className=''>
    <label className='block mt-2 text-gray-700 ml-2'>Frequency</label>
     <select
     className='py-1 rounded-md bg-white border-2 ml-2'
     onChange={this.getInterval}
     value={this.state.payment_plan}>
      <option value="6873">Hourly</option>
      <option value="6872">Daily</option>
      <option value="6912">Weekly</option>
      <option value="6913">Monthly</option>
        <option value="6929">Yearly</option>
    </select>
     </div>
   </div>
        {/*<Input 
    title='How long would you like to save?'
    value={this.state.duration}
    onChange={this.handleDuration} 
    type='number'
    moreStyle='border rounded-lg mt-1 px-4 py-1'
    />*/}


<div className=''>
        <RaveProvider {...this.state}>
            <RavePaymentButton type='submit'
            className='bg-purple-500 text-white mt-5 px-3 mb-2 w-full py-1 rounded-md'>
            Subcribe</RavePaymentButton>
        </RaveProvider>
        
        </div>
    </div>
        )
    }
}

export default connect(null, actions)(Subscription)