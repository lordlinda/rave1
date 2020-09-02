import React  from 'react';
import axios from 'axios'
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import Input from './Reusables/Input.js'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'

class Subscription extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
    txref: (new Date()).toString(),
    customer_email: "user@example.com",
    customer_phone:  "234099940409",
    amount:0,
    customer_firstname:'',
    customer_lastname:'',
    currency:'UGX',
    PBFPubKey: 'FLWPUBK-79088d65bc6390fac8bb696a84e646cc-X',
    production: false,
    payment_plan:'6872',
    onSuccess: (response) => {
      console.log(response)
        if(response){
          axios.post('http://localhost:5000/payments/makeSubscription',response)
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
    this.getInterval=this.getInterval.bind(this)
    this.handlefirstName=this.handlefirstName.bind(this)
    this.handlelastName=this.handlelastName.bind(this)
  }
      handleChange=(e)=>{
        this.setState({amount:e.target.value})
     }
     handleEmail=(e)=>{
        this.setState({customer_email:e.target.value})
     }
     getInterval(e) {
    console.log(e.target.value)
    this.setState({payment_plan:e.target.value})
   }
    handlefirstName=(e)=>{
      this.setState({customer_firstname:e.target.value})
    }
    handlelastName=(e)=>{
      this.setState({customer_lastname:e.target.value})
    }
    
    componentDidMount(){
       axios.get('http://localhost:5000/users/user')
            .then(res=>{
              this.setState({customer_email:res.data.user.email})
            })      
     }
   
  render(){

  return (
    <div className='px-16 mx-auto container bg-gray-100 mt-12 '>
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
    <Input 
    title='Firstname'
    value={this.state.customer_firstname}
    onChange={this.handlefirstName} 
    type='text'
    />
     <Input 
    title='Lastname'
    value={this.state.customer_lastname}
    onChange={this.handlelastName} 
    type='text'
    />
   
   <label className='block mt-2 text-gray-700'>Duration</label> 
 <select  
 className=' bg-white border px-2'
 onChange={this.getInterval} 
 value={this.state.payment_plan}>
   <option value="6872">Daily</option>
    <option value="6873">Hourly</option>
</select>
<div className=''>
        <RaveProvider {...this.state}>
            <RavePaymentButton type='submit'
            className='bg-purple-900 text-white rounded-lg mt-4 py-1 px-10'>
            Subcribe</RavePaymentButton>
        </RaveProvider>
        
        </div>
    </div>
  )
}
}

export default connect(null,actions)(Subscription)