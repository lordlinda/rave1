import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import {compose} from 'redux'
import {toast} from 'react-toastify'

import Select from '../Reusables/select/Select.js'
import {paymentOptions} from '../Reusables/select/Options.js'
import Input from '../Reusables/Input.js'
import Transaction from '../dashboard/Transaction.js'
import Button from '../Reusables/Button.js'
import BottomNavigation  from '../Reusables/BottomNavigation.js'
import * as actions from '../../redux/actions/index.js'
const styles={
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
const Transactions=(props)=>{
   const [open, setOpen] = React.useState(false)
   const [formData,setFormData]=useState({
    date:'',
    paymentMethod:'',
    amount:''
   })
   const {date,paymentMethod,amount}=formData
    const handleChange=(text)=>e=>{
    setFormData({...formData,[text]:e.target.value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
     console.log(formData)
        setFormData({
          date:'',
          currency:'',
          amount:''
        })
        props.searchTransactions(formData)
        setOpen(!open)
      }
       
     
  const handleToggle = (props) => {
    setOpen(!open);
  }
  useEffect(()=>{
    props.getTransactions()
  },[])
  const {classes}=props
	return(
		<div className='mx-5'>
	      	{/*this is displays the title of the page*/}
          <div  className='mt-8'>
		      <p className='text-xl text-titleLink'>All Transactions</p>
          <Button
          isButton={true}
          onClick={handleToggle}
          title='Filter Transactions'
           />
           <Dialog 
          open={open} 
          onClose={handleToggle} 
          className={classes.root}>
        <DialogTitle >
          <p className='text-md'>Filter Options</p>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
         <Input
         type='date'
         title='Date:'
         value={date}
         onChange={handleChange('date')}
         moreStyle='border-b w-40 px-2' 
         labelStyle='inline-block px-2'
         />
          <Select
            value={paymentMethod}
            onChange={handleChange('paymentMethod')}
            moreStyle=''
           options={paymentOptions}
           />
             <Button 
    isButton={true}
    type='submit'
    title='Search'
    moreStyle='text-titleDark mt-1 py-1 font-medium px-5 rounded-md w-full'
    />
         </form>
      </Dialog>
           <div>

          {
                props.transactions ?
                props.transactions.map(transaction=>{
                  return <Transaction transaction={transaction} key={transaction._id}/>
                })
                :<tr>
                 <td>No transactions yet</td>
                </tr>

               }
          
        </div>
        </div>
              
              
    <BottomNavigation/>
		</div>
		)

}

const mapStateToProps=(state)=>{
	return {
    transactions:state.data.transactions
	}
}

export default compose(withStyles(styles),connect(mapStateToProps,actions))(Transactions)