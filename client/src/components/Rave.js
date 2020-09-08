import React from 'react';
import axios from 'axios'
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import Input from './Reusables/Input.js'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'
//import Button from './Reusables/Button.js'
//import {CirclePicker } from 'react-color';
//import Dialog from '@material-ui/core/Dialog';
//import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux'

const styles ={
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
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
    targetAmount:0,
    display:false,
    color:'#fff',
    reason:'',
    onSuccess: (response) => {
      console.log(response)
      const variables ={
        response:response,
        reason:this.state.reason,
        targetAmount:this.state.targetAmount
      }
        if(response){
            axios.post('/payments/makePayment',variables)
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
      targetAmount=(e)=>{
        this.setState({targetAmount:e.target.value})
        //console.log(this.state.targetAmount)
     }
     reason=(e)=>{
        this.setState({reason:e.target.value})
     }
     handleEmail=(e)=>{
        this.setState({customer_email:e.target.value})
     }
     getCurrency(e) {
    //console.log(e.target.value)
    this.setState({currency:e.target.value})
   }
   handleChangeComplete=(color)=>{
         this.setState({color:color.hex})
  }
   handleClick = () => {
    this.setState({ display: !this.state.display })
  };
  handleClose = () => {
    this.setState({ display: false })
  };

   componentDidMount(){
     axios.get('/users/user')
            .then(res=>{
              this.setState({customer_email:res.data.user.email})
            })
   }

  render(){
 //const {classes}=this.props
  return (
    <div className="container mx-auto px-6 mt-12">
    <div className='flex'>
    <Input
    title='Amount'
    value={this.state.amount}
    onChange={this.handleChange}
    type='number'
    moreStyle='border'
    />
    {/*<div className=''>
    <div >
    <Button 
    isButton={true}
    title='Pick a color'
    onClick={this.handleClick}
    style={{backgroundColor:`${this.state.color}`}}
    />
    </div>
    {
      this.state.display ?
      <Dialog 
      open={this.state.display} 
      onClose={this.handleClose} 
      aria-labelledby="form-dialog-title"
      className={classes.root}>
      <div className='px-5 mb-5'>
        <DialogTitle id="form-dialog-title">Choose color</DialogTitle>
        <CirclePicker 
            color={this.state.color}
           onChangeComplete={this.handleChangeComplete}
           className=''
       />
       </div>

      </Dialog>
           
      :null
    }
   </div>*/}
    <label className='block mt-2 text-gray-700'></label>
 <select id="comboA"
 onChange={this.getCurrency}
 value={this.state.currency}
 className=''>
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
</div>
        <RaveProvider {...this.state}>
            <RavePaymentButton type='submit'
            className='bg-purple-900 text-white rounded-lg mt-4 py-1 px-10'
            >Make payment</RavePaymentButton>
        </RaveProvider>
         <div>
    
    </div>
    </div>
  )
}
}

export default compose(
  connect(null,actions),
  withStyles(styles)
  )(Rave)