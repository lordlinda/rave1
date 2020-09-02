import React from 'react';
import axios from 'axios'
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import Input from './Reusables/Input.js'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'

class Rave extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
    txref: (new Date()).toString(),
    customer_email: "user@example.com",
    customer_phone:  "234099940409",
    amount:0,
    currency:'USD',
    PBFPubKey: 'FLWPUBK-79088d65bc6390fac8bb696a84e646cc-X',
    production: false,
    onSuccess: (response) => {
      console.log(response)
        if(response){
            axios.post('http://localhost:5000/payments/makePayment',response)
            .then(res=>{
                console.log(res.data)
                this.setState({amount:0})
                this.props.history.push('/')
            })
        }
    },
    onClose: () => { console.log("closed")}
    }
    this.handleChange=this.handleChange.bind(this)
    this.getCurrency=this.getCurrency.bind(this)
  }
  handleChange=(e)=>{
        this.setState({amount:e.target.value})
     }
     handleEmail=(e)=>{
        this.setState({customer_email:e.target.value})
     }
     getCurrency(e) {
    //console.log(e.target.value)
    this.setState({currency:e.target.value})
   }
   componentDidMount(){
     axios.get('http://localhost:5000/users/user')
            .then(res=>{
              this.setState({customer_email:res.data.user.email})
            })
   }

  render(){

  return (
    <div className="px-16 mx-auto container bg-gray-100 mt-12 ">
    <Input
    title='Amount'
    value={this.state.amount}
    onChange={this.handleChange}
    type='number'
    />
    <Input
    title='Email'
    value={this.state.customer_email}
    onChange={this.handleEmail}
    type='email'
    />
    <label className='block mt-2 text-gray-700'>Currency</label>
 <select id="comboA"
 onChange={this.getCurrency}
 value={this.state.currency}
 className=' bg-white border px-2'>
  <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="UGX">UGX</option>
  <option value="GBP">GBP</option>
  <option value="KES">KES</option>
  <option value="GHS">GHS</option>
  <option value="RWF">RWF</option>
  <option value="SLL">SLL</option>
  <option value="ZMW">ZMW</option>
  <option value="ZAR">ZAR</option>
 <option value="TZS">TZS</option>
 <option value="AUD">AUD</option>
<option value="XOF">XOF</option>
 <option value="XAF">XAF</option>
<option value="CAD">CAD</option>
</select>
<br/>
        <RaveProvider {...this.state}>
            <RavePaymentButton type='submit'
            className='bg-purple-900 text-white rounded-lg mt-4 py-1 px-10'
            >Pay</RavePaymentButton>
        </RaveProvider>
         <div>
    
    </div>
    </div>
  )
}
}

export default connect(null,actions)(Rave)