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
import {withRouter} from 'react-router-dom'
import Select from '../components/Reusables/Select.js'
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
    amount:'',
    currency:'UGX',
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
    <div className="">
    <div className='flex mt-5 sma:flex-wrap sd:flex-no-wrap'>
        {/*the width full allows the input to occupy the width of its parent and 
            not exceed it 
            and give the text some distance from the border and give it some round edges
          */}
    <Input
     placeholder='Amount'
     value={this.state.amount}
     onChange={this.handleChange}
      type='number'
       moreStyle='border-2 w-full px-4 py-1 rounded-md appearance-none w-7/12'
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
 {/*the select is given full height so as not to exceed its container and given atop margin
 to keep in line with the amount input  and some left margin to give it some space from the  amount
input*/}
 <Select 
 value={this.state.currency}
 onChange={this.getCurrency}
 moreStyle=''
 />
<br/>
</div>
{/*the payment button is a few pixel from the input w-full means it occupies the entire width of the container and some rounded edges
we also give it a margin bottom for the distance from the bottom of the container*/}
        <RaveProvider {...this.state}>
            <RavePaymentButton type='submit'
            className=' bg-purple-500 text-white mt-5 px-3 mb-2 w-full py-1 rounded-md'
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
  withStyles(styles),
  withRouter
  )(Rave)